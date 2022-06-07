const express = require('express');
const routes = express.Router();

routes.get('/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from tipo_candidatura',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from tipo_candidatura where idtipo_candidatura = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.post('/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('insert into tipo_candidatura set ?',[req.body],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})

routes.delete('/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('delete from tipo_candidatura where idtipo_candidatura = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
    })
})

routes.put('/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('update tipo_candidatura set ? where idtipo_candidatura = ?',[req.body,req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Actualizado')
        })
    })
})

//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {idtipo_candidatura,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinserttipo_candidatura(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idtipo_candidatura,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})

module.exports = routes;