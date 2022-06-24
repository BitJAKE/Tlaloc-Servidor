const {Router} = require('express')

const router = Router();

const {crearContenido,obtenerContenido} = require('../controllers/contenidoControllers')

router.route('/:id')
.get(obtenerContenido)
.post(crearContenido)


module.exports =router;