let socket = io();

console.log("hola desde el script lobby.js");

const Joinbtn = document.getElementById("JoinRoomBtn");
const Createbtn = document.getElementById("CreateRoomBtn");
const RoomName1 = document.getElementById("RoomInput1");
const RoomName2 = document.getElementById("RoomInput2");
const Section = document.getElementById("general");
const rooms = document.getElementById("rooms");
//const roomlist = rooms.split(",");

socket.on("Userconnected", (msg) => {
  console.log(msg);
  //alert(msg);
});

socket.on("message", (msg) => {
  console.log(msg);
});

Createbtn.addEventListener("click", () => {
  console.log("create room");
  let rn = RoomName1.value;
  if (rn == "") {
    alert("Please enter a valid room name");
  } else {
    httpcreate(rn);
  }
});

function httpjoin(name) {
  fetch(`/joinroom?name=${name}`)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 400) {
        throw new Error("Bad request");
      }
    })
    .then((data) => {
      console.log("fetch data " + data);
      window.location.href = "/room?name=" + name;
    })
    .catch((error) => {
      console.error("Failed to join the room:", error);
      if (error.message === "Bad request") {
        alert("there isn't a room with that name");
      } else {
        alert("There was an creating the room");
      }
    });
}

function httpcreate(name) {
  fetch(`/addroom?name=${name}`)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 400) {
        throw new Error("Bad request");
      }
    })
    .then((data) => {
      console.log("fetch data " + data);
      alert("Room created");
      window.location.href = "/room?name=" + name;
    })
    .catch((error) => {
      console.error("Failed to join room:", error);
      if (error.message === "Bad request") {
        alert("There is already a room with that name");
      } else {
        alert("There was an error creating the room");
      }
    });
}

Joinbtn.addEventListener("click", () => {
  let rn = RoomName2.value;
  if (rn == "") {
    alert("Please enter a room name");
  } else {
    httpjoin(rn);
  }
});
