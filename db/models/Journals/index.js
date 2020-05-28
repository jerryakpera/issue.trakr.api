const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const journalSchema = new mongoose.Schema({
  journal: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})


journalSchema.plugin(uniqueValidator)
module.exports = mongoose.model("journals", journalSchema)
