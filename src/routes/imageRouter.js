const {Router} = require('express')

const router = Router();


const {insertarImagen,obtenerImagen,eliminarImagen,insertarImagenContenido} = require('../controllers/imageControllers')

router.route('/')
.post(insertarImagen)

router.route('/cont')
.post(insertarImagenContenido)

router.route("/:id")
.get(obtenerImagen)
.delete(eliminarImagen);



module.exports =router;