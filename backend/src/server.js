require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// Import routes
const recommendationRoutes = require("./routes/recommendationRoutes");
const instructionRoutes = require("./routes/instructionRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/instructions", instructionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WhisperAssist API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     WhisperAssist Backend Server       ║
║                                        ║
║  🚀 Server running on port ${PORT}       ║
║  📡 Environment: ${process.env.NODE_ENV || "development"}            ║
║  🌐 API: http://localhost:${PORT}/api   ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
