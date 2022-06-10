const express = require('express');
const app = express()
const mysql = require('mysql')
const myconn = require('express-myconnection')
const dotenv = require('dotenv');
const configrutas =  require('./config_rutas')
dotenv.config({ path: './.env'});
const port = process.env.PORT||9000;



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
app.use(configrutas)


//Rutas --------------------------------
app.get('/',(req,res)=>{
    res.send('Bienvenido a mi APP')
})

//Server Running ----------------------
app.listen(port,()=>{
    console.log("server corriendo en puerto: ",port);
});
