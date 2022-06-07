const express = require('express');
const app = express()

const persona = require('./routes/persona')
const usuario = require('./routes/usuario')
const anhovigente = require('./routes/anhovigente')
const ciudad = require('./routes/ciudad')

const departamento = require('./routes/departamento')
const relafiliados = require('./routes/relafiliados')
const voto = require('./routes/voto')
const tipovoto = require('./routes/tipovoto')
const tipocandidatura = require('./routes/tipocandidatura')
const padron = require('./routes/padron')
const estadistica = require('./routes/estadistica')

const mysql = require('mysql')
const myconn = require('express-myconnection')
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const port = process.env.PORT||9000;



console.log(process.env.DB_PORT)

const dbOptions = {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    insecureAuth : true
}

//Middleware---------------------------
app.use(express.json())
app.use(myconn(mysql,dbOptions,'single'))
app.use('/afiliacion/api/persona',persona);
app.use('/afiliacion/api/usuario',usuario);
app.use('/afiliacion/api/vigencia',anhovigente);
app.use('/afiliacion/api/ciudad',ciudad);
app.use('/afiliacion/api/departamento',departamento);
app.use('/afiliacion/api/relafiliados',relafiliados);
app.use('/afiliacion/api/voto',voto);
app.use('/afiliacion/api/tipocandidatura',tipocandidatura);
app.use('/afiliacion/api/tipovoto',tipovoto);
app.use('/afiliacion/api/padron',padron);
app.use('/afiliacion/api/estadistica',estadistica);

//Rutas --------------------------------
app.get('/',(req,res)=>{
    res.send('Bienvenido a mi APP')
})

//Server Running ----------------------
app.listen(port,()=>{
    console.log("server corriendo en puerto: ",app.get('port'));
});
