const Catway = require("../models/Catway");

// CREATE
exports.createCatway = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.status(201).json(catway);
  } catch (error) {
    res.status(500).json({
      message: "Erreur création catway",
      error: error.message
    });
  }
};

// READ ALL
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// READ ONE
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE (state only)
exports.updateCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState: req.body.catwayState },
      { new: true }
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

// DELETE
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: req.params.id
    });

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression" });
  }
};
