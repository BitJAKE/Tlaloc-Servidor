const usarCtrl= {};

const Evento= require('../models/Evento')
const Imagen= require('../models/Image')
const cloudinary = require('../utils/cloudinary')
const fs = require('fs-extra')

usarCtrl.crearEvento=async(req,res)=>{
    const proyecto = new Evento(req.body);
    await proyecto
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

  //Obtener productos en general
  usarCtrl.obtenerEventos=async(req,res)=>{
    const evento=await Evento.find();
    return res.status(200).json({ evento });
  };

//Obtener productos en general
usarCtrl.obtenerEventos=async(req,res)=>{
  const evento=await Evento.find();
  return res.status(200).json({ evento });
};

//eliminar evento
usarCtrl.eliminarEvento = async (req, res) => {
  const { id } = req.params;
  // prevenir tareas duplicadas
  const evento =  await Evento.findById(id);
  if (!evento) {
    const error = new Error("Evento incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  try {
    console.log(evento.imagenes)
    
  
    // eliminar antes las imagnes

    evento.imagenes.forEach(element => 
      deleteImage(element)
      
      );
     
      await evento.deleteOne();
    
   // await evento.deleteOne()


    res.json({ msg: "Evento eliminado" });
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
        const evento = await Evento.findById(imagenEncontrada.evento);
        await cloudinary.deleteImage(imagenEncontrada.public_id)
       // evento.imagenes.pull(imagenEncontrada._id);
       // await Promise.allSettled([await evento.save(), await imagenEncontrada.deleteOne()]);

    } catch (error) {
        console.log(error);
      
    }
}

//actualizar evento
usarCtrl.actualizarEvento = async (req, res) => {
  const { id } = req.params;
  // prevenir tareas duplicadas
  const evento =  await Evento.findById(id);
  if (!evento) {
    const error = new Error("Evento incorrecto");
    return res.status(404).json({ msg: error.message });
  }
  evento.nombre = req.body.nombre ||  evento.nombre;
  evento.telefono = req.body.telefono || evento.telefono ;
  evento.direccion = req.body.direccion ||evento.direccion ;
  evento.descripcion = req.body.descripcion || evento.descripcion;

  try {
    const eventoActualizado = await evento.save();
    res.json(eventoActualizado)
  } catch (error) {
    console.log(error);
  }
};

module.exports = usarCtrl;