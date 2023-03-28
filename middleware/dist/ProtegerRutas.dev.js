"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var protegerRutas = function protegerRutas(req, res, next) {
  var _req$cookies, _token, _username, payload;

  return regeneratorRuntime.async(function protegerRutas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$cookies = req.cookies, _token = _req$cookies._token, _username = _req$cookies._username;

          if (!(!_token && !_username)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.json({
            error: "No tienes permiso para acceder a esta ruta"
          }));

        case 3:
          _context.prev = 3;
          payload = _jsonwebtoken["default"].verify(_token, process.env.JWT_SECRET);
          req.usuario = payload;
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          return _context.abrupt("return", res.clearCookie("_token").clearCookie("_username").json({
            msg: "Token invalido"
          }));

        case 12:
          return _context.abrupt("return", next());

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 8]]);
};

var _default = protegerRutas;
exports["default"] = _default;