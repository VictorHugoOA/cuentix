const router = require("express").Router();
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
router.post("/Registro", async(req, res) => {
    try {
        // validate user
        const { error } = schemaRegister.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const isEmailExist = await Usuario.findOne({ Email: req.body.email });
        const isUserExist = await Usuario.findOne({ Usuario: req.body.usuario });
        if (isUserExist) {
            return res.status(400).json({ error: "Nombre de usuario ya registrado" });
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
router.post("/Insertar", async(req, res) => {
    try {
        console.log("hola");
        const isEmailExist = await Usuario.findOne({ Email: req.body.email });
        const isUserExist = await Usuario.findOne({ Usuario: req.body.usuario });

        if (isEmailExist) {
            return res.status(400).json({ error: "Email ya registrado" });
        }
        if (isUserExist) {
            return res.status(400).json({ error: "Nombre de usuario ya registrado" });
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
router.post("/login", async(req, res) => {
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
        const token = jwt.sign({
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
router.get("/Ver/:id", async(req, res) => {
    const id = req.params.id;
    const user = await Usuario.findById({ _id: id });

    try {
        // create token
        res.json({
            error: null,
            user:user
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

    Usuario.findByIdAndUpdate({ _id: id }, {
            $set: {
                Usuario: user,
                Contrasena: Contra,
                Email: Ema,
                Admi: ad,
                Descripcion: desc
            },
        })
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



//Ver todos los usuarios
router.get("/MostrarTodos", (req, res) => {
    console.log(req.body);
    Usuario.find({}).then((doc) => {
        res.json({ users: doc, error: null });
    });
});

module.exports = router;