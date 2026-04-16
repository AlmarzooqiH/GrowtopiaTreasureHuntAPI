const express = require("express");
const cors = require("cors");

const app = express();

/**
 * ✅ SIMPLE CORS (this is what you actually want on Railway)
 * - handles OPTIONS automatically
 * - avoids preflight issues
 */
app.use(cors({
  origin: [
    "https://donatev2s.com",
    "https://www.donatev2s.com"
  ]
}));

// JSON body parser
app.use(express.json());

// 🔍 Debug logger (VERY important for troubleshooting)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

console.log("Setup completed");

/**
 * Health check route
 */
app.get("/test", (req, res) => {
  res.json({ ok: true });
});
/**
 * Main endpoint
 */
app.post("/check", (req, res) => {
  try {
    console.log("In /check endpoint");

    const { answer } = req.body;
    console.log("Answer received:", answer);

    if (!process.env.ANSWER) {
      return res.status(500).json({
        error: "Missing ANSWER env variable"
      });
    }

    return res.json({
      correct: answer === process.env.ANSWER
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

/**
 * Railway-safe port handling
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port:", PORT);
});