import jwt from "jsonwebtoken";

const protegerRutas = async (req, res, next) => {
  const { _token } = req.cookies;

  if (!_token) {
    return res.json({ error: "No tienes permiso para acceder a esta ruta" });
  }

  try {
    const payload = jwt.verify(_token, process.env.JWT_SECRET);
    req.usuario = payload;
  } catch (error) {
    console.log(error);
    return res.clearCookie("_token").json({ msg: "Token invalido" });
  }
  return next();
};

export default protegerRutas;
