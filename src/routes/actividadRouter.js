const {Router} = require('express')

const router = Router();

const {crearActividad,obtenerEventos,eliminarActividad,actualizarActividad,obtenerBlog} = require('../controllers/actividadControllers')

router.route('/')
.get(obtenerEventos)
.post(crearActividad)

router.route('/:id')
.delete(eliminarActividad)
.put(actualizarActividad)

router.route('/blog')
.get(obtenerBlog)

module.exports =router;