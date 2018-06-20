const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EmpTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

// pre save method                                                                                                                                                                   
EmpTypeSchema.pre('save', function (next) {
  // do things
  next();
});

module.exports = mongoose.model('EmpType', EmpTypeSchema);


