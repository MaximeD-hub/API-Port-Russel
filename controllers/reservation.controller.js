const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

// CREATE
exports.createReservation = async (req, res) => {
  try {
    const catwayNumber = req.params.id;

    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    const reservation = new Reservation({
      ...req.body,
      catwayNumber
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur création réservation",
      error: error.message
    });
  }
};

// READ ALL (for one catway)
exports.getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// READ ONE
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(
      req.params.idReservation
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      req.body,
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

// DELETE
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.idReservation
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable" });
    }

    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression" });
  }
};
