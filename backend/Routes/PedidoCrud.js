const router = require("express").Router();
const puppeteer = require("puppeteer");
const pedido = require("../Models/Pedido");
const usuario = require("../Models/Usuario");
const libro = require("../Models/Libro");
const ejs = require("ejs");
const path = require("path");

router.get("/TicketPDF/:id_ped.pdf", async (req, res) => {
	const p = await pedido.findById({_id: req.params.id_ped});
	const nombre = await usuario.findById({_id: p.Id_usuario});
	let lista_lib = [];
	for(let i = 0; i < p.Lista_lib.length; ++i){
		const lib = await libro.findById({_id: p.Lista_lib[i].Libro});
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
		const ped = new pedido({
			Id_usuario: idus,
			Fecha_pedido: req.body.fechap,
			Fecha_llegada: req.body.fechal,
			No_rastreo: req.body.rastreo,
			Estado: req.body.estado,
			Sucursal: req.body.suc,
			Codigo: req.body.cod,
			Lista_lib: req.body.carrito,
			Destino: req.body.destino,
			Monto: req.body.monto,
			Detalle_entrega: req.body.det,

		});



		const savedPed = ped.save();
		console.log(savedPed);

		const carr = [...req.body.carrito];
		carr.forEach((value) => {
			libro.updateOne({ _id: value.Libro },
				{
					$inc:
					{
						Vendidos: value.Cantidad,
						Cantidad_dis: -(value.Cantidad)
					}
				})
				.then((doc) => {

				})
		})

		// para borrar el carrito

		usuario.updateOne({ _id: idus }, {
			$pull: { Carrito: {} }
		}).then(async (doc) => {
			const user = await usuario.findById({ _id: idus });
			const libros = await libro.find({}).sort({ Vendidos: -1 })
				.then(doc => {
					doc.splice(10);
					req.io.to('admin').emit(`admin:update:most`, { vendidos: [...doc] })
				})
			req.io.to(`shop:${idus}`).emit(`update:shop:${idus}`, { productos: [...user.Carrito] })
		});


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
	const idped = req.params.id_ped;

	pedido.findOne({ _id: idped, Id_usuario: idus }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver todos los pedidos de un usuario
router.get("/Ver/:id_us", async (req, res) => {
	const idus = req.params.id_us;
	pedido.find({ Id_usuario: idus }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver los pedidos por estado de un usuario
router.get("/VerEstado/:id_us/:est", async (req, res) => {
	const idus = req.params.id_us;
	const est = req.params.est;
	pedido.find({ Id_usuario: idus, Estado: est }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Cancelar pedido
router.put("/Cancelar/:id_us/:id_ped", (req, res) => {
	const idus = req.params.id_us;
	const idped = req.params.id_ped;
	const est = "Cancelado";
	const num = 0;
	//pendiente hacerla null
	const fechal = req.body.fechal;

	pedido
		.findByIdAndUpdate(
			{ _id: idped, Id_usuario: idus },
			{
				$set: {
					Estado: est,
					No_rastreo: num,
					// Fecha_llegada: fechal,
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

//Devolver pedido
router.put("/Devolver/:id_us/:id_ped", (req, res) => {
	console.log('hola')
	const idus = req.params.id_us;
	const idped = req.params.id_ped;
	const est = "Devuelto";
	const num = 0;
	//pendiente hacerla null
	const fechal = req.body.fechal;

	pedido
		.findOneAndUpdate(
			{ _id: idped, Id_usuario: idus },
			{
				$set: {
					Estado: est,
					No_rastreo: num,
					//Fecha_llegada: fechal,
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

//Admi crud

//Ver un pedido
router.get("/VerPedido/:idped", async (req, res) => {
	const idped = req.params.id_ped;

	pedido.findById({ _id: idped }).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Ver  todos de los pedidos
router.get("/VerPedidoTodos", async (req, res) => {
	pedido.find({}).then((doc) => {
		res.json({ ped: doc, error: null });
	});
});

//Modificar pedido
router.put("/Modificar/:id_ped", (req, res) => {
	const idped = req.params.id_ped;
	const est = req.body.estado;
	const num = req.body.rastreo;
	const fechal = req.body.fechal;
	const des = req.body.des;

	pedido
		.findByIdAndUpdate(
			{ _id: idped },
			{
				$set: {
					Estado: est,
					No_rastreo: num,
					Fecha_llegada: fechal,
					Destino: des
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
	pedido
		.findByIdAndDelete({ _id: idped })
		.then((doc) => {
			res.json({ response: "Eliminado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

module.exports = router;
