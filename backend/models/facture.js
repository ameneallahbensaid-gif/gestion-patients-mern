import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  rendezVous: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RendezVous",
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  statutPaiement: {
    type: String,
    enum: ["Payé", "En attente", "Annulé"],
    default: "En attente"
  },
  modePaiement: {
    type: String,
    enum: ["Espèces", "Carte", "Assurance"],
    default: "Espèces"
  },
  compagnieAssurance: {
    type: String,
    default: ""
  },
  dateFacture: {
    type: Date,
    default: Date.now
  }
});

const Facture = mongoose.model("Facture", factureSchema);
export default Facture;
