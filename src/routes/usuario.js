
const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});
const routes = express.Router();


routes.post('/login', (req,res)=>{
    const {usuario,password}=req.body;
    
    try{
        req.getConnection((err,conn)=>{
            if(err) return res.send("2")
    
            conn.query('select * from usuario where usuario = ? and contrasenha = ?',[usuario,password],(err,rows)=>{
                if(err) return res.send("2")
    
                jwt.sign({rows},process.env.CLAVE_TOKEN
                //,{expiresIn : '24'}//Para personalizar el tiempo para expirar
                ,{expiresIn: '24h'} // expires in 24 hours
                ,(err,token)=>{
                    res.json({
                        token,
                        body:rows
                    });
                });
                //res.json(rows);
            })
        })
    }catch(e){
        return res.send("2")
    }
})

routes.get('/get/',verificaToken,(req,res)=>{

    try{
        req.getConnection((err,conn)=>{
            if(err) return res.send("2")
    
            conn.query('select * from usuario',(err,rows)=>{
                if(err) return res.send("2")
                
                jwt.verify(req.token,process.env.CLAVE_TOKEN,(err,authData)=>{
                    if(err) return res.send("2")
    
                    res.json({
                        mensaje:"Get creado",
                        authData:authData,
                        body:rows
                    })
                })
    
                //res.json(rows);
            })
        })
    }catch(e){
        return res.send("2")
    }
    
})

routes.get('/get/:estado',verificaToken,(req,res)=>{

    try{
        req.getConnection((err,conn)=>{
            if(err) return res.send("2")
    
            conn.query('select * from usuario where estado = ?',[req.params.estado],(err,rows)=>{
                if(err) return res.send("2")
    
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
    }catch(e){
        return res.send("2")
    }
    
})

routes.get('/getid/:id',verificaToken,(req,res)=>{
    try{
        req.getConnection((err,conn)=>{
            if(err) return res.send("2")
    
            conn.query('select * from usuario where idusuario = ?',[req.params.id],(err,rows)=>{
                if(err) return res.send("2")
    
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
    }catch(e){
        return res.send("2")
    }
    
})

routes.get('/getpersona/:id',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario where idpersona = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuserasociados/',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' `,(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuserasociados/:estado-:idusuarioroot',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' and a.idusuarioroot = ? and a.estado= ?`,[req.params.idusuarioroot,req.params.estado],(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuserasociados/:estado-:anho-:idusuarioroot',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' and a.idusuarioroot = ? and a.estado= ? and exists (select  1 from anho_vigente b where b.anho = ?)`,[req.params.idusuarioroot,req.params.estado,req.params.anho],(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuseradmin/:estado-:idusuarioroot',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' and a.idusuarioroot = ? and a.estado= ?`,[req.params.idusuarioroot,req.params.estado],(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuseradmin/',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' `,(err,rows)=>{
            if(err) return res.send("2")

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

routes.get('/getuseradmin/:estado-:anho-:idusuarioroot',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' and a.idusuarioroot = ? and a.estado= ? and exists (select  1 from anho_vigente b where b.anho = ?)`,[req.params.idusuarioroot,req.params.estado,req.params.anho],(err,rows)=>{
            if(err) return res.send("2")

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
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into usuario set ?',[req.body],(err,rows)=>{
                    if(err) return res.send("2")
        
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

routes.delete('/del/:id',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update usuario set usuario = concat(usuario,now()),  estado=concat('I',now()) where idusuario = ?`,[req.params.id],(err,rows)=>{
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
         * conn.query('delete from usuario where idusuario = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
         */
    })
})

routes.put('/upd/:id',verificaToken,(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('update usuario set ? where idusuario = ?',[req.body,req.params.id],(err,rows)=>{
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
/**
 * routes.post('/',(req,res)=>{
    const {idusuario,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertusuario(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idusuario,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})
 */

//Authorization: Bearer <token>
function verificaToken (req,res,next){
    const bearerheader = req.headers['authorization'];

    //console.log(req.headers);

    if(typeof bearerheader!=='undefined'){
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else return res.send("2")
}

module.exports = routes;