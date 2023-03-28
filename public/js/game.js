socket = io();

const room = document.getElementById("rooms").textContent;
console.log("hola desde el juego");

socket.emit("joinroom", room);
socket.emit("GenerateLetter", room);
socket.on("message", (msg) => {
  console.log(msg);
});
