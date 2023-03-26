socket = io();

const room = document.getElementById("rooms").textContent;
console.log("hola");

socket.emit("joinroom", room);
socket.on("message", (msg) => {
  console.log(msg);
});
