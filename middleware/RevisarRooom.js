import { Roomlist } from "../controllers/usuarioController.js";

function Duplicated(roomName, roomList) {
  for (var i = 0; i < roomList.length; i++) {
    if (roomList[i].name == roomName) {
      console.log("there are duplicates rooms");
      return true;
    }
  }
  console.log("there are no duplicates rooms");
  return false;
}

const revisarrooms = async (req, res, next) => {
  const name = req.query.name;
  if (Duplicated(name, Roomlist)) {
    return res.json({ error: "Ya existe una sala con ese nombre" });
  }
  return next();
};

//export default revisarrooms;
