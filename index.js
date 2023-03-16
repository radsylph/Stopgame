//must migrate to clean arquitecture

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

//define the port where the server will be located
const port = process.env.PORT || 3000;

//create a new instance of the express class
const app = express();
//we use the .use method to define the middlewares that will be used in the application, in this case the express.urlencoded
//method to parse the data that comes from the forms
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(csrf({ cookie: true })); // for the csrf token

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
app.listen(port, () => console.log(`Example app listening on port ${port}`));
