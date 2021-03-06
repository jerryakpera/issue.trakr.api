const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  completed: {
    type: Boolean,
    required: true
  },
  dueDate: {
    type: String
  },
  dueTime: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})


taskSchema.plugin(uniqueValidator)
module.exports = mongoose.model("tasks", taskSchema)
