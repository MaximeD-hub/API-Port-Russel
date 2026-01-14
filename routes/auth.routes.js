const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.get("/logout", (req, res) => {
  res.json({ message: "Déconnexion effectuée" });
});

module.exports = router;
