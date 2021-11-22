const router = require("express").Router();
const puppeteer = require("puppeteer");
const compra = require("../Models/Compra");
const usuario = require("../Models/Usuario");
const cuenta = require("../Models/Cuenta");
const ejs = require("ejs");
const path = require("path");

router.get("/TicketPDF/:id_ped.pdf", async (req, res) => {
	const p = await pedido.findById({ _id: req.params.id_ped });
	const nombre = await usuario.findById({ _id: p.Id_usuario });
	let lista_lib = [];
	for (let i = 0; i < p.Lista_lib.length; ++i) {
		const lib = await libro.findById({ _id: p.Lista_lib[i].Libro });
		lista_lib.push({
			Titulo: lib.Titulo,
			Precio: lib.Precio,
			Cantidad: p.Lista_lib[i].Cantidad,
			Formato: p.Lista_lib[i].Formato,
			Submonto: p.Lista_lib[i].Submonto
		});
	}

	const datosPDF = {
		nombre: `${nombre.Nombre} ${nombre.Apellido}`,
		Destino: `${p.Destino.Calle} #${p.Destino.Numero_int}, ${p.Destino.Colonia}, ${p.Destino.Ciudad},${p.Destino.Estado},${p.Destino.Pais}; CP. ${p.Destino.Codigo_postal}`,
		Fecha_pedido: new Date(p.Fecha_pedido).toLocaleDateString('es-MX'),
		Fecha_llegada: new Date(p.Fecha_llegada).toLocaleDateString('es-MX'),
		Sucursal: p.Sucursal,
		Codigo: p.Codigo,
		productos: [...lista_lib],
		Monto: p.Monto,
		Logo: path.join(process.cwd(), "template", "libro.png")
	};

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setRequestInterception(true);
	page.on("request", (interceptedRequest) => {
		const data = {
			method: "GET",
			postData: JSON.stringify({ pedido: Object.assign({}, datosPDF) }),
			headers: {
				...interceptedRequest.headers(),
				"Content-Type": "application/json",
			},
		};
		interceptedRequest.continue(data);
	});
	const response = await page.goto(
		"http://localhost:3000/Pedido/GenerarPaginaTicket",
		{
			waitUntil: "networkidle0",
		}
	);
	const pdf = await page.pdf({
		printBackground: true,
		format: "letter",
	});
	await browser.close();
	res.send(pdf);

});

router.get("/GenerarPaginaTicket", async (req, res) => {
	const filePath = path.join(process.cwd(), "template", "report-template.ejs");
	console.log(req.body.pedido);
	ejs.renderFile(filePath, { pedido: req.body.pedido }, (err, html) => {
		if (err) {
			console.log(err);
			return res.status(400).json({ error: err });
		} else {
			res.send(html);
		}
	});
});

//Añadir pedido
router.put("/Insertar/:id_us", async (req, res) => {
	const idus = req.params.id_us;
	try {
		const buy = new compra({
			Id_usuario: mongoose.Types.ObjectId(idus),
			Id_cuenta: mongoose.Types.ObjectId(req.body.cuenta),
			Fecha: req.body.fecha,
			Estado: req.body.estado,
		});
		const savedBuy = buy.save();
		console.log(savedBuy);

		const accAdd = req.body.cuenta;
		cuenta.updateOne({ _id: accAdd },
				{
					Estado: "En Compra"
				})
			.then((doc) => {
		})
		res.json({
			error: null,
			response: "Añadido",
			data: savedUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Ver pedido de unusuario
router.get("/VerPed/:id_us/id_ped", async (req, res) => {
	const idus = req.params.id_us;
	const idbuy = req.params.id_buy;

	compra.findOne({ _id: idbuy, Id_usuario: idus }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver todos los pedidos de un usuario
router.get("/Ver/:id_us", async (req, res) => {
	const idus = req.params.id_us;
	compra.find({ Id_usuario: idus }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver los pedidos por estado de un usuario
router.get("/VerEstado/:id_us/:est", async (req, res) => {
	const idus = req.params.id_us;
	const est = req.params.est;
	compra.find({ Id_usuario: idus, Estado: est }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Cancelar pedido
router.put("/Cancelar/:id_us/:id_ped", (req, res) => {
	const idus = req.params.id_us;
	const idped = req.params.id_ped;
	const est = "Cancelado";

	compra
		.findByIdAndUpdate(
			{ _id: idped, Id_usuario: idus },
			{
				$set: {
					Estado: est,
				},
			}
		)
		.then((doc) => {
			console.log(doc);
			res.json({ response: "compra Modificada" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Admi crud

//Ver un pedido
router.get("/VerCompra/:idped", async (req, res) => {
	const idped = req.params.id_ped;

	compra.findById({ _id: idped }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver  todos de los pedidos
router.get("/VerCompraTodos", async (req, res) => {
	compra.find({}).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Modificar pedido
router.put("/Modificar/:id_ped", (req, res) => {
	const idped = req.params.id_ped;
	const est = req.body.estado;
	const fecha = req.body.fecha;

	compra
		.findByIdAndUpdate(
			{ _id: idped },
			{
				$set: {
					Estado: est,
					Fecha: fecha, 
				},
			}
		)
		.then((doc) => {
			res.json({ response: "pedido Modificado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Eliminar pedido
router.get("/Eliminar/:id_ped", (req, res) => {
	const idped = req.params.id_ped;
	compra
		.findByIdAndDelete({ _id: idped })
		.then((doc) => {
			res.json({ response: "Eliminado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

module.exports = router;
