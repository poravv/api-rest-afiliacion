const express = require('express');
const routes = express.Router();

routes.get('/get/', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send("2")

        conn.query('select * from departamento order by descripcion asc', (err, rows) => {
            if (err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/get/:estado', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send("2")

        conn.query('select * from departamento where estado = ? order by descripcion asc', [req.params.estado], (err, rows) => {
            if (err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.get('/getid/:id', (req, res) => {

    const verificacion = false;

    req.getConnection((err, conn) => {
        if (err) return res.send("2")

        conn.query('select * from departamento where iddepartamento = ? order by descripcion asc', [req.params.id], (err, rows) => {
            if (err) return res.send("2")

            res.json(rows);
        })
    })
})

routes.post('/add/', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('insert into departamento set ?', [req.body], (err, rows) => {
                    if (err) return res.send(err)

                    res.send('Registro Insert')
                })
            } else return res.send("2")
        })
    })
})

routes.delete('/del/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query(`update departamento set estado='IN' where iddepartamento = ?`, [req.params.id], (err, rows) => {
                    if (err) return res.send(err)

                    res.send('Registro Eliminado')
                })
            } else return res.send("2")
        })

    })
})

/* routes.delete('/del/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('delete from departamento where iddepartamento = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
    })
})
 */

routes.put('upd/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('update departamento set ? where iddepartamento = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send(err)

                    res.send('Registro Actualizado')
                })

            } else return res.send("2")
        })

    })
})
/*
//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {iddepartamento,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertdepartamento(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[iddepartamento,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})*/

module.exports = routes;