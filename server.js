require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});


const catwayRoutes = require("./routes/catway.routes");
app.use("/catways", catwayRoutes);
