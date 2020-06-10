const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const reflectionJournalSchema = new mongoose.Schema({
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
  rating: {
    type: Number
  },
  goodthings: {
    type: String,
    required: true,
    trim: true
  },
  badthings: {
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


reflectionJournalSchema.plugin(uniqueValidator)
module.exports = mongoose.model("reflectionjournal", reflectionJournalSchema)
