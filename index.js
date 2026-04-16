const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    console.log("[CORS] Incoming origin:", origin);

    const allowed = [
      "https://donatev2s.com",
      "https://www.donatev2s.com"
    ];

    if (!origin) {
      console.log("[CORS] No origin (mobile/postman/server-to-server)");
      return callback(null, true);
    }

    if (allowed.includes(origin)) {
      console.log("[CORS] Allowed origin:", origin);
      return callback(null, true);
    }

    console.log("[CORS] Blocked origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
};

app.use((req, res, next) => {
  console.log("\n-----------------------------");
  console.log("[REQUEST]", req.method, req.url);
  console.log("[HEADERS]", req.headers);
  next();
});

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("[RESPONSE]", req.method, req.url, res.statusCode);
  });
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  console.log("[ROUTE /] hit");
  res.json({ status: "ok" });
});

app.options("*", (req, res) => {
  console.log("[OPTIONS] preflight hit:", req.url);
  res.sendStatus(204);
});

app.post("/check", (req, res) => {
  try {
    console.log("[ROUTE /check] hit");

    console.log("[BODY RAW]", req.body);

    const { answer } = req.body || {};

    console.log("[PARSED ANSWER]", answer);

    if (!process.env.ANSWER) {
      console.log("[ERROR] Missing process.env.ANSWER");
      return res.status(500).json({ error: "Missing ANSWER" });
    }

    const result = answer === process.env.ANSWER;

    console.log("[COMPARE]", {
      received: answer,
      expected: process.env.ANSWER,
      correct: result
    });

    return res.json({ correct: result });

  } catch (err) {
    console.log("[FATAL ERROR]", err);
    return res.status(500).json({ error: "Server crash" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});