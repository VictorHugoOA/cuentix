const express = require('express');
const mongoose = require('mongoose')
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const port =3000;
require('dotenv').config()
const io = require('socket.io')(3001);

io.sockets.on('connection', (socket) => {
	socket.on('create', (room) => {
		socket.join(room);
		socket.emit('joined', {});
	})
});

// Habilitar cors
app.use(cors());
// capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
app.use((req, res, next) => {
	req.io = io;
	next();
})

//conexion 

mongoose.connect('mongodb://localhost:27017/Libros', {useFindAndModify:false,useCreateIndex: true,useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))


const conexion = mongoose.connection;
conexion.once('open',()=>{
  console.log('conexion exitosa');
})


const UserRoutes = require('./Routes/UsuarioCrud.js');
const BookRoutes = require('./Routes/LibroCrud.js');
const EditRoutes = require('./Routes/ProveedorCrud.js');
const DeliRoutes = require('./Routes/PedidoCrud.js');

app.use('/Usuario',UserRoutes);
app.use('/Libro', BookRoutes);
app.use('/Editorial',EditRoutes);
app.use('/Pedido', DeliRoutes);
app.use('/logo', express.static('template'));

app.listen(port, function() {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
