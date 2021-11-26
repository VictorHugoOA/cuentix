const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Usuario esquema
const usuarioSchema = new Schema({
  Usuario: { type: String },
  Contrasena: { type: String },
  Email: { type: String, unique: true },
  Admi: { type: Boolean, default: false },
  Descripcion: {type: String, default: ""},
  Tipo: {type: String}
});

module.exports = mongoose.model("Usuario", usuarioSchema, "Usuario");
