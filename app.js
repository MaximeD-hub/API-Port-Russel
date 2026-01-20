const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// MODELS (ok)
const Catway = require("./models/Catway");
const Reservation = require("./models/Reservation");
const User = require("./models/user");

// ROUTES
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

// MIDDLEWARE AUTH
const authMiddleware = require("./middlewares/auth.middleware");

// =====================
// MIDDLEWARES GLOBAUX
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// MOTEUR DE TEMPLATE
// =====================
app.set("view engine", "ejs");
app.set("views", "./views");

// =====================
// FICHIERS STATIQUES
// =====================
app.use(express.static("public"));

// =====================
// ROUTES API
// =====================
app.use(authRoutes);
app.use(userRoutes);

// =====================
// ROUTE DASHBOARD (PROTÉGÉE)
// =====================
app.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", {
    user: req.user
  });
});

// =====================
// ROUTE TEST
// =====================
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});

module.exports = app;
