// backend/models/Medecin.js
import mongoose from "mongoose";

const medecinSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  specialite: { type: String, required: true },
  emploiTemps: { type: String }, // texte simple ou JSON selon besoin
  rendezVous: [{ type: mongoose.Schema.Types.ObjectId, ref: "RendezVous" }]
}, { timestamps: true });

const Medecin = mongoose.model("Medecin", medecinSchema);
export default Medecin;
