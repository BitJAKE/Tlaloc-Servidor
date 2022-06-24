const { Schema, model } = require('mongoose')


const eventoSchema = new Schema({
  //campos
  nombre: {
    type: String,
    trim: true
  },
  telefono: {
    type: String
  },
  direccion: {
    type: String
  },
  descripcion: {
    type: String
  },
  
  usuario: {
    type: String
  },
  fecha_hora: {
    type: Date
  },
  estado: {
    type: String
  },
  lugar: {
    type: String
  },
  contenido: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contenido"
    }
  ],

  imagenes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image"
    }
  ],
  tipo: {
    type: String
  },
},
  {
    timestamps: true,
  }
);

module.exports = model("Evento", eventoSchema);

