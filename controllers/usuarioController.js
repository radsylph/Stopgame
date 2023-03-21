/*this is where we will be creating the controllers to the diferent views or static pages that the users will be going
to see in the differents endpoints of the app*/

import { SessionManager } from "../components/SessionManager.js";
let user = false;
const Session = new SessionManager();
//we create the controller for the login form where we render the login view from the auth folder
const formulariologin = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    pagina: "Log in to your account",
    autenticado: false,
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

//we create the controller for the register form where we render the register view from the auth folder
const formularioregistro = (req, res) => {
  const { _token } = req.cookies;

  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("auth/register", {
    title: "Registre",
    user: user,
    pagina: "Create an Account",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

//we create the controller for the reset password form where we render the reset password view from the auth folder
const formularioresetpass = (req, res) => {
  const { _token } = req.cookies;

  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("auth/reset-password", {
    title: "Reset Password",
    user: user,
    pagina: "Recover your password",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

const gamepage = (req, res)=> {
  res.render("pages/gamepage" , {
    title: "Game",
    user: true,
    game: true,
    pagina:"Welcome to the Game, stay sharp",
    csrfToken: req.csrfToken(), // for the csrf token
  })
}

//we create the controller for the homepage where we render the homepage view from the pages folder
const homepage = (req, res) => {
  const { _token } = req.cookies;
  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("pages/homepage", {
    title: "Home",
    user: user,
    pagina: "Welcome to the homepage",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

//we create the controller for the lobby where we render the lobby view from the pages folder
const lobbypage = (req, res) => {
  const { _token } = req.cookies;

  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("pages/lobby", {
    title: "lobby",
    pagina: "Lobby",
    user: user,
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

//controller to veryfy the user and log him in
const autenticar = (req, res) => {
  Session.LoginVerify(req, res);
  Session.Login(req, res);
};

//controller to create a new user
const registrar = (req, res) => {
  Session.createUser(req, res);
};

//controller to verify the user
const confirmar = (req, res) => {
  Session.verifyUser(req, res);
};

const test = (req, res) => {
  //res.clearCookie("_token");
};

//controller to reset the password
const resetPassword = (req, res) => {
  Session.ResetPassword(req, res);
};

//controller to verify the token and render the new password form
const comprobartoken = async (req, res) => {
  Session.CheckResetPassword(req, res);
};

//controller to set the new password and save it in the database
const nuevapassword = (req, res) => {
  Session.VerifyNewPassword(req, res);
};

//we export the controllers to be used in the routes
export {
  formulariologin,
  formularioregistro,
  formularioresetpass,
  registrar,
  confirmar,
  resetPassword,
  comprobartoken,
  nuevapassword,
  autenticar,
  homepage,
  test,
  lobbypage,
  gamepage,
};
