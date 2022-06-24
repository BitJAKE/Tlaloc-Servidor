const usarCtrl= {};

const Actividad= require('../models/Actividad')
const Imagen= require('../models/Image')
const cloudinary = require('../utils/cloudinary')
const fs = require('fs-extra')

usarCtrl.crearActividad=async(req,res)=>{
    const proyecto = new Actividad(req.body);
    await proyecto
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //Obtener eventos en general
  usarCtrl.obtenerEventos=async(req,res)=>{
    const evento=await Actividad.find({tipo:'evento'});
    return res.status(200).json({ evento });
  };

//Obtener blog en general
usarCtrl.obtenerBlog=async(req,res)=>{
  const blog=await Actividad.find({tipo:'blog'});
  return res.status(200).json({ blog });
};

//eliminar actividad
usarCtrl.eliminarActividad = async (req, res) => {
  const { id } = req.params;
  if(id === undefined){
    const error = new Error("no existe");
    return res.status(400).json({ msg: error.message });

}
  // prevenir tareas duplicadas
  const actividad =  await Actividad.findById(id);
  if (!actividad) {
    const error = new Error("Actividad incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  try {
    console.log(actividad.imagenes)
    
  
    // eliminar antes las imagnes

    actividad.imagenes.forEach(element => 
      deleteImage(element)
      
      );
     
      await actividad.deleteOne();

    res.json({ msg: "Actividad eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const deleteImage = async function(idImagen) {
  const imagenEncontrada = await Imagen.findById(idImagen);
    if (!imagenEncontrada ) {
        const error = new Error("Imagen no existe");
        console.log("error imagen no encontrada")
        return
    }
    try {
        const actividad = await Actividad.findById(imagenEncontrada.actividad);
        await cloudinary.deleteImage(imagenEncontrada.public_id)
       // evento.imagenes.pull(imagenEncontrada._id);
       // await Promise.allSettled([await evento.save(), await imagenEncontrada.deleteOne()]);

    } catch (error) {
        console.log(error);
      
    }
}

//actualizar actividad
usarCtrl.actualizarActividad = async (req, res) => {
  const { id } = req.params;
  if(id === undefined){
    const error = new Error("no existe");
    return res.status(400).json({ msg: error.message });

}
  // prevenir tareas duplicadas
  const actividad =  await Actividad.findById(id);
  if (!actividad) {
    const error = new Error("Actividad incorrecta");
    return res.status(404).json({ msg: error.message });
  }
  actividad.nombre = req.body.nombre ||  actividad.nombre;
  actividad.telefono = req.body.telefono || actividad.telefono ;
  actividad.direccion = req.body.direccion ||actividad.direccion ;
  actividad.descripcion = req.body.descripcion || actividad.descripcion;
  actividad.usuario = req.body.usuario || actividad.usuario;

  try {
    const actividadActualizada = await actividad.save();
    res.json(actividadActualizada)
  } catch (error) {
    console.log(error);
  }
};

module.exports = usarCtrl;