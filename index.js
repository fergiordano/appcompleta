const express = require ('express');
const app = express ();
const mysql = require ('mysql2');
//motor de plantilla
const hbs = require ('hbs');
//encontrar archivos 
const path = require ('path');
//para enviar mails
const nodemailer = require ('nodemailer');
//variables de entorno 
require ('dotenv').config();


//configuramos el puerto 
const PORT = process.env.PORT || 9000;

//middelware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//configuramos el motor de plantillas de hbs
app.set('view engine', 'hbs');
//configuramos la ubicacion de las plantillas
app.set('view', path.join(__dirname, 'views/vistas'));
//configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//conexion a la base de datos 
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
})

conexion.connect((err)=>{
    if(err) throw err;
    console.log(`conectado a la database ${process.env.DATABASE}`);
})

//rutas de la aplicacion
app.get('/', (req, res)=>{
    res.send('bienvenido a la app completa')
})

//servidor a la escucha de peticiones
app.listen(PORT, ()=>{
    console.log(`servidor trabajando en el puerto: ${PORT}`);
})
