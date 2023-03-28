<<<<<<< HEAD
/*this is where we will be creating the controllers to the diferent views or static pages that the users will be going
to see in the differents endpoints of the app*/

import { SessionManager } from "../components/SessionManager.js";
import { Players } from "../helpers/players.js";
import { io, roomPlayers } from "../index.js";
let user = false;
const Session = new SessionManager();
const Roomlist = [];

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

//we create the controller for the homepage where we render the homepage view from the pages folder
const homepage = (req, res) => {
  const { _token, _userName } = req.cookies;
  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("pages/homepage", {
    title: "Home",
    user: user,
    username: _userName,
    pagina: "Welcome to the homepage",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};
//we create the controller for the lobby where we render the lobby view from the pages folder
const lobbypage = (req, res) => {
  const { _token } = req.cookies;
  const _userName = req.cookies._userName;
  console.log(_userName);
  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("pages/lobby", {
    title: "lobby",
    pagina: "Lobby",
    rooms: Roomlist,
    user: user,
    username: _userName,
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

const waitpage = (req, res) => {
  const { _token } = req.cookies;
  const userName = req.cookies._userName;
  console.log(userName);

  if (!_token) {
    user = false;
  } else {
    user = true;
  }

  res.render("pages/waitpage", {
    title: "waiting",
    pagina: "Waiting",
    rooms: Roomlist,
    user: user,
    username: userName,
    csrfToken: req.csrfToken(),
  });
};

const gamepage = (req, res) => {
  const { _token, _userName } = req.cookies;
  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  var name = req.query.name;
  res.render("pages/gamepage", {
    title: "Game",
    user: user,
    game: true,
    rooms: name,
    username: _userName,
    pagina: "Welcome to the Game, stay sharp",
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

const addroom = (req, res) => {
  const name = req.query.name;
  var option = true;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      option = false;
      break;
    }
  }
  if (option) {
    Roomlist.push(name);
    console.log(JSON.stringify(Roomlist));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const joinroom = (req, res) => {
  const name = req.query.name;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      res.sendStatus(200);
      break;
    }
  }
  res.sendStatus(400);
};

const deleteroom = (req, res) => {
  const name = req.query.name;
  var option = false;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      option = true;
      break;
    }
  }
  if (option) {
    Roomlist.splice(i, 1);
    delete roomPlayers[name];
    console.log(JSON.stringify(Roomlist));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
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
  lobbypage,
  gamepage,
  waitpage,
  addroom,
  Roomlist,
  deleteroom,
  joinroom,
};
=======
/*this is where we will be creating the controllers to the diferent views or static pages that the users will be going
to see in the differents endpoints of the app*/

import { SessionManager } from "../components/SessionManager.js";
let user = false;
const Session = new SessionManager();
const Roomlist = [];
const Players = [];
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

const gamepage = (req, res) => {
  var name = req.query.name;
  res.render("pages/gamepage", {
    title: "Game",
    user: true,
    game: true,
    rooms: name,
    pagina: "Welcome to the Game, stay sharp",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

const gamepage2 = (req, res) => {
  var name = req.query.name;
  res.render("pages/test", {
    title: "test",
    user: true,
    game: true,
    rooms: name,
    pagina: "Welcome to the Game, stay sharp",
    csrfToken: req.csrfToken(), // for the csrf token
  });
};

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
  const _userName = req.cookies._userName;
  console.log(_userName);
  if (!_token) {
    user = false;
  } else {
    user = true;
  }
  res.render("pages/lobby", {
    title: "lobby",
    pagina: "Lobby",
    rooms: Roomlist,
    user: user,
    username: _userName,
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

const addroom = (req, res) => {
  const name = req.query.name;
  var option = true;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      option = false;
      break;
    }
  }
  if (option) {
    Roomlist.push(name);
    console.log(JSON.stringify(Roomlist));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

const joinroom = (req, res) => {
  const name = req.query.name;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      res.sendStatus(200);
      break;
    }
  }
  res.sendStatus(400);
};

const deleteroom = (req, res) => {
  const name = req.query.name;
  var option = false;
  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      option = true;
      break;
    }
  }
  if (option) {
    Roomlist.splice(i, 1);
    console.log(JSON.stringify(Roomlist));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
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
  lobbypage,
  gamepage,
  gamepage2,
  addroom,
  Roomlist,
  deleteroom,
  joinroom,
};
>>>>>>> 7b4519f4313fe963f0d2ddecf5cddf7766fe2340
