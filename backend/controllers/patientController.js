import Patient from "../models/patient.js";
import RendezVous from "../models/rendezvous.js";


// Créer un patient
export const creerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir tous les patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("rendezVous");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un seul patient
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("rendezVous");
    if (!patient) return res.status(404).json({ message: "Patient non trouvé" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un patient
export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Patient non trouvé" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un patient
export const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient non trouvé" });
    res.status(200).json({ message: "Patient supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
