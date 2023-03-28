"use strict";

var _usuarioController = require("../controllers/usuarioController.js");

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

var revisarrooms = function revisarrooms(req, res, next) {
  var name;
  return regeneratorRuntime.async(function revisarrooms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.query.name;

          if (!Duplicated(name, _usuarioController.Roomlist)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.json({
            error: "Ya existe una sala con ese nombre"
          }));

        case 3:
          return _context.abrupt("return", next());

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //export default revisarrooms;