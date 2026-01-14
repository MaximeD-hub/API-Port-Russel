const express = require("express");
const cors = require("cors");

const app = express();

const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");


//user Test
const User = require("./models/user");


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(userRoutes);

// Route test
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});


module.exports = app;
