import Sequelize from "sequelize"; //we import the sequelize library
import dotenv from "dotenv"; //we import the dotenv library, which allows us to use environment variables

dotenv.config({ path: ".env" });
//we create a new instance of the sequelize class, we pass the database name, the user and the password and
//also the host and the dialect (postgres in this case), and we also pass the port where the database is located
//and the define object, which is an object that allows us to define some configurations for the database.
const db = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    dialect: "postgres",
    port: 5432,
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 15000,
    },
  }
);

export default db;
