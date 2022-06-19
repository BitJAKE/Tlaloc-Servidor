const {Router} = require('express')

const router = Router();

const {crearEvento,obtenerEventos,eliminarEvento,actualizarEvento} = require('../controllers/eventoControllers')

router.route('/')
.get(obtenerEventos)
.post(crearEvento)

router.route('/:id')
.delete(eliminarEvento)
.put(actualizarEvento)

module.exports =router;