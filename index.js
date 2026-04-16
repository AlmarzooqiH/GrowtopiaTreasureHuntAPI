const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowed = [
      "https://donatev2s.com",
      "https://www.donatev2s.com"
    ];

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/check", (req, res) => {
  try {
    const { answer } = req.body;

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

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});