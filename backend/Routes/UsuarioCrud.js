const router = require("express").Router();
const usuario = require("../Models/Usuario");
const Usuario = require("../Models/Usuario");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// constraseña
const bcrypt = require("bcrypt");

// validation
const Joi = require("@hapi/joi");
const schemaRegister = Joi.object({
	usuario: Joi.string().min(6).max(255).required(),
	email: Joi.string().max(255).required().email(),
	contra: Joi.string().min(2).max(1024).required(),
	tipo: Joi.string().min(2).max(255).required()
});
const schemaLogin = Joi.object({
	usuario: Joi.string().min(6).max(255).required(),
	contra: Joi.string().min(2).max(1024).required(),
});

//Añadir usuario por registro
router.post("/Registro", async (req, res) => {
	try {
		// validate user
		const { error } = schemaRegister.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const isEmailExist = await Usuario.findOne({ Email: req.body.email });
		const isUserExist = await Usuario.findOne({Usuario: req.body.usuario});
		if (isUserExist){
			return res.status(400).json({error: "Nombre de usuario ya registrado"});
		}
		if (isEmailExist) {
			return res.status(400).json({ error: "Email ya registrado" });
		}
		// hash contraseña
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.contra, salt);

		const user = new usuario({
			Usuario: req.body.usuario,
			Contrasena: password,
			Email: req.body.email,
			Tipo: req.body.tipo
		});

		const savedUser = user.save();
		res.json({
			error: null,
			response: "Añadido",
			data: savedUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Añadir usuario por admi
router.post("/Insertar", async (req, res) => {
	try {
		console.log("hola");
		const isEmailExist = await Usuario.findOne({ Email: req.body.email });
		const isUserExist = await Usuario.findOne({Usuario: req.body.usuario});

		if (isEmailExist) {
			return res.status(400).json({ error: "Email ya registrado" });
		}
		if (isUserExist){
			return res.status(400).json({error: "Nombre de usuario ya registrado"});
		}
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.contra, salt);

		const user = new usuario({
			Usuario: req.body.usuario,
			Contrasena: password,
			Email: req.body.email,
			Admi: req.body.admi,
		});

		const savedUser = user.save();
		console.log(savedUser);
		res.json({
			error: null,
			response: "Añadido",
			data: savedUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Login
router.post("/login", async (req, res) => {
	// validaciones
	const { error } = schemaLogin.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const user = await Usuario.findOne({ Usuario: req.body.usuario });
	if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

	const validPassword = await bcrypt.compare(req.body.contra, user.Contrasena);
	if (!validPassword)
		return res.status(400).json({ error: "contraseña no válida" });
	try {
		// create token
		const token = jwt.sign(
			{
				name: user.Nombre,
				id: user._id,
			},
			"secret"
		);

		res.json({
			error: null,
			data: "exito bienvenido",
			token: token,
			id: user._id,
			admi: user.Admi,
		});
	} catch (e) {
		return status(400).json({
			error: "Hubo un error en el login, por favor intenta de nuevo",
		});
	}
});

//Ver usuario
router.get("/Ver/:id", async (req, res) => {
	const id = req.params.id;
	const user = await Usuario.findById({ _id: id });

	try {
		// create token
		res.json({
			error: null,
			Id: user._id,
			Usuario: user.Usuario,
			Contrasena: user.Contrasena,
			Email: user.Email,
			Compras: user.Lista_Compras,
			Descripcion: user.Descripcion,
			Admin: user.Admi
		});
	} catch (e) {
		return status(400).json({
			error: "Hubo un error, por favor intenta de nuevo",
		});
	}
});

//Modificar usuario
router.put("/Modificar/:id", (req, res) => {
	const id = req.params.id;
	const user = req.body.usuario;
	const Contra = req.body.contra;
	const Ema = req.body.email;
	const ad = req.body.admi;
	const desc = req.body.desc;

	Usuario.findByIdAndUpdate(
		{ _id: id },
		{
			$set: {
				Usuario: user,
				Contrasena: Contra,
				Email: Ema,
				Admi: ad,
				Descripcion: desc
			},
		}
	)
		.then((doc) => {
			res.json({ response: "Usuario Modificado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Eliminar usuario
router.get("/Eliminar/:id", (req, res) => {
	const id = req.params.id;
	Usuario.findByIdAndDelete({ _id: id })
		.then((doc) => {
			res.json({ response: "Eliminado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

/*
//Añadir dirección
router.put("/InsertarDireccion/:id", (req, res) => {
	const id = req.params.id;
	const pais = req.body.pais;
	const estado = req.body.estado;
	const ciudad = req.body.ciudad;
	const colonia = req.body.colonia;
	const calle = req.body.calle;
	const numero_int = req.body.num;
	const codigo = req.body.cod;

	Usuario.findByIdAndUpdate(
		{ _id: id },
		{
			$push: {
				Direccion: {
					Pais: pais,
					Estado: estado,
					Ciudad: ciudad,
					Colonia: colonia,
					Calle: calle,
					Numero_int: numero_int,
					Codigo_postal: codigo,
				},
			},
		}
	)
		.then((doc) => {
			res.json({ response: "Dirección agregada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Modificar dirección
router.put("/ModificarDireccion/:id_us/:id_dir", (req, res) => {
	const id = req.params.id_us;
	const id_dir = mongoose.Types.ObjectId(req.params.id_dir);
	const pais = req.body.pais;
	const estado = req.body.estado;
	const ciudad = req.body.ciudad;
	const colonia = req.body.colonia;
	const calle = req.body.calle;
	const numero_int = req.body.num;
	const codigo = req.body.cod;

	Usuario.updateOne(
		{ _id: id, "Direccion._id": id_dir },
		{
			$set: {
				"Direccion.$": {
					Pais: pais,
					Estado: estado,
					Ciudad: ciudad,
					Colonia: colonia,
					Calle: calle,
					Numero_int: numero_int,
					Codigo_postal: codigo,
				},
			},
		}
	)
		.then((doc) => {
			res.json({ response: "Direccion modificada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err);
		});
});

//Eliminar dirección
router.get("/EliminarDireccion/:id_us/:id_dir", (req, res) => {
	const id = req.params.id_us;
	const id_dir = req.params.id_dir;
	Usuario.updateOne({ _id: id }, { $pull: { Direccion: { _id: id_dir } } })
		.then((doc) => {
			res.json({ response: "Dirección eliminada" });
		})
		.catch((err) => {
			console.log("error al eliminar", err.message);
		});
});

//Añadir producto a carrito
router.put("/InsertarCarrito/:id", async (req, res) => {
	const id = req.params.id;
	const acc = req.body.idAcc;
	const est = "Pendiente";
	const fecha = new Date();
	const libro = req.body.idLib;
	const cantidad = req.body.cant;
	const formato = req.body.format;
	const submonto = req.body.submonto;

	// console.log(isLibroExist);
	// const findLibro = isLibroExist
	// if (isLibroExist.carrito[0].Formato === formato) {
	// 	return res.status(400).json({ error: "Libro ya esta en la lista" });
	// }

	Usuario.findByIdAndUpdate(
		{ _id: id },
		{
			$push: {
				Lista_Compras: {
					Id_cuenta: acc,
					Id_usuario: id,
					Estado: est,
					Fecha: fecha
				},
			},
		}
	)
		.then(async (doc) => {
			const user = await Usuario.findById({ _id: id });
			req.io
				.to(`shop:${id}`)
				.emit(`update:shop:${id}`, { productos: user.Carrito });

			res.json({ response: "Producto agregado al carrito" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Modificar cantidad de libros del mismo titulo en carrito
router.put("/ModificarCarrito/:id_us/:id_car", (req, res) => {
	const id = req.params.id_us;
	const id_car = mongoose.Types.ObjectId(req.params.id_car);
	const estado = req.body.estado;
	const fecha = req.body.fecha;
	
	const cantidad = req.body.cant;
	const formato = req.body.format;
	const submonto = req.body.monto;
	const libro = req.body.idLib;

	Usuario.updateOne(
		{ _id: id, "Lista_Compras._id": id_car },
		{
			$set: {
				"Lista_Compras.$": {
					Estado: estado,
					Fecha: fecha
				},
			},
		}
	)
		.then(async (doc) => {
			const user = await Usuario.findById({ _id: id });
			req.io
				.to(`shop:${id}`)
				.emit(`update:shop:${id}`, { productos: user.Carrito });
			res.json({ response: "Carrito modificada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err);
		});
});

//Eliminar producto del carrito
router.get("/EliminarCarrito/:id_us/:id_car", (req, res) => {
	const id = req.params.id_us;
	const id_car = req.params.id_car;
	Usuario.updateOne({ _id: id }, { $pull: { Carrito: { _id: id_car } } })
		.then(async (doc) => {
			const user = await Usuario.findById({ _id: id });
			req.io
				.to(`shop:${id}`)
				.emit(`update:shop:${id}`, { productos: user.Carrito });
			res.json({ response: "Producto eliminado del carrito" });
		})
		.catch((err) => {
			console.log("error al eliminar", err.message);
		});
});


//Añadir producto a wish list
router.put("/InsertarDeseo/:id", async (req, res) => {
	const id = req.params.id;
	const libro = mongoose.Types.ObjectId(req.body.idLib);
	const isLibroExist = await Usuario.findOne({
		_id: id,
		"Deseos.Libro": libro,
	});

	if (isLibroExist) {
		return res.status(400).json({ error: "Libro ya esta en la lista" });
	}

	Usuario.findByIdAndUpdate(
		{ _id: id },
		{
			$push: {
				Deseos: {
					Libro: libro,
				},
			},
		}
	)
		.then(async (doc) => {
			const user = await Usuario.findById({ _id: id });
			req.io
				.to(`wish:${id}`)
				.emit(`update:wish:${id}`, { deseos: [...user.Deseos] });

			res.json({ error: null, response: "Producto agregado a la wish list" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Eliminar producto de la Wish list
router.get("/EliminarDeseo/:id_us/:id_des", (req, res) => {
	const id = req.params.id_us;
	const id_des = req.params.id_des;
	Usuario.updateOne({ _id: id }, { $pull: { Deseos: { _id: id_des } } })
		.then(async (doc) => {
			const user = await Usuario.findById({ _id: id });
			req.io
				.to(`wish:${id}`)
				.emit(`update:wish:${id}`, { deseos: [...user.Deseos] });
			res.json({ response: "Producto eliminado de la wish list" });
		})
		.catch((err) => {
			console.log("error al eliminar", err.message);
		});
});
*/
//Ver todos los usuarios
router.get("/MostrarTodos", (req, res) => {
	console.log(req.body);
	Usuario.find({}).then((doc) => {
		res.json({ users: doc, error: null });
	});
});

module.exports = router;
