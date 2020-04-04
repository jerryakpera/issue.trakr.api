const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  role: {
    type: Number,
    default: 2,
    required: true
  },
  flag: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
  
}, {
  versionKey: false,
  timestamps: true
})


userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema)
