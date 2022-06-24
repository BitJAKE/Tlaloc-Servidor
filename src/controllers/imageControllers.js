const usarCtrl= {};

const Imagen= require('../models/Image')
const Actividad= require('../models/Actividad')
const Contenido= require('../models/Contenido')
const cloudinary = require('../utils/cloudinary')
const fs = require('fs-extra')
require('mongoose')



usarCtrl.insertarImagen=async(req,res)=>{
    const { actividad_id } = req.body;
    const existeActividad = await Actividad.findById(actividad_id);
    if (!existeActividad) {
        const error = new Error("La actividad no existe");
        return res.status(404).json({ msg: error.message });
    }


    try {
        if(req.files?.image){
            const result= await
            cloudinary.uploadImage(req.files.image.tempFilePath)   
            console.log(result)
            const imagenAlmacenada = new Imagen({
                url: result.url,
                public_id: result.public_id,
                secure_url: result.secure_url ,
                actividad: actividad_id

            })
            await fs.unlink(req.files.image.tempFilePath);
            await imagenAlmacenada.save()
            
            // Almacenar el ID en el proyecto
            existeActividad.imagenes.push(imagenAlmacenada._id);
            await existeActividad.save();
           
            res.json(imagenAlmacenada);
        
        }
        
      } catch (error) {
        console.log(error);
      }
}

///
usarCtrl.insertarImagenContenido=async(req,res)=>{
    const { contenido_id } = req.body;
    console.log(contenido_id)
    const existeContenido = await Contenido.findById(contenido_id);
    console.log(existeContenido)
    if (!existeContenido) {
        const error = new Error("Contenido no existe");
        return res.status(404).json({ msg: error.message });
    }


    try {
        if(req.files?.image){
            const result= await
            cloudinary.uploadImage(req.files.image.tempFilePath)   
            console.log(result)
            const imagenAlmacenada = new Imagen({
                url: result.url,
                public_id: result.public_id,
                secure_url: result.secure_url ,
                contenido: contenido_id

            })
            await fs.unlink(req.files.image.tempFilePath);
            await imagenAlmacenada.save()
            
            // Almacenar el ID en el proyecto
            existeContenido.imagenes.push(imagenAlmacenada._id);
            await existeContenido.save();
           
            res.json(imagenAlmacenada);
        
        }
        
      } catch (error) {
        console.log(error);
      }
}

//



usarCtrl.obtenerImagen = async (req, res) => {
    const { id } = req.params;
    const imagenEncontrada = await Imagen.findById(id);
    if (!imagenEncontrada ) {
        const error = new Error("Imagen no existe");
        return res.status(400).json({ msg: error.message });
    }
    try {
      res.json(imagenEncontrada);
    } catch (error) {
        console.log(error);
      
    }
  };

usarCtrl.eliminarImagen = async (req, res) => {
    const { id } = req.params;
    if(id === undefined){
        const error = new Error("Imagen no existe");
        return res.status(400).json({ msg: error.message });
    
    }
    const imagenEncontrada = await Imagen.findById(id);
    if (!imagenEncontrada ) {
        const error = new Error("Imagen no existe");
        return res.status(400).json({ msg: error.message });
    }
    try {
        const actividad = await Actividad.findById(imagenEncontrada.actividad);
        await cloudinary.deleteImage(imagenEncontrada.public_id)
        actividad.imagenes.pull(imagenEncontrada._id);
        await Promise.allSettled([await actividad.save(), await imagenEncontrada.deleteOne()]);
        res.json({ msg: "Imagen eliminado correctamente" });
    } catch (error) {
        console.log(error);
      
    }
};

module.exports = usarCtrl;