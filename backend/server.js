// backend/server.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import patientRoutes from "./routes/patientRoutes.js";
import medecinRoutes from "./routes/medecinRoutes.js";
import factureRoutes from "./routes/factureRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import rdvRoutes from "./routes/rdvRoutes.js";





dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rendezvous", rdvRoutes);


// test
app.get("/" , (req , res) => {
    res.send("API gestion patients fonctionne ...");
});

// connexion mongoDB
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected ...");
        const PORT = process.env.PORT;
        app.listen(PORT , () => console.log(`Server on port ${PORT}`));
    }
    catch(err) {
        console.log("MongoDB error ...",err);

    }
};


start();


