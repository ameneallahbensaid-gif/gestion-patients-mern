import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

    nom : { type : String , required : true },
    prenom : { type : String , required : true },
    email : { type : String , required : true , unique : true },
    telephone : { type : String },
    historique : { type : [String] , default : [] },
    createdAt : { type : Date , default : Date.now }


});


export default mongoose.model("Patient",patientSchema);
