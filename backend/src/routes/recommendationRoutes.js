const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createRecommendation,
  getRecommendationHistory,
  getRecommendationById,
  deleteRecommendation,
} = require("../controllers/recommendationController");

// POST /api/recommendations - Create new recommendation from audio
router.post("/", upload.single("audio"), createRecommendation);

// GET /api/recommendations - Get recommendation history
router.get("/", getRecommendationHistory);

// GET /api/recommendations/:id - Get specific recommendation
router.get("/:id", getRecommendationById);

// DELETE /api/recommendations/:id - Delete recommendation
router.delete("/:id", deleteRecommendation);

module.exports = router;
