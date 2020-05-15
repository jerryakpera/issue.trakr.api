const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userBoardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boards'
  }]
}, {
  versionKey: false,
  timestamps: true
})


userBoardSchema.plugin(uniqueValidator)
module.exports = mongoose.model("userboards", userBoardSchema)
