const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: new Date()
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
