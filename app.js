const express = require("express");
const cors = require("cors");

const app = express();

const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");


//user Test
const User = require("./models/User");


// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});


module.exports = app;
