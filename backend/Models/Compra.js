const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Pedido Esquema
const compraSchema = new Schema({
  Id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  Id_cuenta: {type: Schema.Types.ObjectId, ref: "Cuenta"},
  Fecha: { type: Date },
  Estado: { type: String },
});

module.exports = mongoose.model("Compra", compraSchema, "Compra");