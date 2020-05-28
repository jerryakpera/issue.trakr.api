const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const milestoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  group: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks'
  }]
}, {
  versionKey: false,
  timestamps: true
})

milestoneSchema.plugin(uniqueValidator)
module.exports = mongoose.model("milestones", milestoneSchema)