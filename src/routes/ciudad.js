const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");

routes.get('/get/',verificaToken,(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from ciudad order by descripcion asc',(err,rows)=>{
            if(err) return res.send('2')

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})

routes.get('/get/:estado',verificaToken, (req, res) => {
    req.getConnection((err,conn)=>{
        if(err) return res.send('2')

        conn.query('select * from ciudad where estado = ? order by descripcion asc',[req.params.estado],(err,rows)=>{
            if(err) return res.send('2')

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})

routes.get('/getid/:id',verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('select * from ciudad where idciudad = ?', [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                if(err) return res.send("2")

                res.json({
                    mensaje:"Get creado",
                    authData:authData,
                    body:rows
                })
            })
        })
    })
})


routes.post('/add/',verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('insert into ciudad set ?', [req.body], (err, rows) => {
                    if (err) return res.send('2')

                    jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"post creado",
                            authData:authData,
                            body:"1"
                        })
                    })
                })

            } else return res.send("2")
        })

    })
})

routes.delete('/del/:id',verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query(`update ciudad set estado='IN' where idciudad = ?`, [req.params.id], (err, rows) => {
                    if (err) return res.send('2')

                    jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"Get creado",
                            authData:authData,
                            body:"1"
                        })
                    })
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

routes.put('/upd/:id', verificaToken, (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send('2')

        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`, (err, rows) => {
            if (err) return res.send("2")

            if (rows.length > 0) {
                conn.query('update ciudad set ? where idciudad = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send('2')

                    jwt.verify(req.token,'clavesecreta',(err,authData)=>{
                        if(err) return res.send("2")
        
                        res.json({
                            mensaje:"put creado",
                            authData:authData,
                            body:"1"
                        })
                    })
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

//Authorization: Bearer <token>
function verificaToken (req,res,next){
    const bearerheader = req.headers['authorization'];

    if(typeof bearerheader!=='undefined'){
        const bearertoken = bearerheader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else return res.send("2")
}

module.exports = routes;