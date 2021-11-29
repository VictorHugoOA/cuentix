const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Editorial esquema
const editorialSchema = new Schema({
    Nombre_encargado: { type: String },
    Ape_encargado: { type: String },
    Nombre_editorial: { type: String },
    Email: { type: String },
    Tel: { type: Number }
});


module.exports = mongoose.model('Editorial', editorialSchema,'Editorial');


