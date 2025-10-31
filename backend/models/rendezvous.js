import mongoose from "mongoose";

const rendezVousSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  medecin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medecin",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  motif: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ["prévu", "annulé", "terminé"],
    default: "prévu",
  },
});

const RendezVous = mongoose.model("RendezVous", rendezVousSchema);

export default RendezVous;
