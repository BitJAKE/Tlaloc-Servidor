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

module.exports = model("Evento", eventoSchema);

