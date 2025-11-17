const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: "default",
  },
  instructionText: {
    type: String,
    required: true,
    default:
      "You are a helpful AI assistant. Provide clear, concise, and actionable recommendations based on the user's request.",
  },
  category: {
    type: String,
    default: "general",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

instructionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Instruction", instructionSchema);
