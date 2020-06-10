const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const weedingJournalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  objective: {
    type: String,
    required: true,
    trim: true
  },
  subjective: {
    type: String,
    required: true,
    trim: true
  },
  entry: {
    type: String,
    required: true,
    trim: true
  },
}, {
  versionKey: false,
  timestamps: true
})


weedingJournalSchema.plugin(uniqueValidator)
module.exports = mongoose.model("weedingjournal", weedingJournalSchema)
