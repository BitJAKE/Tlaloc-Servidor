const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
  public_id: {
    type: String
  },
  secure_url: {
    type: String
  },
  evento: {
    type: Schema.Types.ObjectId,
    ref: "Evento",
   }
},
  {
    timestamps: true,
  }
);

module.exports = model("Image", imageSchema);

