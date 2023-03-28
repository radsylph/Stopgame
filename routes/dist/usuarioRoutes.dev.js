"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ProtegerRutas = _interopRequireDefault(require("../middleware/ProtegerRutas.js"));

var _usuarioController = require("../controllers/usuarioController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import revisarrooms from "../middleware/RevisarRooom.js";
var router = _express["default"].Router(); //si quiero tener diferentes tipos de html responses con un mismo destino "un mismo /" se hace asi


router.get("/", function (req, res) {
  res.redirect("home");
});
router.route("/login").get(_usuarioController.formulariologin).post(_usuarioController.autenticar);
router.get("/confirmar/:token", _usuarioController.confirmar);
router.route("/registro").get(_usuarioController.formularioregistro).post(_usuarioController.registrar);
router.route("/reset").get(_usuarioController.formularioresetpass).post(_usuarioController.resetPassword); //router.route("/reset:token").get(comprobartoken).post(nuevapassword);

router.get("/reset/:token", _usuarioController.comprobartoken);
router.post("/reset/:token", _usuarioController.nuevapassword);
router.get("/room/", _ProtegerRutas["default"], _usuarioController.waitpage);
router.get("/home", _usuarioController.homepage);
router.get("/lobby", _ProtegerRutas["default"], _usuarioController.lobbypage);
router.get("/game/", _ProtegerRutas["default"], _usuarioController.gamepage); //for testing

router.get("/test", _usuarioController.gamepage);
router.get("/addroom/", _ProtegerRutas["default"], _usuarioController.addroom);
router.get("/joinroom/", _ProtegerRutas["default"], _usuarioController.joinroom);
router.get("/deleteroom/", _ProtegerRutas["default"], _usuarioController.deleteroom); //router.get("/leaveroom/", protegerRutas, leaveroom); for testing

router.get("/logout", function (req, res) {
  res.clearCookie("_token");
  res.clearCookie("_userName");
  res.redirect("/");
}); //router.get("/reset", formularioresetpass);

var _default = router;
exports["default"] = _default;