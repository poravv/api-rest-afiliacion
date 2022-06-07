const express = require('express');
const routes = express.Router();


routes.get('/login/:usuario-:password',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario where usuario = ? and password= ?',[req.params.usuario,req.params.password],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/get/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario',(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/get/:estado',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario where estado = ?',[req.params.estado],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getid/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario where idusuario = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getpersona/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from usuario where idpersona = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuserasociados/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' `,(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuserasociados/:estado-:idusuarioroot',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' and a.idusuarioroot = ? and a.estado= ?`,[req.params.idusuarioroot,req.params.estado],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuserasociados/:estado-:anho-:idusuarioroot',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '3' and a.idusuarioroot = ? and a.estado= ? and exists (select  1 from anho_vigente b where b.anho = ?)`,[req.params.idusuarioroot,req.params.estado,req.params.anho],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuseradmin/:estado-:idusuarioroot',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' and a.idusuarioroot = ? and a.estado= ?`,[req.params.idusuarioroot,req.params.estado],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuseradmin/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' `,(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getuseradmin/:estado-:anho-:idusuarioroot',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query(`select * from vw_usuario_afiliado a where a.nivel = '2' and a.idusuarioroot = ? and a.estado= ? and exists (select  1 from anho_vigente b where b.anho = ?)`,[req.params.idusuarioroot,req.params.estado,req.params.anho],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.post('/add/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into usuario set ?',[req.body],(err,rows)=>{
                    if(err) return res.send("2")
        
                  res.send('1')
                })
				
            }else return res.send("2")
        })
        
    })
})

routes.delete('/del/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update usuario set estado=concat('I',now()) where idusuario = ?`,[req.params.id],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
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

routes.put('/upd/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('update usuario set ? where idusuario = ?',[req.body,req.params.id],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
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

module.exports = routes;