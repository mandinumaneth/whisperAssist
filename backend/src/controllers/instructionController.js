const Instruction = require("../models/Instruction");

/* Get all instructions for a user */
const getInstructions = async (req, res) => {
  try {
    const userId = req.query.userId || "default";

    const instructions = await Instruction.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: instructions.length,
      data: instructions,
    });
  } catch (error) {
    console.error("❌ Error fetching instructions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructions",
      error: error.message,
    });
  }
};

/**
 * Get active instruction for a user
 */
const getActiveInstruction = async (req, res) => {
  try {
    const userId = req.query.userId || "default";

    const instruction = await Instruction.findOne({
      userId,
      isActive: true,
    });

    if (!instruction) {
      return res.status(404).json({
        success: false,
        message: "No active instruction found",
      });
    }

    res.status(200).json({
      success: true,
      data: instruction,
    });
  } catch (error) {
    console.error("❌ Error fetching active instruction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch active instruction",
      error: error.message,
    });
  }
};

/**
 * Create a new instruction
 */
const createInstruction = async (req, res) => {
  try {
    const { userId, instructionText, category, isActive } = req.body;

    if (!instructionText) {
      return res.status(400).json({
        success: false,
        message: "Instruction text is required",
      });
    }

    // If this instruction should be active, deactivate others
    if (isActive) {
      await Instruction.updateMany(
        { userId: userId || "default" },
        { isActive: false }
      );
    }

    const instruction = await Instruction.create({
      userId: userId || "default",
      instructionText,
      category: category || "general",
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      data: instruction,
    });
  } catch (error) {
    console.error("❌ Error creating instruction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create instruction",
      error: error.message,
    });
  }
};

/**
 * Update an instruction
 */
const updateInstruction = async (req, res) => {
  try {
    const { instructionText, category, isActive } = req.body;
    const instructionId = req.params.id;

    const instruction = await Instruction.findById(instructionId);

    if (!instruction) {
      return res.status(404).json({
        success: false,
        message: "Instruction not found",
      });
    }

    // If setting this as active, deactivate others
    if (isActive) {
      await Instruction.updateMany(
        {
          userId: instruction.userId,
          _id: { $ne: instructionId },
        },
        { isActive: false }
      );
    }

    // Update fields
    if (instructionText) instruction.instructionText = instructionText;
    if (category) instruction.category = category;
    if (isActive !== undefined) instruction.isActive = isActive;

    await instruction.save();

    res.status(200).json({
      success: true,
      data: instruction,
    });
  } catch (error) {
    console.error("❌ Error updating instruction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update instruction",
      error: error.message,
    });
  }
};

/**
 * Delete an instruction
 */
const deleteInstruction = async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndDelete(req.params.id);

    if (!instruction) {
      return res.status(404).json({
        success: false,
        message: "Instruction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instruction deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting instruction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete instruction",
      error: error.message,
    });
  }
};

module.exports = {
  getInstructions,
  getActiveInstruction,
  createInstruction,
  updateInstruction,
  deleteInstruction,
};
