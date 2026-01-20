const Catway = require("../models/Catway");

/**
 * @file catway.controller.js
 * @description Contrôleur de gestion des catways
 */

/**
 * Récupérer la liste de tous les catways
 * @route GET /catways
 * @access Private
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération catways" });
  }
};

/**
 * Récupérer un catway par son ID MongoDB
 * @route GET /catways/:id
 * @access Private
 */
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur récupération catway" });
  }
};

/**
 * Créer un nouveau catway
 * @route POST /catways
 * @access Private
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    if (!catwayNumber || !catwayType || !catwayState) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const catway = new Catway({
      catwayNumber,
      catwayType,
      catwayState
    });

    await catway.save();
    res.status(201).json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur création catway" });
  }
};

/**
 * Mettre à jour un catway
 * @route PUT /catways/:id
 * @access Private
 */
exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCatway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(updatedCatway);
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour catway" });
  }
};

/**
 * Supprimer un catway
 * @route DELETE /catways/:id
 * @access Private
 */
exports.deleteCatway = async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);

    if (!deletedCatway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression catway" });
  }
};
