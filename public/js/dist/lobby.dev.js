"use strict";

var socket = io();
console.log("hola desde el script lobby.js");
var Joinbtn = document.getElementById("JoinRoomBtn");
var Createbtn = document.getElementById("CreateRoomBtn");
var RoomName1 = document.getElementById("RoomInput1");
var RoomName2 = document.getElementById("RoomInput2");
var Section = document.getElementById("general");
var rooms = document.getElementById("rooms");
var username = document.getElementById("username").textContent; //const roomlist = rooms.split(",");

socket.on("Userconnected", function (msg) {
  console.log(msg);
});
socket.emit("message", "hola desde el lobby");
Createbtn.addEventListener("click", function () {
  console.log("create room");
  var roomname = RoomName1.value;

  if (roomname == "") {
    alert("Please enter a valid room name");
  } else {
    httpcreate(roomname);
  }
});

function httpjoin(name) {
  fetch("/joinroom?name=".concat(name)).then(function (response) {
    if (response.ok) {
      return response.text();
    } else if (response.status === 400) {
      throw new Error("Bad request");
    }
  }).then(function (data) {
    console.log("fetch data " + data);
    window.location.href = "/room?name=" + name;
  })["catch"](function (error) {
    console.error("Failed to join the room:", error);

    if (error.message === "Bad request") {
      alert("there isn't a room with that name");
    } else {
      alert("There was an creating the room");
    }
  });
}

function httpcreate(name) {
  fetch("/addroom?name=".concat(name)).then(function (response) {
    if (response.ok) {
      return response.text();
    } else if (response.status === 400) {
      throw new Error("Bad request");
    }
  }).then(function (data) {
    console.log("fetch data " + data);
    alert("Room created");
    window.location.href = "/room?name=" + name;
  })["catch"](function (error) {
    console.error("Failed to create the room:", error);

    if (error.message === "Bad request") {
      alert("There is already a room with that name");
    } else {
      alert("There was an error creating the room");
    }
  });
}

Joinbtn.addEventListener("click", function () {
  var roomname = RoomName2.value;

  if (roomname == "") {
    alert("Please enter a room name");
  } else {
    httpjoin(roomname);
  }
});