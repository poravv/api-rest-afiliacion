const express = require('express');
const routes = express.Router();

routes.get('/get/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from tipo_voto',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/get/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from tipo_voto where idtipo_voto = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.post('/add/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('insert into tipo_voto set ?',[req.body],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})

routes.delete('/del/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('delete from tipo_voto where idtipo_voto = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
    })
})

routes.put('/upd/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('update tipo_voto set ? where idtipo_voto = ?',[req.body,req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Actualizado')
        })
    })
})

//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {idtipo_voto,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinserttipo_voto(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idtipo_voto,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})

module.exports = routes;