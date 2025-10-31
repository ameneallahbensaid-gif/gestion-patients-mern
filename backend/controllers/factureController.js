import Facture from "../models/facture.js";

export const createFacture = async (req, res) => {
  try {
    const facture = await Facture.create(req.body);
    res.status(201).json(facture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFactures = async (req, res) => {
  try {
    const factures = await Facture.find().populate("rendezVous");
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id).populate("rendezVous");
    if (!facture) return res.status(404).json({ message: "Facture non trouvée" });
    res.status(200).json(facture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFacture = async (req, res) => {
  try {
    const facture = await Facture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(facture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFacture = async (req, res) => {
  try {
    await Facture.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Facture supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
