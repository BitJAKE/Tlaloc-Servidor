const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
  public_id: {
    type: String
  },
  secure_url: {
    type: String
  },
  actividad: {
    type: Schema.Types.ObjectId,
    ref: "Actividad",
   },
   contenido: {
    type: Schema.Types.ObjectId,
    ref: "Contenido",
   }
},
  {
    timestamps: true,
  }
);

module.exports = model("Image", imageSchema);

