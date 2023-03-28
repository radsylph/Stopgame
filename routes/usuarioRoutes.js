<<<<<<< HEAD
import express from "express";
import protegerRutas from "../middleware/ProtegerRutas.js";
//import revisarrooms from "../middleware/RevisarRooom.js";
import {
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
  addroom,
  deleteroom,
  joinroom,
  waitpage,
} from "../controllers/usuarioController.js";

const router = express.Router();
//si quiero tener diferentes tipos de html responses con un mismo destino "un mismo /" se hace asi

router.get("/", (req, res) => {
  res.redirect("home");
});

router.route("/login").get(formulariologin).post(autenticar);
router.get("/confirmar/:token", confirmar);
router.route("/registro").get(formularioregistro).post(registrar);
router.route("/reset").get(formularioresetpass).post(resetPassword);
//router.route("/reset:token").get(comprobartoken).post(nuevapassword);
router.get("/reset/:token", comprobartoken);
router.post("/reset/:token", nuevapassword);
router.get("/room/", protegerRutas, waitpage);
router.get("/home", homepage);
router.get("/lobby", protegerRutas, lobbypage);
router.get("/game/", protegerRutas, gamepage); //for testing
router.get("/test", gamepage);
router.get("/addroom/", protegerRutas, addroom);
router.get("/joinroom/", protegerRutas, joinroom);
router.get("/deleteroom/", protegerRutas, deleteroom);
//router.get("/leaveroom/", protegerRutas, leaveroom); for testing

router.get("/logout", (req, res) => {
  res.clearCookie("_token");
  res.clearCookie("_userName");
  res.redirect("/");
});
//router.get("/reset", formularioresetpass);

export default router;
=======
import express from "express";
import protegerRutas from "../middleware/ProtegerRutas.js";
import revisarrooms from "../middleware/RevisarRooom.js";
import {
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
  deleteroom,
  joinroom,
} from "../controllers/usuarioController.js";

const router = express.Router();
//si quiero tener diferentes tipos de html responses con un mismo destino "un mismo /" se hace asi

router.get("/", (req, res) => {
  res.redirect("home");
});

router.route("/login").get(formulariologin).post(autenticar);
router.get("/confirmar/:token", confirmar);
router.route("/registro").get(formularioregistro).post(registrar);
router.route("/reset").get(formularioresetpass).post(resetPassword);
//router.route("/reset:token").get(comprobartoken).post(nuevapassword);
router.get("/reset/:token", comprobartoken);
router.post("/reset/:token", nuevapassword);
router.get("/room/", protegerRutas, gamepage);
router.get("/home", homepage);
router.get("/lobby", protegerRutas, lobbypage);
router.get("/game", protegerRutas, gamepage2);
router.get("/addroom/", protegerRutas, addroom);
router.get("/joinroom/", protegerRutas, joinroom);
router.get("/deleteroom/", protegerRutas, deleteroom);

router.get("/logout", (req, res) => {
  res.clearCookie("_token");
  res.clearCookie("_userName");
  res.redirect("/");
});
//router.get("/reset", formularioresetpass);

export default router;
>>>>>>> 7b4519f4313fe963f0d2ddecf5cddf7766fe2340
