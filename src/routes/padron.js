const express = require('express');
const routes = express.Router();

routes.get('/get/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron order by afiliacion asc',(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/get/:estado',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where estado = ? order by afiliacion asc',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getid/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where idpadron = ? order by afiliacion asc',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})

routes.get('/getidpersona/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from padron where idpersona = ? order by afiliacion asc',[req.params.id],(err,rows)=>{
            if(err) return res.send('2')

            res.json(rows);
        })
    })
})


routes.post('/add/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('insert into padron set ?',[req.body],(err,rows)=>{
                    if(err) return res.send('1')
        
                  res.send('1')
                })
				
            }else return res.send("2")
        })
        
    })
})

routes.delete('/del/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(`update padron set estado = 'IN' where idpadron= ?`,[req.params.id],(err,rows)=>{
                    if(err) return res.send('2')
                  res.send('1')
                })
                /*conn.query('delete from padron where idpadron = ?',[req.params.id],(err,rows)=>{
                    if(err) return res.send('2')
                  res.send('1')
                })*/
            }else return res.send("2")
        })
    })
})

routes.put('/upd/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query('update padron set ? where idpadron = ?',[req.body,req.params.id],(err,rows)=>{
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

module.exports = routes;