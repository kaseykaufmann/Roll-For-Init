const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character'
  }],
}, {
  timestamps: true
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
