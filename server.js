require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// =====================
// ROUTE TEST (IMPORTANT POUR RENDER)
// =====================
app.get("/", (req, res) => {
  res.send("API Port de Russell opérationnelle 🚤");
});

// =====================
// DATABASE
// =====================
mongoose
  .connect(process.env.MONGODB_URI) // ⬅️ NOM CORRECT
  .then(() => {
    console.log("✅ MongoDB connecté");
  })
  .catch((err) => {
    console.error("❌ Erreur MongoDB :", err);
  });

// =====================
// SERVER
// =====================
const PORT = process.env.PORT || 3000;

console.log("🟡 Tentative de démarrage du serveur...");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
