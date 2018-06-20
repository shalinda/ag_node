const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// TODO: Need to add all model validations
const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  commentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: []
    }
  ]
});

// pre save method                                                                                                                                                                   
UserSchema.pre('save', function (next) {
  // do things
  next();
});

module.exports = mongoose.model('User', UserSchema);


