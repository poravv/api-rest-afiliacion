const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

routes.get('/get/', verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query('select * from persona limit 100', (err, rows) => {
            if (err) return res.send('2')

            jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                if (err) return res.send("2")

                res.json({
                    mensaje: "Get creado",
                    authData: authData,
                    body: rows
                })
            })
        })
    })
})

routes.get('/get/:estado', verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query('select * from persona where estado = ? limit 100', [req.params.estado], (err, rows) => {
            if (err) return res.send('2')

            jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                if (err) return res.send("2")

                res.json({
                    mensaje: "Get creado",
                    authData: authData,
                    body: rows
                })
            })
        })
    })
})

routes.get('/getid/:id', verificaToken, (req, res) => {
    try {
        req.getConnection((err, conn) => {
            if (err) return res.send('2')

            conn.query('select * from persona where idpersona = ? ', [req.params.id], (err, rows) => {
                if (err) return res.send('2')

                jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                    if (err) return res.send("2")

                    res.json({
                        mensaje: "Get creado",
                        authData: authData,
                        body: rows
                    })
                })
            })
        })
    } catch (e) {
        return res.send('2')
    }
})

routes.get('/getdoc/:documento', verificaToken, (req, res) => {

    //console.log('Entra: ', req.params.documento)

    try {
        req.getConnection((err, conn) => {
            if (err) return res.send('2')

            console.log('Entra antes del query')
            conn.query('select * from persona where documento = ?', [req.params.documento], (err, rows) => {
                if (err) return res.send('2')

                jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                    if (err) return res.send("2")

                    res.json({
                        mensaje: "Get creado",
                        authData: authData,
                        body: rows
                    })
                })
            })
        })
    } catch (e) {
        //console.log(e)
        return res.send('2')
    }
})

routes.post('/add/', verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('insert into persona set ?', [req.body], (err, rows) => {
                    if (err) return res.send(err)

                    jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                        if (err) return res.send("2")

                        res.json({
                            mensaje: "Get creado",
                            authData: authData,
                            body: "1"
                        })
                    })
                })
            } else return res.send("2")
        })

    })
})

routes.delete('/del/:id', verificaToken, (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.send('1')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query(`update persona set estado='AC' where idpersona = ?`, [req.params.id], (err, rows) => {
                    if (err) return res.send('1')

                    jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                        if (err) return res.send("2")

                        res.json({
                            mensaje: "Get creado",
                            authData: authData,
                            body: "1"
                        })
                    })
                })

            } else return res.send("2")
        })
        /*
         conn.query('delete from persona where idpersona = ?',[req.params.id],(err,rows)=>{
             if(err) return res.send('1')
 
           res.send('Registro Eliminado')
         }) */

    })
})


routes.put('/upd/:id', verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('update persona set ? where idpersona = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send('2')

                    jwt.verify(req.token, process.env.CLAVE_TOKEN, (err, authData) => {
                        if (err) return res.send("2")

                        res.json({
                            mensaje: "Get creado",
                            authData: authData,
                            body: "1"
                        })
                    })
                })

            } else return res.send("2")
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

function verificaToken(req, res, next) {
    const bearerheader = req.headers['authorization'];

    if (typeof bearerheader !== 'undefined') {
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    } else return res.send("2")
}

module.exports = routes;