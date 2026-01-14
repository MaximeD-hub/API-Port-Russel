require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// STATIC FILES (frontend)
app.use(express.static("public"));

// ROUTES
const userRoutes = require("./routes/user.routes");
const catwayRoutes = require("./routes/catway.routes");
const reservationRoutes = require("./routes/reservation.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/catways", reservationRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.error(err));

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur le port ${PORT}`)
);

app.use(express.static("public"));
