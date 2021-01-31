const mongoose = require("mongoose");

var { Schema, Number } = mongoose;

const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: false,
  },
  // date_updated: {
  //   type: Date,
  //   default: Date.now,
  // },
  // date_created: {
  //   type: Date,
  //   default: Date.now,
  // },
}, {
  timestamps: true
});

const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;