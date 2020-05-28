const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})


quoteSchema.plugin(uniqueValidator)
module.exports = mongoose.model("quotes", quoteSchema)
