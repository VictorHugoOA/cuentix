const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const compraSchema = new Schema({
  Id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  Id_cuenta: {type: Schema.Types.ObjectId, ref: "Cuenta"},
  Fecha: { type: Date },
  Estado: { type: String },
});
//Usuario esquema
const usuarioSchema = new Schema({
  Usuario: { type: String },
  Contrasena: { type: String },
  Email: { type: String, unique: true },
  Lista_Compras: [
    {
      type: Compra,
      default: () => ({}),
    },
  ],
  Admi: { type: Boolean, default: false },
  Descripcion: {type: String}
});

module.exports = mongoose.model("Usuario", usuarioSchema, "Usuario");
