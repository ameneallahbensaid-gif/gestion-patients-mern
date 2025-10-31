import RendezVous from "../models/rendezvous.js";
import Patient from "../models/patient.js";
import Medecin from "../models/medecin.js";

// ✅ Créer un rendez-vous
export const createRendezVous = async (req, res) => {
  try {
    const { patient, medecin, date, motif } = req.body;

    // Vérifier si patient et médecin existent
    const patientExiste = await Patient.findById(patient);
    const medecinExiste = await Medecin.findById(medecin);

    if (!patientExiste || !medecinExiste) {
      return res.status(404).json({ message: "Patient ou médecin introuvable" });
    }

    const nouveauRdv = new RendezVous({ patient, medecin, date, motif });
    const rdvSauvegarde = await nouveauRdv.save();

    res.status(201).json(rdvSauvegarde);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtenir tous les rendez-vous
export const getAllRendezVous = async (req, res) => {
  try {
    const rdvs = await RendezVous.find()
      .populate("patient", "nom prenom email")
      .populate("medecin", "nom specialite email");
    res.status(200).json(rdvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtenir un rendez-vous par ID
export const getRendezVousById = async (req, res) => {
  try {
    const rdv = await RendezVous.findById(req.params.id)
      .populate("patient", "nom prenom email")
      .populate("medecin", "nom specialite email");
    if (!rdv) return res.status(404).json({ message: "Rendez-vous non trouvé" });
    res.status(200).json(rdv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour un rendez-vous
export const updateRendezVous = async (req, res) => {
  try {
    const rdv = await RendezVous.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rdv) return res.status(404).json({ message: "Rendez-vous non trouvé" });
    res.status(200).json(rdv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer un rendez-vous
export const deleteRendezVous = async (req, res) => {
  try {
    const rdv = await RendezVous.findByIdAndDelete(req.params.id);
    if (!rdv) return res.status(404).json({ message: "Rendez-vous non trouvé" });
    res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
