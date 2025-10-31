// backend/models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  expediteur: { type: mongoose.Schema.Types.ObjectId, refPath: "typeExpediteur", required: true },
  destinataire: { type: mongoose.Schema.Types.ObjectId, refPath: "typeDestinataire", required: true },
  typeExpediteur: { type: String, enum: ["Patient", "Medecin"], required: true },
  typeDestinataire: { type: String, enum: ["Patient", "Medecin"], required: true },
  contenu: { type: String, required: true },
  lu: { type: Boolean, default: false }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
