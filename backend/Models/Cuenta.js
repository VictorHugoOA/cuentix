const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Libro esquema
const cuentaSchema = new Schema({
    Titulo: {type: String},
    Id_vendedor: { type: Schema.Types.ObjectId, ref: "Usuario", default: undefined},
    Tipo: {type: String},
    Plataforma: {type: String},
    Descripcion: {type: String},
    Precio: {type: Number},
    Estado: {type: String},
    Imagen: {type: String},
});

module.exports = mongoose.model('Cuenta', cuentaSchema,'Cuenta');


