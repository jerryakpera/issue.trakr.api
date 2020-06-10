const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  words: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'words'
  }],
  quotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quotes'
  }],
  journals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'journals'
  }],
  goodthings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'goodthings'
  }],
  badthings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'badthings'
  }],
  progress: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'progress'
  }],
}, {
  versionKey: false,
  timestamps: true
})


userContentSchema.plugin(uniqueValidator)
module.exports = mongoose.model("usercontent", userContentSchema)
