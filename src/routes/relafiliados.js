const express = require('express');
const routes = express.Router();

routes.get('/get/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados',(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/get/:estado',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados where estado = ?',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getid/:idpersona-:idvigencia',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from rel_afiliados where idpersona = ? and idanho_vigente = ?',[req.params.idpersona,req.params.idvigencia],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getpersona/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from vw_afiliados where idpersona = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getusuario/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query(`select * from vw_afiliados where estado = 'AC' and idusuario = ?`,[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.post('/add/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into rel_afiliados set ?',[req.body],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
                })
				
            }else return res.send("2")
        })
        
    })
})

routes.delete('/del/:idpersona-:idanho_vigente',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update rel_afiliados set estado=concat('I',now()) where idpersona= ? and idanho_vigente = ? `,[req.params.idpersona,req.params.idanho_vigente],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
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

routes.put('/upd/:idpersona-:idanho_vigente',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                //verificar todos mandar todos los parametros necesaeios para la actualizacion 
                conn.query('update rel_afiliados set ? where idpersona = ? and idanho_vigente',[req.body,req.params.idpersona,req.params.idanho_vigente],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
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

module.exports = routes;