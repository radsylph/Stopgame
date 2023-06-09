<<<<<<< HEAD
//import definition for express to work, use the type module in the package.json
import express from "express";

//import the file userRoutes.js for the routes
import usuarioRoutes from "./routes/usuarioRoutes.js";

//import the db.js file for the connection to the database
import db from "./config/db.js";

//import the cookie-parser module to parse the cookies
import cookieParser from "cookie-parser";

//import the csurf module to protect the forms
import csrf from "csurf";
//import server from socket.io to use the socket.io library
import { Server } from "socket.io";
//import the http module to use the http library and create a server
import http from "http";
//import the Players array from the helper.
import { Players } from "./helpers/players.js";

import { Roomlist } from "./controllers/usuarioController.js";
//define the port where the server will be located
const port = process.env.PORT || 3000;

//create a new instance of the express class
const app = express();
//create a new instance of the http class
const server = http.createServer(app);
//create a new instance of the socket.io class
const io = new Server(server);

app.use(cookieParser());
//we use the .use method to define the middlewares that will be used in the application, in this case the express.urlencoded
//method to parse the data that comes from the forms
app.use(express.urlencoded({ extended: true }));

app.use(csrf({ cookie: true })); // for the csrf token

app.use(express.json());
try {
  await db.authenticate();
  db.sync();
  console.log("The connection to the DataBase has been stablished");
} catch (error) {
  console.log(error);
}

//we use the set method to define the view engine (pug in this case) and the views folder
app.set("view engine", "pug");
app.set("views", "./views");

//we use the express.static method to define the public folder
app.use(express.static("public"));

//we use the .use method to define all the routes that will be used in the application, in this case the userRoutes file
//is used for the routes of the users.
app.use("/", usuarioRoutes);

//we use the .listen method to define the port where the server will be located and we also use the console.log method to
//print a message in the console when the server is running
server.listen(port, () => console.log(`Example app listening on port ${port}`));

// Initialize roomPlayers and roomPlayersCount objects
const roomPlayers = {};
const roomPlayersCount = {};

// Set initial count for each room in Roomlist
Roomlist.forEach((room) => {
  roomPlayersCount[room] = 0;
});

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Emit "Userconnected" event to current socket and all other sockets
  socket.emit("Userconnected", "a user connected");
  socket.broadcast.emit("Userconnected", "a user connected");

  // Handle "message" event
  socket.on("message", (msg) => {
    console.log(msg);

    // Emit "message" event to all sockets
    io.emit("message", msg);

    // Emit "message" event to current socket only
    socket.emit("message", msg);

    // Emit "message" event to all sockets except current socket
    socket.broadcast.emit("message", msg);
  });

  // Handle "joinroom" event
  socket.on("joinroom", (room, username) => {
    socket.join(room);
    console.log(`the user:${username} has joined the room ${room}`);

    // Emit "message" event to all sockets in room
    io.to(room).emit(
      "message",
      `the user:${username} has joined the room ${room}`
    );

    // Add user to roomPlayers object and emit "updatePlayers" event to all sockets in room
    if (!roomPlayers[room]) {
      roomPlayers[room] = [];
      roomPlayersCount[room] = 0;
    }
    roomPlayers[room].push(username);
    io.to(room).emit("updatePlayers", roomPlayers[room]);
    roomPlayersCount[room]++;
  });

  // Handle "starttest" event
  socket.on("starttest", (room) => {
    if (roomPlayers[room].length == 2) {
      // Emit "start" event to all sockets in room
      io.to(room).emit("start", room);

      // Listen for "redirect" event on current socket and emit "gamestart" event to all sockets in room
      socket.on("redirect", () => {
        io.to(room).emit("gamestart", room);
      });
    } else {
      // Emit "message" event to all sockets in room
      io.to(room).emit("message", "not enough players");
    }
  });

  socket.on("deleteroom", (room) => {
    // Remove room from Roomlist array
    const index = Roomlist.indexOf(room);
    if (index > -1) {
      Roomlist.splice(index, 1);
      delete roomPlayers[room];
    }
  });

  // Handle "disconnect" event
  socket.on("disconnect", () => {
    console.log("user disconnected");

    // Emit "Userconnected" event to all sockets
    io.emit("Userconnected", "a user disconnected");
  });

  // Handle "leaveroom" event
  socket.on("leaveroom", (room, username) => {
    if (roomPlayers[room]) {
      roomPlayersCount[room]--;

      // If last player leaves room, delete room from roomPlayers object
      if (roomPlayersCount[room] == 0) {
        delete roomPlayers[room];

        // Remove room from Roomlist array
        const index = Roomlist.indexOf(room);
        if (index > -1) {
          Roomlist.splice(index, 1);
        }
      } else {
        // Remove player from roomPlayers object and emit "updatePlayers" event to all sockets in room
        const index = roomPlayers[room].indexOf(username);
        if (index > -1) {
          roomPlayers[room].splice(index, 1);
          io.to(room).emit("updatePlayers", roomPlayers[room]);
        }
      }
    }
  });
});

// Export io and roomPlayers objects
export { io, roomPlayers };
=======
//import definition for express to work, use the type module in the package.json
import express from "express";

//import the file userRoutes.js for the routes
import usuarioRoutes from "./routes/usuarioRoutes.js";

//import the db.js file for the connection to the database
import db from "./config/db.js";

//import the cookie-parser module to parse the cookies
import cookieParser from "cookie-parser";

//import the csurf module to protect the forms
import csrf from "csurf";
//import server from socket.io to use the socket.io library
import { Server } from "socket.io";
//import the http module to use the http library and create a server
import http from "http";

//define the port where the server will be located
const port = process.env.PORT || 3000;

//create a new instance of the express class
const app = express();
//create a new instance of the http class
const server = http.createServer(app);
//create a new instance of the socket.io class
const io = new Server(server);

//we use the .use method to define the middlewares that will be used in the application, in this case the express.urlencoded
//method to parse the data that comes from the forms
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(csrf({ cookie: true })); // for the csrf token

app.use(express.json());
try {
  await db.authenticate();
  db.sync();
  console.log("The connection to the DataBase has been stablished");
} catch (error) {
  console.log(error);
}

//we use the set method to define the view engine (pug in this case) and the views folder
app.set("view engine", "pug");
app.set("views", "./views");

//we use the express.static method to define the public folder
app.use(express.static("public"));

//we use the .use method to define all the routes that will be used in the application, in this case the userRoutes file
//is used for the routes of the users.
app.use("/", usuarioRoutes);

//we use the .listen method to define the port where the server will be located and we also use the console.log method to
//print a message in the console when the server is running
server.listen(port, () => console.log(`Example app listening on port ${port}`));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("Userconnected", "a user connected");
  socket.broadcast.emit("Userconnected", "a user connected");

  socket.on("message", (msg) => {
    //console.log(msg);
    io.emit("message", msg);
    //socket.emit("message", msg);
    //socket.broadcast.emit("message" ,msg);
  });

  socket.on("joinroom", (room) => {
    console.log("joining room " + room);
    socket.join(room);
    io.to(room).emit("message", `a user has connected to the room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("Userconnected", "a user disconnected");
  });
});
>>>>>>> 7b4519f4313fe963f0d2ddecf5cddf7766fe2340
