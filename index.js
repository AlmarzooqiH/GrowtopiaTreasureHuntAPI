const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/check", (req, res) => {
  try {
    const { answer } = req.body;

    if (!process.env.ANSWER) {
      return res.status(500).json({ error: "Missing ANSWER env" });
    }

    if (answer === process.env.ANSWER) {
      return res.json({ correct: true });
    }

    return res.json({ correct: false });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server crash" });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Im going crazy atm T_T API running on port ${PORT}`);
});