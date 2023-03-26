import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generateToken1, generateJWT, decoded } from "../helpers/token.js";
import { emailRegistro, emailReset } from "../helpers/emails.js";
import bcrypt from "bcrypt";

class SessionManager {
  constructor() {}
  async createUser(req, res) {
    //we create the validations for the form data
    await check("name")
      .notEmpty()
      .withMessage("the name is obligatory")
      .run(req);
    await check("email")
      .notEmpty()
      .withMessage("the email is obligatory")
      .isEmail()
      .withMessage("the email is not valid")
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("the password is obligatory")
      .isLength({ min: 6 })
      .withMessage("the password must contain at least 6 characters")
      .run(req);
    await check("repeat_password")
      .equals(req.body.password)
      .withMessage("the passwords doesn't match")
      .run(req);

    let resultado = validationResult(req);

    //we check if there are errors in the validations and if there are we send a message to the client pointing out the errors
    if (!resultado.isEmpty()) {
      return res.render("auth/register", {
        pagina: "Create Account",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: resultado.array(),
        usuario: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }
    const { name, email, password } = req.body;

    //we verify if the email already exists in the database
    const existeUsuario = await Usuario.findOne({
      where: { email: req.body.email },
    });

    //we check if a user with the same email already exists in the database and if it does we send a message to the client
    if (existeUsuario) {
      return res.render("auth/register", {
        pagina: "Create Account",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: [
          {
            msg: "The email is already registered",
          },
        ],
        usuario: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }
    //we store the data of the user in the database if all the info is correct
    const usuario = await Usuario.create({
      name,
      email,
      password,
      token: generateToken1(),
    });
    //we send a confirmation email to the user
    emailRegistro({
      name: usuario.name,
      email: usuario.email,
      token: usuario.token,
    });

    res.render("templates/mensajes", {
      pagina: "your account was successfully created",
      csrfToken: req.csrfToken(), // for the csrf token
      mensaje: "we have send a mail of confirmation to your email",
    });
  }

  async verifyUser(req, res) {
    const { token } = req.params;

    const usuario = await Usuario.findOne({
      where: { token },
    });

    if (!usuario) {
      return res.render("auth/confirm-account", {
        pagina: "Authentication error",
        csrfToken: req.csrfToken(), // for the csrf token
        mensaje:
          "There has been an error when trying to confirm your account, try again",
        error: true,
      });
    }

    usuario.token = null;
    usuario.confirmado = 1;
    await usuario.save();

    console.log(usuario);
    console.log("el token es " + token);

    res.render("auth/confirm-account", {
      pagina: "Account confirmed",
      csrfToken: req.csrfToken(), // for the csrf token
      mensaje:
        "Your account has been successfully confirmed, you can now log in !",
      error: false,
    });
  }

  async ResetPassword(req, res) {
    await check("email")
      .notEmpty()
      .withMessage("the email is obligatory")
      .isEmail()
      .withMessage("the email is not valid")
      .run(req);
    //
    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
      return res.render("auth/reset-password", {
        pagina: "Reset Password",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: resultado.array(),
        usuario: {
          email: req.body.email,
        },
      });
    }
    const { email } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
    });
    if (!usuario) {
      console.log(usuario);
      return res.render("auth/reset-password", {
        pagina: "Reset Password",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: [
          {
            msg: "The email is not registered",
          },
        ],
        usuario: {
          email: req.body.email,
        },
      });
    }
    //we generate a token for the user
    usuario.token = generateToken1();

    await usuario.save();
    //we send a email to the user with the link to reset the password
    emailReset({
      name: usuario.name,
      email: usuario.email,
      token: usuario.token,
    });
    // we send a message to the user to confirm that the email has been sent
    res.render("templates/mensajes", {
      pagina: "Reset Password",
      csrfToken: req.csrfToken(), // for the csrf token
      mensaje: "we have send a mail to your email",
    });
  }

  async CheckResetPassword(req, res) {
    const { token } = req.params;
    const usuario = await Usuario.findOne({
      where: { token },
    });
    // we check if the token is valid and if it is not we send a message to the user
    if (!usuario) {
      return res.render("auth/confirm-account", {
        pagina: "Reset Password",
        csrfToken: req.csrfToken(), // for the csrf token
        mensaje:
          "There has been an error when trying to reset your password, try again",
        error: true,
      });
    }
    // we send the form to the user to reset the password
    res.render("auth/set-new-password", {
      pagina: "New Password",
      csrfToken: req.csrfToken(), // for the csrf token
      errores: [],
      usuario: {
        email: usuario.email,
      },
    });
  }

  async VerifyNewPassword(req, res) {
    await check("password")
      .notEmpty()
      .withMessage("the password is obligatory")
      .isLength({ min: 6 })
      .withMessage("the password must contain at least 6 characters")
      .run(req);
    await check("repeat_password")
      .equals(req.body.password)
      .withMessage("the passwords doesn't match")
      .run(req);

    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
      return res.render("auth/set-new-password", {
        pagina: "Set new Password",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: resultado.array(),
        usuario: {
          email: req.body.email,
        },
      });
    }
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({
      where: { token },
    });
    const salt = await bcrypt.genSalt(10); // we create the salt
    usuario.password = await bcrypt.hash(password, salt); //we encrypt the password
    usuario.token = null;

    await usuario.save();

    res.render("auth/confirm-account", {
      pagina: "Password reset",
      csrfToken: req.csrfToken(), // for the csrf token
      mensaje: "Your password has been successfully reset",
      error: false,
    });
  }

  async LoginVerify(req, res) {
    await check("email")
      .notEmpty()
      .withMessage("the email is obligatory")
      .isEmail()
      .withMessage("the email is not valid")
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("the password is obligatory")
      .run(req);
    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
      return res.render("auth/login", {
        pagina: "Login",
        csrfToken: req.csrfToken(), // for the csrf token
        errores: resultado.array(),
        usuario: {
          email: req.body.email,
        },
      });
    }
  }
  // we verify the user and the password in the database
  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({
        where: { email },
      });
      // we check if the user exists and if it is not we send a message to the user
      if (!usuario) {
        return res.render("auth/login", {
          pagina: "Login",
          csrfToken: req.csrfToken(), // for the csrf token
          errores: [
            {
              msg: "The user doesn't exist",
            },
          ],
          usuario: {
            email: req.body.email,
          },
        });
      }
      // we check if the user has confirmed the account and if it is not we send a message to the user
      if (!usuario.confirmado) {
        return res.render("auth/login", {
          pagina: "Login",
          csrfToken: req.csrfToken(), // for the csrf token
          errores: [
            {
              msg: "You Need to confirm your account",
            },
          ],
          usuario: {
            email: req.body.email,
          },
        });
      }
      // we check if the password is correct and if it is not we send a message to the user
      if (!usuario.verificarPassword(password)) {
        return res.render("auth/login", {
          pagina: "Login",
          csrfToken: req.csrfToken(), // for the csrf token
          errores: [
            {
              msg: "The password is incorrect", //profundizar como funciona el JWT,probar express-session
            },
          ],
          usuario: {
            email: req.body.email,
          },
        });
      }

      const token = generateJWT(usuario.id, usuario.name);
      console.log(token);
      const userInfo = decoded(token);
      console.log(userInfo);
      return res
        .cookie("_token", token, {
          httpOnly: true,
        })
        .cookie("_userName", userInfo.name, {
          httpOnly: true,
        })
        .redirect("/lobby");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { SessionManager };
