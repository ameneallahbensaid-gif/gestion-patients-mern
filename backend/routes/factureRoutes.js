import express from "express";
import {
  createFacture,
  getFactures,
  getFactureById,
  updateFacture,
  deleteFacture
} from "../controllers/factureController.js";

const router = express.Router();

router.post("/", createFacture);
router.get("/", getFactures);
router.get("/:id", getFactureById);
router.put("/:id", updateFacture);
router.delete("/:id", deleteFacture);

export default router;
