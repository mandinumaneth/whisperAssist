const Groq = require("groq-sdk");
const fs = require("fs");
const https = require("https");

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Transcribe audio using Groq Whisper
 * @param {string} audioFilePath - Path to the audio file
 * @returns {Promise<string>} - Transcribed text
 */
const transcribeAudio = async (audioFilePath) => {
  try {
    console.log("🎤 Transcribing audio with Groq Whisper...");

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: "whisper-large-v3",
      language: "en",
      response_format: "text",
    });

    console.log("✅ Transcription complete (Groq)");
    return transcription.text || transcription;
  } catch (error) {
    console.error("❌ Whisper transcription error:", error.message);
    console.error("❌ Full error:", error);
    throw new Error(`Transcription failed: ${error.message}`);
  }
};

/**
 * Get recommendation from Llama-3.3 (Groq)
 * @param {string} finalPrompt - Combined prompt with transcription and instructions
 * @returns {Promise<string>} - Recommendation
 */
const getGPTRecommendation = async (finalPrompt) => {
  try {
    console.log("🤖 Getting recommendation from Groq...");

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Groq's fast model
      messages: [
        {
          role: "system",
          content:
            "You are WhisperAssist, an intelligent AI recommendation system. Provide helpful, clear, and actionable recommendations.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const recommendation = completion.choices[0].message.content;
    console.log("✅ Recommendation received (Groq)");
    return recommendation;
  } catch (error) {
    console.error("❌ GPT error:", error.message);
    throw new Error(`GPT recommendation failed: ${error.message}`);
  }
};

module.exports = {
  transcribeAudio,
  getGPTRecommendation,
};
