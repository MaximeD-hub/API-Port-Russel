const User = require("../models/User");
const bcrypt = require("bcryptjs");

// CREATE
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur création utilisateur" });
  }
};

// READ ALL
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// READ ONE
exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select("-password");
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
};

// UPDATE
exports.updateUser = async (req, res) => {
  const update = { ...req.body };
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    update,
    { new: true }
  ).select("-password");

  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
};

// DELETE
exports.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json({ message: "Utilisateur supprimé" });
};
