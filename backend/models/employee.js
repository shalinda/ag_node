const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// TODO: Need to add all model validations
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  empType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmpType",
    default: null
  },
  created: {
    type: Date,
    default: new Date()
  }
});

// pre save method                                                                                                                                                                   
EmployeeSchema.pre('save', function (next) {
  // do things
  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);
