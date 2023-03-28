"use strict";

// Connect to Socket.IO server
var socket = io(); // Get room and username from HTML content

var room = document.getElementById("rooms").textContent;
var username = document.getElementById("username").textContent; // Event handlers for Socket.IO events

socket.on("message", function (msg) {
  console.log(msg);
});
socket.on("Userconnected", function (msg) {
  console.log(msg);
});
socket.on("gamestart", function (room) {
  socket.emit("deleteroom", room);
  window.location.replace("/game?name=" + room);
});
socket.on("start", function (room) {
  StartBtn.style.cursor = "pointer";
  StartBtn.disabled = false;
  StartBtn.addEventListener("click", function () {
    socket.emit("redirect", room);
  }); //window.location.replace("/game?name=" + room);
});
socket.on("updatePlayers", function (players) {
  playerlist.innerHTML = "";
  players.forEach(function (player) {
    var li = document.createElement("li");
    li.textContent = player;
    playerlist.appendChild(li);
  });
}); // Join the room when the page loads

socket.emit("joinroom", room, username); // send an emit to check when the game can start

socket.emit("starttest", room); // Get DOM elements

var StartBtn = document.getElementById("Start");
var FinishBtn = document.getElementById("Finish");
var LeaveBtn = document.getElementById("leave");
var playerlist = document.getElementById("playerlist");
StartBtn.disabled = true; // Event listeners for button clicks

/*StartBtn.addEventListener("click", () => {
  httpjoin(room);
});*/

FinishBtn.addEventListener("click", function () {
  httpend(room);
});
LeaveBtn.addEventListener("click", function () {
  socket.emit("leaveroom", room, username);
  window.location.replace("/lobby");
}); // Function to join the room using AJAX

function httpjoin(name) {
  fetch("/joinroom?name=".concat(name)).then(function (response) {
    if (response.ok) {
      return response.text();
    } else if (response.status === 400) {
      throw new Error("Bad request");
    }
  }).then(function (data) {
    console.log("fetch data " + data);
    window.location.replace("/game?name=".concat(name));
  })["catch"](function (error) {
    console.error("Failed to join the room:", error);

    if (error.message === "Bad request") {
      alert("There isn't a room with that name.");
    } else {
      alert("There was an error joining the room.");
    }
  });
} // Function to end the room using AJAX


function httpend(name) {
  fetch("/deleteroom?name=".concat(name)).then(function (response) {
    if (response.ok) {
      return response.text();
    } else if (response.status === 400) {
      throw new Error("Bad request");
    }
  }).then(function (data) {
    console.log("fetch data " + data);
    alert("The room was successfully deleted.");
    window.location.replace("/lobby");
  })["catch"](function (error) {
    console.error("Failed to end the room:", error);

    if (error.message === "Bad request") {
      alert("There isn't a room with that name.");
      window.location.replace("/lobby");
    } else {
      alert("There was an error deleting the room.");
    }
  });
}