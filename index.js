const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    "https://donatev2s.com",
    "https://www.donatev2s.com"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/check", (req, res) => {
  try {
    const { answer } = req.body;

    if (!process.env.ANSWER) {
      return res.status(500).json({ error: "Missing ANSWER env" });
    }

    return res.json({
      correct: answer === process.env.ANSWER
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server crash" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});