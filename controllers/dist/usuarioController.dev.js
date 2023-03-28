"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinroom = exports.deleteroom = exports.Roomlist = exports.addroom = exports.waitpage = exports.gamepage = exports.lobbypage = exports.homepage = exports.autenticar = exports.nuevapassword = exports.comprobartoken = exports.resetPassword = exports.confirmar = exports.registrar = exports.formularioresetpass = exports.formularioregistro = exports.formulariologin = void 0;

var _SessionManager = require("../components/SessionManager.js");

var _players = require("../helpers/players.js");

var _index = require("../index.js");

/*this is where we will be creating the controllers to the diferent views or static pages that the users will be going
to see in the differents endpoints of the app*/
var user = false;
var Session = new _SessionManager.SessionManager();
var Roomlist = []; //we create the controller for the login form where we render the login view from the auth folder

exports.Roomlist = Roomlist;

var formulariologin = function formulariologin(req, res) {
  res.render("auth/login", {
    title: "Login",
    pagina: "Log in to your account",
    autenticado: false,
    csrfToken: req.csrfToken() // for the csrf token

  });
}; //we create the controller for the register form where we render the register view from the auth folder


exports.formulariologin = formulariologin;

var formularioregistro = function formularioregistro(req, res) {
  var _token = req.cookies._token;

  if (!_token) {
    user = false;
  } else {
    user = true;
  }

  res.render("auth/register", {
    title: "Registre",
    user: user,
    pagina: "Create an Account",
    csrfToken: req.csrfToken() // for the csrf token

  });
}; //we create the controller for the reset password form where we render the reset password view from the auth folder


exports.formularioregistro = formularioregistro;

var formularioresetpass = function formularioresetpass(req, res) {
  var _token = req.cookies._token;

  if (!_token) {
    user = false;
  } else {
    user = true;
  }

  res.render("auth/reset-password", {
    title: "Reset Password",
    user: user,
    pagina: "Recover your password",
    csrfToken: req.csrfToken() // for the csrf token

  });
}; //we create the controller for the homepage where we render the homepage view from the pages folder


exports.formularioresetpass = formularioresetpass;

var homepage = function homepage(req, res) {
  var _req$cookies = req.cookies,
      _token = _req$cookies._token,
      _userName = _req$cookies._userName;

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
    csrfToken: req.csrfToken() // for the csrf token

  });
}; //we create the controller for the lobby where we render the lobby view from the pages folder


exports.homepage = homepage;

var lobbypage = function lobbypage(req, res) {
  var _token = req.cookies._token;
  var _userName = req.cookies._userName;
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
    csrfToken: req.csrfToken() // for the csrf token

  });
};

exports.lobbypage = lobbypage;

var waitpage = function waitpage(req, res) {
  var _token = req.cookies._token;
  var userName = req.cookies._userName;
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
    csrfToken: req.csrfToken()
  });
};

exports.waitpage = waitpage;

var gamepage = function gamepage(req, res) {
  var _req$cookies2 = req.cookies,
      _token = _req$cookies2._token,
      _userName = _req$cookies2._userName;

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
    csrfToken: req.csrfToken() // for the csrf token

  });
}; //controller to veryfy the user and log him in


exports.gamepage = gamepage;

var autenticar = function autenticar(req, res) {
  Session.LoginVerify(req, res);
  Session.Login(req, res);
}; //controller to create a new user


exports.autenticar = autenticar;

var registrar = function registrar(req, res) {
  Session.createUser(req, res);
}; //controller to verify the user


exports.registrar = registrar;

var confirmar = function confirmar(req, res) {
  Session.verifyUser(req, res);
}; //controller to reset the password


exports.confirmar = confirmar;

var resetPassword = function resetPassword(req, res) {
  Session.ResetPassword(req, res);
}; //controller to verify the token and render the new password form


exports.resetPassword = resetPassword;

var comprobartoken = function comprobartoken(req, res) {
  return regeneratorRuntime.async(function comprobartoken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Session.CheckResetPassword(req, res);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; //controller to set the new password and save it in the database


exports.comprobartoken = comprobartoken;

var nuevapassword = function nuevapassword(req, res) {
  Session.VerifyNewPassword(req, res);
};

exports.nuevapassword = nuevapassword;

var addroom = function addroom(req, res) {
  var name = req.query.name;
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

exports.addroom = addroom;

var joinroom = function joinroom(req, res) {
  var name = req.query.name;

  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      res.sendStatus(200);
      break;
    }
  }

  res.sendStatus(400);
};

exports.joinroom = joinroom;

var deleteroom = function deleteroom(req, res) {
  var name = req.query.name;
  var option = false;

  for (var i = 0; i < Roomlist.length; i++) {
    if (Roomlist[i] == name) {
      option = true;
      break;
    }
  }

  if (option) {
    Roomlist.splice(i, 1);
    delete _index.roomPlayers[name];
    console.log(JSON.stringify(Roomlist));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
}; //we export the controllers to be used in the routes


exports.deleteroom = deleteroom;