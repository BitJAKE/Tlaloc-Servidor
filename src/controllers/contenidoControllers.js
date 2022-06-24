const usarCtrl= {};

const Actividad= require('../models/Actividad')
const Contenido= require('../models/Contenido')

usarCtrl.crearContenido=async(req,res)=>{


            const { id } = req.params;
            if(id === undefined){
              const error = new Error("no existe");
              return res.status(400).json({ msg: error.message });
          
          }
            const existeActividad = await Actividad.findById(id);
            if (!existeActividad) {
                const error = new Error("La actividad no existe");
                return res.status(404).json({ msg: error.message });
            }
        
        
            try {
              const nuevoContenido = new Contenido(req.body);
        
              await nuevoContenido.save()
              // Almacenar el ID en el proyecto
              existeActividad.contenido.push(nuevoContenido._id);
              await existeActividad.save();
                
            res.json(nuevoContenido);
              } catch (error) {
                console.log(error);
              }
  };

  //Obtener contenido
  usarCtrl.obtenerContenido=async(req,res)=>{
    const { id } = req.params;
    if(id === undefined){
      const error = new Error("no existe");
      return res.status(400).json({ msg: error.message });
  
  }

    const contenidoEncontrado = await Contenido.findById(id);
    if (!contenidoEncontrado ) {
        const error = new Error("contenido no encontrado");
        return res.status(400).json({ msg: error.message });
    }
    try {
      res.json(contenidoEncontrado);
    } catch (error) {
        console.log(error);
      
    }
  };

module.exports = usarCtrl;