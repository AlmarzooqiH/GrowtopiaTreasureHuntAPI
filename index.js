const express = require("express");
const cors = require("cors");

const app = express();

// log requests (optional but useful)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ FIXED LINE
app.options("/*", cors());

app.use(express.json());

console.log("Setup completed");

app.post("/check", (req, res) => {
  console.log("In check endpoint :P");

  try {
    const { answer } = req.body;

    console.log(answer);

    if (!process.env.ANSWER) {
      return res.status(500).json({ error: "Missing ANSWER" });
    }

    return res.json({
      correct: answer === process.env.ANSWER
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server crash" });
  }
});

app.get("/", (req, res) => {
  res.send("API alive");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});