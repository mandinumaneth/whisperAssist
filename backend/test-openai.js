require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
  maxRetries: 2,
});

async function testConnection() {
  console.log("Testing OpenAI connection...");
  console.log("API Key:", process.env.OPENAI_API_KEY?.substring(0, 15) + "...");

  try {
    // Simple test with chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 10,
    });

    console.log("✅ Connection successful!");
    console.log("Response:", response.choices[0].message.content);
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.error("Error code:", error.code);
    console.error("Error type:", error.type);

    if (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") {
      console.log("\n🔍 Network Issue Detected:");
      console.log("- Check if you need a VPN");
      console.log("- Disable antivirus/firewall temporarily");
      console.log("- Check if OpenAI is accessible in your region");
    } else if (error.status === 401) {
      console.log("\n🔑 API Key Issue:");
      console.log("- Your API key is invalid or expired");
      console.log(
        "- Generate a new one at: https://platform.openai.com/api-keys"
      );
    } else if (error.status === 429) {
      console.log("\n💳 Billing Issue:");
      console.log("- You may have exceeded your quota");
      console.log(
        "- Check billing at: https://platform.openai.com/account/billing"
      );
    }

    process.exit(1);
  }
}

testConnection();
