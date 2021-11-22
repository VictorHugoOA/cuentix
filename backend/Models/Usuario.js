const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Direccion = new Schema({
  Pais: { type: String, default: "" },
  Estado: { type: String, default: "" },
  Ciudad: { type: String, default: "" },
  Colonia: { type: String, default: "" },
  Calle: { type: String, default: "" },
  Numero_int: { type: Number, default: 0 },
  Codigo_postal: { type: Number, default: 0 },
});
const Carrito = new Schema({
  Libro: { type: Schema.Types.ObjectId, ref: "Libro", default: undefined },
  Cantidad: { type: Number, default: 1 },
  Formato: { type: String },
  Submonto: {type: Number }
});
const Deseos = new Schema({
  Libro: {
    type: Schema.Types.ObjectId,
    ref: "Libro",
    default: undefined,
    
  },
});
//Usuario esquema
const usuarioSchema = new Schema({
  Nombre: { type: String },
  Apellido: { type: String },
  Contrasena: { type: String },
  Email: { type: String, unique: true },
  Deseos: [{ type: Deseos, default: () => ({}) }],
  Carrito: [
    {
      type: Carrito,
      default: () => ({}),
    },
  ],
  Direccion: [
    {
      type: Direccion,
      default: () => ({}),
    },
  ],
  Admi: { type: Boolean, default: 0 },
});

module.exports = mongoose.model("Usuario", usuarioSchema, "Usuario");
