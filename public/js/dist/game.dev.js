"use strict";

socket = io();
var room = document.getElementById("rooms").textContent;
console.log("hola desde el juego");
socket.emit("joinroom", room);
socket.emit("GenerateLetter", room);
socket.on("message", function (msg) {
  console.log(msg);
});