const express = require('express');
const routes = express.Router();

routes.get('/getestadistica/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM vw_estadistica',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/getestadistica/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from vw_estadistica where idusuarioroot = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/export/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from vw_reporte where idusuarioroot = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

module.exports = routes;