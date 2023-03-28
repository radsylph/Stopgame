<<<<<<< HEAD
socket = io();

const room = document.getElementById("rooms").textContent;
console.log("hola desde el juego");

socket.emit("joinroom", room);
socket.emit("GenerateLetter", room);
socket.on("message", (msg) => {
  console.log(msg);
});
=======
socket = io();

const room = document.getElementById("rooms").textContent;
console.log("hola");

socket.emit("joinroom", room);
socket.on("message", (msg) => {
  console.log(msg);
});
>>>>>>> 7b4519f4313fe963f0d2ddecf5cddf7766fe2340
