const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const roadmapSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
    trim: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boards',
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})


roadmapSchema.plugin(uniqueValidator)
module.exports = mongoose.model("roadmaps", roadmapSchema)
