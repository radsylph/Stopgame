import { DataTypes } from "sequelize"; //we import the data type to define the type of data that will be stored in the database
import bcrypt from "bcrypt"; //we import the bcryptjs library to encrypt the password
import db from "../config/db.js"; //we import the connection to the database

const Usuario = db.define(
  "usuarios",
  {
    //we define the name of the table in the database
    name: {
      type: DataTypes.STRING, //we define the type of data that will be stored in the column
      allowNull: false,
    },
    email: {
      //we define the email column
      type: DataTypes.STRING, //we define the type of data that will be stored in the column
      allowNull: false, //we define that the column cannot be null
      validate: {
        //need to test this later
        //we define the validation that will be applied to the data that will be stored in the column
        isEmail: {
          //we define that the data that will be stored in the column must be an email
          msg: "Agrega un correo válido", //we define the message that will be displayed if the data that will be stored in the column is not an email
        },
        notEmpty: {
          //we define that the data that will be stored in the column cannot be empty
          msg: "El email no puede ir vacío", //we define the message that will be displayed if the data that will be stored in the column is empty
        },
      },
      unique: {
        //we define that the data that will be stored in the column must be unique
        args: true, //we define that the data that will be stored in the column must be unique
        msg: "Usuario ya registrado", //we define the message that will be displayed if the data that will be stored in the column is not unique
      },
    },
    password: {
      //we define the password column
      type: DataTypes.STRING, //we define the type of data that will be stored in the column
      allowNull: false, //we define that the column cannot be null
      validate: {
        //we define the validation that will be applied to the data that will be stored in the column
        notEmpty: {
          //we define that the data that will be stored in the column cannot be empty
          msg: "El password no puede ir vacío", //we define the message that will be displayed if the data that will be stored in the column is empty
        },
      },
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async (usuario) => {
        const salt = await bcrypt.genSalt(10); // we create the salt
        usuario.password = await bcrypt.hash(usuario.password, salt); //we encrypt the password
      },
    },
  }
);

// es la unica manera de agregar metodos a un modelo de sequelize por los momentos
Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password); //we compare the password that the user
  //enters with the password that is stored in the database
};

export default Usuario;
