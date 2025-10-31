import express from "express";
import {
  envoyerMessage,
  getMessages,
  getConversation,
  marquerCommeLu
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/", envoyerMessage);
router.get("/", getMessages);
router.get("/conversation/:user1/:user2", getConversation);
router.put("/:id/lu", marquerCommeLu);

export default router;
