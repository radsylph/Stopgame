// Connect to Socket.IO server

const socket = io();

// Get room and username from HTML content

const room = document.getElementById("rooms").textContent;
const username = document.getElementById("username").textContent;

// Event handlers for Socket.IO events

socket.on("message", (msg) => {
  console.log(msg);
});

socket.on("Userconnected", (msg) => {
  console.log(msg);
});

socket.on("gamestart", (room) => {
  socket.emit("deleteroom", room);
  window.location.replace("/game?name=" + room);
});

socket.on("start", (room) => {
  StartBtn.style.cursor = "pointer";
  StartBtn.disabled = false;

  StartBtn.addEventListener("click", () => {
    socket.emit("redirect", room);
  });
  //window.location.replace("/game?name=" + room);
});

socket.on("updatePlayers", (players) => {
  playerlist.innerHTML = "";
  players.forEach((player) => {
    const li = document.createElement("li");
    li.textContent = player;
    playerlist.appendChild(li);
  });
});

// Join the room when the page loads

socket.emit("joinroom", room, username);

// send an emit to check when the game can start

socket.emit("starttest", room);

// Get DOM elements

const StartBtn = document.getElementById("Start");
const FinishBtn = document.getElementById("Finish");
const LeaveBtn = document.getElementById("leave");
const playerlist = document.getElementById("playerlist");

StartBtn.disabled = true;

// Event listeners for button clicks
/*StartBtn.addEventListener("click", () => {
  httpjoin(room);
});*/

FinishBtn.addEventListener("click", () => {
  httpend(room);
});

LeaveBtn.addEventListener("click", () => {
  socket.emit("leaveroom", room, username);
  window.location.replace("/lobby");
});

// Function to join the room using AJAX
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
      window.location.replace(`/game?name=${name}`);
    })
    .catch((error) => {
      console.error("Failed to join the room:", error);
      if (error.message === "Bad request") {
        alert("There isn't a room with that name.");
      } else {
        alert("There was an error joining the room.");
      }
    });
}

// Function to end the room using AJAX
function httpend(name) {
  fetch(`/deleteroom?name=${name}`)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status === 400) {
        throw new Error("Bad request");
      }
    })
    .then((data) => {
      console.log("fetch data " + data);
      alert("The room was successfully deleted.");
      window.location.replace("/lobby");
    })
    .catch((error) => {
      console.error("Failed to end the room:", error);
      if (error.message === "Bad request") {
        alert("There isn't a room with that name.");
        window.location.replace("/lobby");
      } else {
        alert("There was an error deleting the room.");
      }
    });
}
