const express = require("express");
const cors = require("cors");

const app = express();

// ALLOW EVERYTHING (dev mode / quick fix)
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.post("/check", (req, res) => {
  const { answer } = req.body;

  if (!process.env.ANSWER) {
    return res.status(500).json({ error: "Missing ANSWER env" });
  }

  return res.json({
    correct: answer === process.env.ANSWER
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});