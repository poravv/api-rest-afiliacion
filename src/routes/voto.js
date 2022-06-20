const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");

routes.get('/get/',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from voto',(err,rows)=>{
            if(err) return res.send(err)

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
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

routes.get('/get/:estado',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from voto where estado = ?',[req.params.estado],(err,rows)=>{
            if(err) return res.send(err)

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
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

routes.get('/get/:idusuario-:idtipo_voto',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from voto where idusuario = ? and idtipo_voto = ?',[req.params.idusuario,req.params.idtipo_voto],(err,rows)=>{
            if(err) return res.send("2")

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
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

//MODELO PARA PROCEDIMIENTO
routes.post('/upd/',verificaToken,(req,res)=>{
    const {idpersona,asistencia,idtipo_cand,idtipo_voto,voto,estado}=req.body;

    const query = `CALL gestionVoto('${voto}','','${asistencia}',${idtipo_voto},${idpersona},${idtipo_cand},'${estado}',@a);`;
    
    console.log(query)

    req.getConnection((err,conn)=>{
        if(err) return res.send("2")
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            conn.query(query,(err,rows)=>{
                if(err) return res.send("2")
    
                jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                    if(err) return res.send("2")
    
                    res.json({
                        mensaje:"set creado",
                        authData:authData,
                        body:"1"
                    })
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