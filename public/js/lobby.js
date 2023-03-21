let socket = io();

console.log("hola desde el script lobby.js");

const Joinbtn = document.getElementById("JoinRoomBtn");
const Createbtn = document.getElementById("CreateRoomBtn");
const RoomName = document.getElementById("RoomInput");

socket.on("Userconnected", (msg) => {
  console.log(msg);
  //alert(msg);
});

socket.on("CreateRoom") , (rn) =>{

}

socket.on("message", (msg) => {
  console.log(msg);
});

Createbtn.addEventListener("click" , ()=>{
  const log = RoomName
  socket.emit = ("CreateRoom" , log.value);
})

Joinbtn.addEventListener("click", () => {
  console.log("xd");
  socket.emit("message", RoomName.value);
});
