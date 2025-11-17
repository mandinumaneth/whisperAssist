const express = require("express");
const router = express.Router();
const {
  getInstructions,
  getActiveInstruction,
  createInstruction,
  updateInstruction,
  deleteInstruction,
} = require("../controllers/instructionController");

// GET /api/instructions - Get all instructions
router.get("/", getInstructions);

// GET /api/instructions/active - Get active instruction
router.get("/active", getActiveInstruction);

// POST /api/instructions - Create new instruction
router.post("/", createInstruction);

// PUT /api/instructions/:id - Update instruction
router.put("/:id", updateInstruction);

// DELETE /api/instructions/:id - Delete instruction
router.delete("/:id", deleteInstruction);

module.exports = router;
