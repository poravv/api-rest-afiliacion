const express = require('express');
const routes = express.Router();

routes.get('/get/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from persona limit 100',(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/get/:estado',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from persona where estado = ? limit 100',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getid/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from persona where idpersona = ? ',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.delete('/getdoc/:documento',(req,res)=>{
    
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query('select * from persona where documento = ?',[req.params.documento],(err,rows)=>{
            if(err) return res.send('2')

          res.send('1')
        })
        
    })
})

routes.post('/add/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into persona set ?',[req.body],(err,rows)=>{
                    if(err) return res.send(err)
        
                  res.send('1')
                })
            }else return res.send("2")
        })
        
    })
})

routes.delete('/del/:id',(req,res)=>{
    
    req.getConnection((err,conn)=>{
        if(err) return res.send('1')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update persona set estado='AC' where idpersona = ?`,[req.params.id],(err,rows)=>{
                    if(err) return res.send('1')
        
                  res.send('Registro Eliminado')
                })
				
            }else return res.send("2")
        })
       /*
        conn.query('delete from persona where idpersona = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send('1')

          res.send('Registro Eliminado')
        }) */
        
    })
})


routes.put('/upd/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('update persona set ? where idpersona = ?',[req.body,req.params.id],(err,rows)=>{
                    if(err) return res.send('2')
        
                  res.send('1')
                })
				
            }else return res.send("2")
        })
        
    })
})

//MODELO PARA PROCEDIMIENTO
/*routes.post('/',(req,res)=>{
    const {idpersona,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertPersona(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idpersona,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})*/

module.exports = routes;