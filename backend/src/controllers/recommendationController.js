const fs = require("fs").promises;
const path = require("path");
const Instruction = require("../models/Instruction");
const Recommendation = require("../models/Recommendation");
const {
  transcribeAudio,
  getGPTRecommendation,
} = require("../services/openaiService");

/**
 * Main recommendation endpoint
 * Handles audio upload, transcription, and recommendation generation
 */
const createRecommendation = async (req, res) => {
  const startTime = Date.now();
  let audioFilePath = null;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file uploaded",
      });
    }

    audioFilePath = req.file.path;
    const userId = req.body.userId || "default";

    console.log("📁 Audio file received:", req.file.filename);

    // Step 1: Transcribe audio using Whisper
    const transcription = await transcribeAudio(audioFilePath);

    if (!transcription || transcription.trim() === "") {
      throw new Error("Transcription returned empty text");
    }

    console.log("📝 Transcription:", transcription);

    // Step 2: Retrieve instructions from MongoDB
    let instruction = await Instruction.findOne({
      userId: userId,
      isActive: true,
    });

    // If no instruction found, use default
    if (!instruction) {
      instruction = new Instruction({
        userId: userId,
        instructionText:
          "You are a helpful AI assistant. Provide clear, concise, and actionable recommendations based on the user's request.",
        category: "general",
      });
      await instruction.save();
    }

    console.log("📋 Using instruction:", instruction.instructionText);

    // Step 3: Combine transcription + instruction into final prompt
    const finalPrompt = `${instruction.instructionText}\n\nUser Request: ${transcription}`;

    // Step 4: Send to GPT for recommendation
    const recommendation = await getGPTRecommendation(finalPrompt);

    console.log("💡 Recommendation generated");

    // Step 5: Calculate processing time
    const processingTime = Date.now() - startTime;

    // Step 6: Save everything to MongoDB
    const savedRecommendation = await Recommendation.create({
      userId: userId,
      audioFileName: req.file.filename,
      transcription: transcription,
      instruction: instruction.instructionText,
      finalPrompt: finalPrompt,
      recommendation: recommendation,
      processingTime: processingTime,
    });

    // Step 7: Clean up - delete uploaded audio file
    await fs.unlink(audioFilePath);

    // Step 8: Return response
    res.status(200).json({
      success: true,
      data: {
        id: savedRecommendation._id,
        transcription: transcription,
        recommendation: recommendation,
        processingTime: processingTime,
        createdAt: savedRecommendation.createdAt,
      },
    });
  } catch (error) {
    console.error("❌ Error in createRecommendation:", error);

    // Clean up audio file if it exists
    if (audioFilePath) {
      try {
        await fs.unlink(audioFilePath);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to process recommendation",
      error: error.message,
    });
  }
};

/**
 * Get recommendation history
 */
const getRecommendationHistory = async (req, res) => {
  try {
    const userId = req.query.userId || "default";
    const limit = parseInt(req.query.limit) || 10;

    const recommendations = await Recommendation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("-finalPrompt -instruction");

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    console.error("❌ Error fetching history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendation history",
      error: error.message,
    });
  }
};

/**
 * Get single recommendation by ID
 */
const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error("❌ Error fetching recommendation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendation",
      error: error.message,
    });
  }
};

/**
 * Delete a recommendation by ID
 */
const deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(
      req.params.id
    );
    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting recommendation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete recommendation",
      error: error.message,
    });
  }
};

module.exports = {
  createRecommendation,
  getRecommendationHistory,
  getRecommendationById,
  deleteRecommendation,
};
