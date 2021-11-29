const express = require('express');
const router = express.Router();
const cuenta = require("../Models/Cuenta");
const compra = require("../Models/Compra");
const Usuario = require("../Models/Usuario");
var mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: process.cwd() + '/uploads/images' });


// validation
const Joi = require('@hapi/joi');

//Añadir Cuenta
router.post("/Insertar", async (req, res) => {
	try {

		const account = new cuenta({
			Titulo: req.body.titulo,
			Id_vendedor: mongoose.Types.ObjectId(req.body.vendedor),
			Tipo: req.body.tipo,
			Plataforma: req.body.plataforma,
			Descripcion: req.body.descripcion,
			Precio: req.body.precio,
			Estado: req.body.estado,
			Imagen: req.body.imagen,
		});

		const savedAccount = account.save();
		res.json({
			error: null,
			response: "Añadido",
			data: savedAccount

		})
		console.log(savedAccount)

	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error })
	}

});

//Ver cuenta
router.get("/Ver/:id", async (req, res) => {
	const id = req.params.id;
	cuenta.findById({ _id: id }).then((doc) => {
		res.json({ data: doc, error: null });
	});
});

//Ver cuentas por tipo
router.get("/VerTipo/:tipo", async (req, res) => {
	const tipo = req.params.tipo;
	cuenta.find({ Tipo: tipo }).then((doc) => {
		res.json({ data: doc, error: null });
	})
});

//Ver cuentas por plataforma
router.get("/VerPlataforma/:plataforma", async (req, res) => {
	const plataforma = req.params.plataforma;
	cuenta.find({ Plataforma: plataforma }).then((doc) => {
		res.json({ data: doc, error: null });
	})
});

//Ver todas las cuentas
router.get("/VerTodos", async (req, res) => {
	let makeSearch = {};
	if("plataforma" in req.query){
		makeSearch = {
			Plataforma: {$regex: req.query.plataforma, $options: 'i'},
			...makeSearch
		}
	}

	if("tipo" in req.query){
		makeSearch = {
			Tipo: {$regex: req.query.tipo, $options: 'i'},
			...makeSearch
		}
	}

	if("titulo" in req.query){
		makeSearch= {
			Titulo: {$regex: req.query.titulo, $options: 'i'},
			...makeSearch
		}
	}

	cuenta.find(makeSearch).limit(req.query.page*25).then((doc) => {
		res.json({ accounts: doc, error: null });
	})
});

//Ver filtrar cuentas por precio
router.get("/FiltrarPrecio", async (req, res) => {

	const MinVal = req.query.min;
	const MaxVal = req.query.max;

	cuenta.find({ $and: [{ Precio: { $gte: MinVal } }, { Precio: { $lte: MaxVal } }] }).then((doc) => {
		res.json({ lib: doc, error: null });
	})

});

/*
//Ver los 10 libros más vendidos
router.get("/VerMasVendidos", async (req, res) => {
	cuenta.find({}).sort({Vendidos: -1})
	.then(doc => {
		
		doc.splice(10);
		res.json({lib: doc, error: null});
	})
});
*/

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

				cuenta.find({
					$and:
						[
							{
								$or: [
									{ Titulo: { $regex: `${Search}`, $options: 'i' } }]
							},
							{ Precio: { $gte: MinVal } },
							{ Precio: { $lte: MaxVal } }]
				})
					.then((doc) => {
						res.json({ lib: doc, error: null });
					});
			}
			else {
				cuenta.find({ $or: [{ Titulo: { $regex: `${Search}`, $options: 'i' } }, { Autor: { $regex: `${Search}`, $options: 'i' } }] })
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
				cuenta.find({ $and: [{ Precio: { $gte: MinVal } }, { Precio: { $lte: MaxVal } }] }).then((doc) => {
					res.json({ lib: doc, error: null });
				})
			}
			else {
				cuenta.find({ $or: [{ Titulo: { $regex: `${Search}`, $options: 'i' } }, { Autor: { $regex: `${Search}`, $options: 'i' } }] })
					.then((doc) => {
						res.json({ lib: doc, error: null });
					});
			}
		}
	}
	else {
		cuenta.find({}).then((doc) => {
			res.json({ lib: doc, error: null });
		})
	}
});

//Modificar libro
router.put("/Modificar/:id", (req, res) => {

	const id = req.params.id;
	const titu = req.body.titulo;
	const pre = req.body.precio;
	const imag = req.body.imagen;
	const estado = req.body.estado;
	const desc = req.body.desc;
	const tipo = req.body.tipo;
	const plataforma = req.body.plataforma;

	cuenta.findByIdAndUpdate(
		{ _id: id },
		{
			$set: {
				Titulo: titu,
				Precio: pre,
				Tipo: tipo,
				Plataforma: plataforma,
				Estado: estado,
				Descripcion: desc,
				Imagen, imag
			}
		}
	)
		.then((doc) => {
			res.json({ response: "Cuenta Modificada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
			res.status(400).json({ error: err.message });
		});
});

//Eliminar libro
router.get("/Eliminar/:id", (req, res) => {
	const id = req.params.id;
	cuenta.findByIdAndDelete({ _id: id })
		.then((doc) => {
			res.json({ response: "Cuenta eliminada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});
router.post('/RemoverVendidas', (req, res) => {
	cuenta.find({Estado: "Vendida"}).then((accounts) => {
		console.log(accounts);
		if(Object.keys(accounts).length > 0){
			for(let acc in accounts){
				console.log(acc);
				compra.findByIdAndRemove({_id: accounts[acc]._id}).then((doc) => {
					console.log(`Cuenta: {accounts[acc].titulo} removida de compras`);
					cuenta.findByIdAndDelete({_id: accounts[acc]._id}).then((doc) => {
						console.log(`Cuenta: {accounts[acc].titulo} removida de cuentas en venta`);
						res.status(200).json({response: "Cuentas eliminadas"})
					}).catch((err) => {
						console.log(err.message);
						res.status(400).json({error: err.message});
					})
				}).catch((err) => {
					console.log(err.message);
				});
			}
		}else{
			res.status(200).json({response: "No hay cuentas por remover"});
		}
	}).catch((err) => {
		console.log("No hay nada que remover");
		res.status(400).json({error: err.message});
	});
})
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