const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Story",
  },

  fileName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audio', audioSchema);