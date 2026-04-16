const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const ANSWER = process.env.ANSWER;

app.post("/check", (req, res) => {
  const { answer } = req.body;
  
  if (ANSWER === undefined){
    return res.status(501).json({
      error: "Server alive but missing ANSWER env variable"
    });
  }
  return res.json({
    correct: answer === ANSWER
  });
});

const PORT = process.env.PORT || 6769;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
  console.log("ANSWER: ", ANSWER);
});