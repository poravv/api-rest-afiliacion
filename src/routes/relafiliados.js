const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});

routes.get('/get/',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados',(err,rows)=>{
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

routes.get('/get/:estado',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados where estado = ?',[req.params.estado],(err,rows)=>{
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

routes.get('/getidraf/:idvigencia',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados where idanho_vigente = ?',[req.params.idvigencia],(err,rows)=>{
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

routes.get('/getpersona/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from vw_afiliados where idpersona = ?',[req.params.id],(err,rows)=>{
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

routes.get('/getusuario/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query(`select * from vw_afiliados where estado = 'AC' and idusuario = ?`,[req.params.id],(err,rows)=>{
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

routes.post('/add/',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into rel_afiliados set ?',[req.body],(err,rows)=>{
                    if(err) return res.send(err)
        
                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"Get creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
				
            }else return res.send("2")
        })
        
    })
})

routes.delete('/del/:idpersona-:idanho_vigente',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update rel_afiliados set estado=concat('I',now()) where idpersona= ? and idanho_vigente = ? and estado = 'AC'`,[req.params.idpersona,req.params.idanho_vigente],(err,rows)=>{
                    if(err) return res.send(err)
        
                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"Get creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
				
            }else return res.send("2")
        })
        /**
         * conn.query('delete from rel_afiliados where idrel_afiliados = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('1')
        })
         */
    })
})

routes.put('/upd/:idpersona-:idanho_vigente',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                //verificar todos mandar todos los parametros necesaeios para la actualizacion 
                conn.query('update rel_afiliados set ? where idpersona = ? and idanho_vigente = ?',[req.body,req.params.idpersona,req.params.idanho_vigente],(err,rows)=>{
                    if(err) return res.send(err)
        
                    jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"Get creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })
            }else return res.send("2")
        })
    })
})

//MODELO PARA PROCEDIMIENTO
/*
routes.post('/',(req,res)=>{
    const {idrel_afiliados,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertrel_afiliados(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idrel_afiliados,nombre,apellido,sexo,telefono],(err,rows)=>{
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