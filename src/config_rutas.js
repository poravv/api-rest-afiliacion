const express = require('express');
const rutas = express()

const persona = require('./routes/persona')
const usuario = require('./routes/usuario')
const anhovigente = require('./routes/anhovigente')
const ciudad = require('./routes/ciudad')
const departamento = require('./routes/departamento')
const relafiliados = require('./routes/relafiliados')
const voto = require('./routes/voto')
const tipovoto = require('./routes/tipovoto')
const tipocandidatura = require('./routes/tipocandidatura')
const padron = require('./routes/padron')
const estadistica = require('./routes/estadistica')

rutas.use('/afiliacion/api/persona',persona);
rutas.use('/afiliacion/api/usuario',usuario);
rutas.use('/afiliacion/api/vigencia',anhovigente);
rutas.use('/afiliacion/api/ciudad',ciudad);
rutas.use('/afiliacion/api/departamento',departamento);
rutas.use('/afiliacion/api/relafiliados',relafiliados);
rutas.use('/afiliacion/api/voto',voto);
rutas.use('/afiliacion/api/tipocandidatura',tipocandidatura);
rutas.use('/afiliacion/api/tipovoto',tipovoto);
rutas.use('/afiliacion/api/padron',padron);
rutas.use('/afiliacion/api/estadistica',estadistica);

module.exports = rutas;