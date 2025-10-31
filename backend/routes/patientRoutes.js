import express from "express";
import { creerPatient, getPatients, getPatientById } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", creerPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);

export default router;
