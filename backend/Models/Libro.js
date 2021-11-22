const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Libro esquema
const libroSchema = new Schema({
    Titulo: { type: String },
    Autor: { type: String },
    Sinopsis:{type: String},
    Genero: {type:String},
    Id_editorial: { type: Schema.Types.ObjectId, ref: "Editorial", default: undefined },
	NombreEditorial: {type: String},
    Precio: { type: Number },
    Cantidad_dis: { type:Number },
    Imagen: { type:String },
    Vendidos: { type:Number },
    Fecha_adquision: { type: Date },
    Formato:{type:String}
});

module.exports = mongoose.model('Libro', libroSchema,'Libro');


