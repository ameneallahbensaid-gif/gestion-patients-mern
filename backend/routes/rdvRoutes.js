import express from "express";
import {
  createRendezVous,
  getAllRendezVous,
  getRendezVousById,
  updateRendezVous,
  deleteRendezVous,
} from "../controllers/rdvController.js";

const router = express.Router();

router.post("/", createRendezVous);
router.get("/", getAllRendezVous);
router.get("/:id", getRendezVousById);
router.put("/:id", updateRendezVous);
router.delete("/:id", deleteRendezVous);

export default router;
