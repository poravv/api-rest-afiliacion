const express = require('express');
const app = express()
const dotenv = require('dotenv');
const configrutas =  require('./config_rutas')
dotenv.config({ path: './.env'});
const cors = require('cors');
const port = process.env.PORT||4002;

    const mysql = require('mysql'),
    connection  = require('express-myconnection'),
    dbOptions = {
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE
    };


 
//Middelware---
app.use(cors());/*aplica permiso para todos los origenes*/
app.use(express.urlencoded({extended : false}))
app.use(express.json())
//Definir siempre antes de las configrutas
try {
    app.use(connection(mysql, dbOptions, 'single'));
} catch (error) {
    console.log('Error de conexion')
}

app.use(configrutas)


//Rutas --------------------------------
app.get('/',(req,res)=>{
    res.send('Api rest Afiliacion')
})

//Server Running ----------------------
app.listen(port,()=>{
    console.log("server corriendo en puerto: ",port);
});
