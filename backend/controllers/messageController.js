import Message from "../models/message.js";

// Envoyer un message
export const envoyerMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("expediteur")
      .populate("destinataire");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer messages entre deux utilisateurs
export const getConversation = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { expediteur: user1, destinataire: user2 },
        { expediteur: user2, destinataire: user1 }
      ]
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marquer un message comme lu
export const marquerCommeLu = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { lu: true }, { new: true });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
