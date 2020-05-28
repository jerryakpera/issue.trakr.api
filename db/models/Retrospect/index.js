const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const retrospectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    trim: true
  },
  goodthings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goodthings"
  },
  badthings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "badthings"
  },
  journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "journals"
  },
  progress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "progresses"
  },
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quotes"
  },
  word: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "words"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, {
  versionKey: false,
  timestamps: true
})


retrospectSchema.plugin(uniqueValidator)
module.exports = mongoose.model("retrospects", retrospectSchema)
