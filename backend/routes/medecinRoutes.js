import express from "express";
import {
  creerMedecin,
  getMedecins,
  getMedecinById,
  updateMedecin,
  deleteMedecin
} from "../controllers/medecinController.js";

const router = express.Router();

router.post("/", creerMedecin);
router.get("/", getMedecins);
router.get("/:id", getMedecinById);
router.put("/:id", updateMedecin);
router.delete("/:id", deleteMedecin);

export default router;
