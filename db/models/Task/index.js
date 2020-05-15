const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  flag: {
    type: Number,
    required: true,
    trim: true
  },
  pomodoro: {
    type: Boolean
  }
}, {
  versionKey: false,
  timestamps: true
})


taskSchema.plugin(uniqueValidator)
module.exports = mongoose.model("tasks", taskSchema)
