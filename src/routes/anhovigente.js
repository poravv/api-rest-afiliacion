const express = require('express');
const routes = express.Router();

routes.get('/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from anho_vigente',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from anho_vigente where idanho_vigente = ?',[req.params.id],(err,rows)=>{
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
        conn.query('insert into anho_vigente set ?',[req.body],(err,rows)=>{
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
        conn.query('delete from anho_vigente where idanho_vigente = ?',[req.params.id],(err,rows)=>{
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
        conn.query('update anho_vigente set ? where idanho_vigente = ?',[req.body,req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Actualizado')
        })
    })
})

//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {idanho_vigente,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertanho_vigente(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idanho_vigente,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})

module.exports = routes;