const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    index: true
  },
  noteText: {
    type: String,
    required: true
  },
  isActivity: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Note', noteSchema);
