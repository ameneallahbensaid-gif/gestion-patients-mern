import express from "express";
import {
  creerPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", creerPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;

