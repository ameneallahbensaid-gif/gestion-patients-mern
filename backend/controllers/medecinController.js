import Medecin from "../models/medecin.js";
import RendezVous from "../models/rendezvous.js";


export const creerMedecin = async (req, res) => {
  try {
    const medecin = new Medecin(req.body);
    await medecin.save();
    res.status(201).json(medecin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.find().populate("rendezVous");
    res.status(200).json(medecins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedecinById = async (req, res) => {
  try {
    const medecin = await Medecin.findById(req.params.id).populate("rendezVous");
    if (!medecin) return res.status(404).json({ message: "Médecin non trouvé" });
    res.status(200).json(medecin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedecin = async (req, res) => {
  try {
    const updated = await Medecin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Médecin non trouvé" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedecin = async (req, res) => {
  try {
    const deleted = await Medecin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Médecin non trouvé" });
    res.status(200).json({ message: "Médecin supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
