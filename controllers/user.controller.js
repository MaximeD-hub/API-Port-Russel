const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
  console.error("❌ ERREUR CREATE USER :", error);
  res.status(500).json({
    message: "Erreur serveur",
    error: error.message
  });
}
};
