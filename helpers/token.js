import crypto from "crypto";
import jwt from "jsonwebtoken";

const generateToken1 = () => {
  const token = crypto.randomBytes(10).toString("hex");
  console.log(token);
  return token;
};

const generateJWT = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
function decoded(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return { id: decoded.id, name: decoded.name };
}

/*const generateToken2 = () => {
  let x = Math.random().toString(36).substring(2, 15) + Date.now().toString(32);
  console.log(x);
  return x;
};*/

export { generateToken1, generateJWT, decoded };
