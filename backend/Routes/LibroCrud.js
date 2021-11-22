const express = require('express');
const router = express.Router();
const libro = require("../Models/Libro");
const pedido = require("../Models/Pedido");
const editorial = require("../Models/Editorial");
const Usuario = require("../Models/Usuario");
var mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: process.cwd() + '/uploads/images' });


// validation
const Joi = require('@hapi/joi');

//Añadir Libro
router.post("/Insertar", async (req, res) => {
	try {

		const book = new libro({
			Titulo: req.body.titulo,
			Autor: req.body.autor,
			Id_editorial: mongoose.Types.ObjectId(req.body.editorial),
			NombreEditorial: req.body.nombreEditorial,
			Precio: req.body.precio,
			Cantidad_dis: req.body.cantidad,
			Fecha_adquision: req.body.fecha,
			Sinopsis: req.body.sinopsis,
			Genero: req.body.genero,
			Imagen: req.body.imagen,
			Formato: req.body.formato,
			Vendidos:0

		});

		const savedBook = book.save();
		res.json({
			error: null,
			response: "Añadido",
			data: savedBook

		})
		console.log(savedBook)


	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error })
	}

});

//Ver libro
router.get("/Ver/:id", async (req, res) => {
	const id = req.params.id;
	libro.findById({ _id: id }).then((doc) => {
		res.json({ data: doc, error: null });
	});

});

//Ver libros por generos
router.get("/VerGenero/:genero", async (req, res) => {
	const genero = req.params.genero;
	libro.find({ Genero: genero }).then((doc) => {
		res.json({ data: doc, error: null });
	})

});

//Ver todos los libros
router.get("/VerTodos", async (req, res) => {

	libro.find({}).then((doc) => {
		res.json({ lib: doc, error: null });
	})

});

//Ver filtrar libros por precio
router.get("/FiltrarPrecio", async (req, res) => {

	const MinVal = req.query.min;
	const MaxVal = req.query.max;
	const Search = req.query.max;

	libro.find({ $and: [{ Precio: { $gte: MinVal } }, { Precio: { $lte: MaxVal } }] }).then((doc) => {
		res.json({ lib: doc, error: null });
	})

});

//Ver los 10 libros más vendidos
router.get("/VerMasVendidos", async (req, res) => {
	libro.find({}).sort({Vendidos: -1})
	.then(doc => {
		
		doc.splice(10);
		res.json({lib: doc, error: null});
	})
});

//Ver los 6 libros más novedosos
router.get("/Novedades", async (req, res) => {
	libro.find({}).sort({Fecha_adquision: -1})
	.then(doc => {
	
		doc.splice(6);
		res.json({lib: doc, error: null});
	});
})

//Buscar libros
router.get("/Buscar", async (req, res) => {
	if (Object.keys(req.query).length != 0) {
		if (req.query.name !== undefined) {
			const Search = req.query.name;

			if (
				(req.query.min !== undefined && req.query.min !== "") &&
				(req.query.max !== undefined && req.query.max !== "")
			) {

				const MinVal = req.query.min;
				const MaxVal = req.query.max;

				libro.find({
					$and:
						[
							{
								$or: [
									{ Titulo: { $regex: `${Search}`, $options: 'i' } },
									{ Autor: { $regex: `${Search}`, $options: 'i' } }]
							},
							{ Precio: { $gte: MinVal } },
							{ Precio: { $lte: MaxVal } }]
				})
					.then((doc) => {
						res.json({ lib: doc, error: null });
					});
			}
			else {
				libro.find({ $or: [{ Titulo: { $regex: `${Search}`, $options: 'i' } }, { Autor: { $regex: `${Search}`, $options: 'i' } }] })
					.then((doc) => {
						res.json({ lib: doc, error: null });
					});
			}
		}
		else {
			if (
				(req.query.min !== undefined || req.query.min !== "") &&
				(req.query.max !== undefined || req.query.max !== "")
			) {
				const MinVal = req.query.min;
				const MaxVal = req.query.max;
				libro.find({ $and: [{ Precio: { $gte: MinVal } }, { Precio: { $lte: MaxVal } }] }).then((doc) => {
					res.json({ lib: doc, error: null });
				})
			}
			else {
				libro.find({ $or: [{ Titulo: { $regex: `${Search}`, $options: 'i' } }, { Autor: { $regex: `${Search}`, $options: 'i' } }] })
					.then((doc) => {
						res.json({ lib: doc, error: null });
					});
			}
		}
	}
	else {
		libro.find({}).then((doc) => {
			res.json({ lib: doc, error: null });
		})
	}
});

//Modificar libro
router.put("/Modificar/:id", (req, res) => {

	const id = req.params.id;
	const titu = req.body.titulo;
	const au = req.body.autor;
	const sinop = req.body.sinopsis;
	const gen = req.body.genero;
	const edit = mongoose.Types.ObjectId(req.body.editorial);
	const nom_edit = req.body.nombreEditorial;
	const pre = req.body.precio;
	const cant = req.body.cantidad;
	const vend = req.body.vendidos;
	const imag = req.body.imagen;
	const fecha = req.body.fecha;
	const format = req.body.formato;

	libro.findByIdAndUpdate(
		{ _id: id },
		{
			$set: {
				Titulo: titu, Autor: au, Sinopsis: sinop, Genero: gen,
				Id_editorial: edit,
				NombreEditorial: nom_edit,
				Precio: pre, Cantidad_dis: cant,
				Imagen: imag,
				Vendidos: vend, Fecha_adquision: fecha, Formato: format
			}
		}
	)
		.then((doc) => {
			res.json({ response: "Libro Modificado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
			res.status(400).json({ error: err.message });
		});
});

//Eliminar libro
router.get("/Eliminar/:id", (req, res) => {
	const id = req.params.id;
	libro.findByIdAndDelete({ _id: id })
		.then((doc) => {
			res.json({ response: "Libro eliminado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Es una función a parte
//Esta es la función para subir imagenes al servidor
// la función upload.single('photo') se encarga de subir la foto, de la variable llamada photo
router.post('/SubirImagen', upload.single('photo'), (req, res) => {
	if (req.file) { // Si se mando el archivo
		res.json(req.file); // se regresa una respuesta de verificación con la ruta o nombre del archivo
	}
	else { // si no se regresa una respuesta con error al cliente
		res.status(400).json({ error: "No se pudo subir el archivo" });
	}
});
// esta es la ruta para mostrar las imagenes
router.use('/Imagen', express.static(process.cwd() + '/uploads/images'));

module.exports = router;