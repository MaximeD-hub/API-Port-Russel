require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const authMiddleware = require("./middlewares/auth.middleware");

// =====================
// VIEW ENGINE
// =====================
app.set("view engine", "ejs");
app.set("views", "views");

// =====================
// MIDDLEWARES
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// STATIC FILES
app.use(express.static("public"));

// =====================
// ROUTES
// =====================
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const catwayRoutes = require("./routes/catway.routes");
const reservationRoutes = require("./routes/reservation.routes");

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/catways", reservationRoutes);

// DASHBOARD PROTÉGÉ
app.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", { user: req.user });
});

// LOGOUT
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// ROUTE TEST (Render)
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});

// =====================
// DATABASE
// =====================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// =====================
// SERVER
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
