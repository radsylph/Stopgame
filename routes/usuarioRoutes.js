import express from "express";
import protegerRutas from "../middleware/ProtegerRutas.js";
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
  test,
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
router.route("/reset:token").get(comprobartoken).post(nuevapassword);

router.get("/home", homepage);
router.get("/test", protegerRutas, test);
router.get("/lobby", protegerRutas, lobbypage);

router.get("/logout", (req, res) => {
  res.clearCookie("_token");
  res.redirect("/");
});
//router.get("/reset", formularioresetpass);

export default router;
