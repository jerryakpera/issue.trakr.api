const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    trim: true
  },
  definition: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})


wordSchema.plugin(uniqueValidator)
module.exports = mongoose.model("words", wordSchema)
