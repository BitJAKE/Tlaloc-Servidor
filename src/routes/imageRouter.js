const {Router} = require('express')

const router = Router();


const {insertarImagen,obtenerImagen,eliminarImagen} = require('../controllers/imageControllers')

router.route('/')
.post(insertarImagen)

router.route("/:id")
.get(obtenerImagen)
.delete(eliminarImagen);



module.exports =router;