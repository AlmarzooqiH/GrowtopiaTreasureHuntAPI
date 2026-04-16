const express = require("express");
const cors = require("cors");

const app = express();

// CORS (simple = least problems)
app.use(cors());

// JSON parser
app.use(express.json());

// Logger (optional but useful)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Health check
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// Main endpoint
app.post("/check", (req, res) => {
  const { answer } = req.body;

  return res.json({
    correct: answer === process.env.ANSWER
  });
});

// Safe port
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});