const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  about: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    required: true
  },
  visibility: {
    type: String,
    required: true
  },
  due: {
    type: String,
    required: true
  },
  flag: {
    type: Number,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})


boardSchema.plugin(uniqueValidator)
module.exports = mongoose.model("boards", boardSchema)
