const express = require('express');
const routes = express.Router();

routes.get('/get/',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('select * from voto',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows);
        })
    })
})

routes.get('/get/:idusuario-:idtipo_voto',(req,res)=>{
    //res.send('test de api')
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")

        conn.query('select * from voto where idusuario = ? and idtipo_voto = ?',[req.params.idusuario,req.params.idtipo_voto],(err,rows)=>{
            if(err) return res.send("2")

            res.json(rows);
        })
    })
})

//MODELO PARA PROCEDIMIENTO
routes.post('/',(req,res)=>{
    const {idpersona,asistencia,idtipo_cand,idtipo_voto,voto,estado}=req.body;
    const query = `CALL gestionVoto(?,?,?,?,?,?,@a);`;
    req.getConnection((err,conn)=>{
        if(err) return res.send("2")
        
        conn.query(`select 1 from anho_vigente b where b.anho=YEAR(NOW()) and b.estado='AC'`,(err,rows)=>{
            if(err) return res.send("2")

            if (rows.length>0){
                conn.query(query,[idpersona,asistencia,idtipo_cand,idtipo_voto,voto,estado],(err,rows)=>{
                    if(err) return res.send("2")
        
                  res.send('1')
                })
				
            }else return res.send("2")
        })
        
    })
})

module.exports = routes;