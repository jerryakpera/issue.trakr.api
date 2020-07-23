const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const openJournalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  entry: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
})


openJournalSchema.plugin(uniqueValidator)
module.exports = mongoose.model("openjournals", openJournalSchema)
