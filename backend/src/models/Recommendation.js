const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "default",
  },
  audioFileName: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  finalPrompt: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
    required: true,
  },
  processingTime: {
    type: Number, // in milliseconds
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
