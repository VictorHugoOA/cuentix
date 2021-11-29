const express = require('express');
const mongoose = require('mongoose')
const bodyParser= require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const port =3000;
require('dotenv').config()
const io = require('socket.io')(3001);

io.sockets.on('connection', (socket) => {
	socket.on('create', (room) => {
		socket.join(room);
		socket.emit('joined', {});
	});
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

mongoose.connect('mongodb://localhost:27017/CuentiX', {useFindAndModify:false,useCreateIndex: true,useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))


const conexion = mongoose.connection;
conexion.once('open',()=>{
  console.log('conexion exitosa');
})


const UserRoutes = require('./Routes/UsuarioCrud.js');
const AccountRoutes = require('./Routes/CuentaCrud.js');
const BuyRoutes = require('./Routes/CompraCrud.js');

app.use('/Usuario',UserRoutes);
app.use('/Cuenta', AccountRoutes);
app.use('/Compras', BuyRoutes);
app.use('/logo', express.static('template'));

function callbackRemoveAccounts(){
	http.post('http://localhost:3000/Cuenta/RemoverVendidas', (response) => {
		response.on('end', () => {
			console.log("Removidos sin problemas");
		})
	}).on('error', (error) => {
		console.log(error.message);
	})
}

app.listen(port, function() {
  console.log(`Servidor web escuchando en el puerto ${port}`);
  setInterval(callbackRemoveAccounts, 3600000);
});
