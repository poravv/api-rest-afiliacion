const express = require('express');
const routes = express.Router();

routes.get('/get/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('select * from ciudad order by descripcion asc', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/get/:estado', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('select * from ciudad where estado = ? order by descripcion asc', [req.params.estado], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/getid/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('select * from ciudad where idciudad = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.json(rows);
        })
    })
})


routes.post('/add/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('insert into ciudad set ?', [req.body], (err, rows) => {
                    if (err) return res.send('2')

                    res.send('1')
                })

            } else return res.send("2")
        })

    })
})

routes.delete('/del/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query(`update ciudad set estado='IN' where idciudad = ?`, [req.params.id], (err, rows) => {
                    if (err) return res.send('2')

                    res.send('1')
                })

            } else return res.send("2")
        })

    })
})

/*routes.delete('/deleteciudad/:id',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        
        //console.log(req.body);
        conn.query('delete from ciudad where idciudad = ?',[req.params.id],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Eliminado')
        })
    })
})*/

routes.put('upd/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('update ciudad set ? where idciudad = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send('2')

                    res.send('1')
                })

            } else return res.send("2")
        })

    })
})

//MODELO PARA PROCEDIMIENTO
/*routes.post('/',(req,res)=>{
    const {idciudad,nombre,apellido,sexo,telefono}=req.body;
    const query = `CALL pinsertciudad(?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        //console.log(req.body);
        conn.query(query,[idciudad,nombre,apellido,sexo,telefono],(err,rows)=>{
            if(err) return res.send(err)

          res.send('Registro Insert')
        })
    })
})*/

module.exports = routes;