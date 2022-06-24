const { Schema, model } = require('mongoose')


const contenidoSchema = new Schema({
  //campos
  titulo: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String
  }, 
  actividad: {
    type: Schema.Types.ObjectId,
    ref: "Actividad",
   },
  imagenes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image"
    }
  ]
},
  {
    timestamps: true,
  }
);

module.exports = model("Contenido", contenidoSchema);

