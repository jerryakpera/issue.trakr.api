const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userJournalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  openjournals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'openjournals'
  }],
  reflectionjournals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reflectionjournals'
  }],
  weedingjournals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'weedingjournals'
  }],
}, {
  versionKey: false,
  timestamps: true
})


userJournalsSchema.plugin(uniqueValidator)
module.exports = mongoose.model("userjournals", userJournalsSchema)
