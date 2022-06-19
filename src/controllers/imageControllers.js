const usarCtrl= {};

const Imagen= require('../models/Image')
const Evento= require('../models/Evento')
const cloudinary = require('../utils/cloudinary')
const fs = require('fs-extra')


usarCtrl.insertarImagen=async(req,res)=>{
    const { evento_id } = req.body;
    const existeEvento = await Evento.findById(evento_id);
    if (!existeEvento) {
        const error = new Error("El evento no existe");
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
                evento: evento_id

            })
            await fs.unlink(req.files.image.tempFilePath);
            await imagenAlmacenada.save()
            
            // Almacenar el ID en el proyecto
            existeEvento.imagenes.push(imagenAlmacenada._id);
            await existeEvento.save();
           
            res.json(imagenAlmacenada);
        
        }
        
      } catch (error) {
        console.log(error);
      }
}

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
    const imagenEncontrada = await Imagen.findById(id);
    if (!imagenEncontrada ) {
        const error = new Error("Imagen no existe");
        return res.status(400).json({ msg: error.message });
    }
    try {
        const evento = await Evento.findById(imagenEncontrada.evento);
        await cloudinary.deleteImage(imagenEncontrada.public_id)
        evento.imagenes.pull(imagenEncontrada._id);
        await Promise.allSettled([await evento.save(), await imagenEncontrada.deleteOne()]);
        res.json({ msg: "Imagen eliminado correctamente" });
    } catch (error) {
        console.log(error);
      
    }
};

module.exports = usarCtrl;