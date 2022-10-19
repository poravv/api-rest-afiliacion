const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

routes.get('/get/',verificaToken, (req, res) => {
    
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
            
        conn.query('select * from anho_vigente',(err,rows)=>{
            if(err) return res.send('2')

            jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})

routes.get('/get/:estado',verificaToken, (req, res) => {

    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from anho_vigente where estado = ?',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

            jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})

routes.get('/getid/:id',verificaToken, (req, res) => {

    const verificacion = false;

    req.getConnection((err, conn) => {
        if (err) return res.send("2")

        conn.query('select * from anho_vigente where idanho_vigente = ? order by descripcion asc', [req.params.id], (err, rows) => {
            if (err) return res.send("2")

            
            jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Post creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})

routes.post('/add/',verificaToken, (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('insert into anho_vigente set ?', [req.body], (err, rows) => {
                    if (err) return res.send(err)

                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"Post creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
            } else return res.send("2")
        })
    })
})

routes.delete('/del/:id',verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query(`update anho_vigente set estado='IN' where idanho_vigente = ?`, [req.params.id], (err, rows) => {
                    if (err) return res.send(err)

                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
                        
                        res.json({
                            mensaje:"del",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
            } else return res.send("2")
        })

    })
})

/* routes.delete('/del/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('delete from anho_vigente where idanho_vigente = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
    })
})
 */

routes.put('/upd/:id',verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")
            
            if (rows.length > 0) {
                conn.query('update anho_vigente set ? where idanho_vigente = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send(err)
                    
                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
                        
                        res.json({
                            mensaje:"Put creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
            } else return res.send("2")
        })

    })
})
/*
//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {idanho_vigente,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertanho_vigente(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idanho_vigente,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})*/

function verificaToken (req,res,next){
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader!=='undefined'){
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else return res.send("2")
}

module.exports = routes;