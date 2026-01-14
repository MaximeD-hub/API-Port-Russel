const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});

module.exports = app;
