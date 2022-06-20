const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");

routes.get('/get/',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron limit 100',(err,rows)=>{
            if(err) return res.send('2')

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
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where estado = ? order by afiliacion asc',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

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

routes.get('/getid/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where idpadron = ? order by afiliacion asc',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

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

routes.get('/getidpersona/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where idpersona = ? order by afiliacion asc',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

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


routes.post('/add/',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into padron set ?',[req.body],(err,rows)=>{
                    if(err) return res.send('1')
        
                    jwt.verify(req.token,'clavesecreta',(err,authData)=>{
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

routes.delete('/del/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update padron set estado = 'IN' where idpadron= ?`,[req.params.id],(err,rows)=>{
                    if(err) return res.send('2')

                  jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:"1"
                })
            })
                })
                /*conn.query('delete from padron where idpadron = ?',[req.params.id],(err,rows)=>{
                    if(err) return res.send('2')
                  res.send('1')
                })*/
            }else return res.send("2")
        })
    })
})

routes.put('/upd/:id',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('update padron set ? where idpadron = ?',[req.body,req.params.id],(err,rows)=>{
                    if(err) return res.send(err)
        
                    jwt.verify(req.token,'clavesecreta',(err,authData)=>{
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
    const {idpadron,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertpadron(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idpadron,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})
*/

function verificaToken (req,res,next){
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader!=='undefined'){
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else return res.send("2")
}

module.exports = routes;