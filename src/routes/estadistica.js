const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

routes.get('/getestadistica/',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM vw_estadistica',(err,rows)=>{
            if(err) return res.send(err)

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

routes.get('/getestadistica/:id',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from vw_estadistica where idusuarioroot = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

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

routes.get('/export/:id',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from vw_reporte where idusuarioroot = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

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

function verificaToken (req,res,next){
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader!=='undefined'){
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else return res.send("2")
}

module.exports = routes;