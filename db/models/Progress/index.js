const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const progressSchema = new mongoose.Schema({
  one: {
    type: String,
    trim: true
  },
  two: {
    type: String,
    trim: true
  },
  three: {
    type: String,
    trim: true
  },
}, {
  versionKey: false,
  timestamps: true
})

progressSchema.plugin(uniqueValidator)
module.exports = mongoose.model("progress", progressSchema)
