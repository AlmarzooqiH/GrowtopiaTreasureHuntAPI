const express = require("express");
const cors = require("cors");
const { ANSWER, PORT } = require("./const");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/check", (req, res) => {
  const { answer } = req.body;

  if (answer === ANSWER) {
    return res.json({ correct: true });
  }

  res.json({ correct: false });
});

app.listen(PORT, () => {
  console.log("API running on port 6769");
});