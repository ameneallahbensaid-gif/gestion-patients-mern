import React, { useState } from "react";
import { patientService } from "../services/api";

function PatientForm({ onAdd }) {
  const [formData, setFormData] = useState({ 
    nom: "", 
    prenom: "", 
    telephone: "",
    email: "",
    adresse: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("🔄 Tentative de création patient:", formData);
      const response = await patientService.create(formData);
      console.log("✅ Patient créé avec succès:", response.data);
      
      setFormData({ nom: "", prenom: "", telephone: "", email: "", adresse: "" });
      onAdd(); // Rafraîchir la liste
      
      // Message de succès
      alert("Patient ajouté avec succès !");
      
    } catch (error) {
      console.error("❌ Erreur création patient:", error);
      setError(error.response?.data?.message || "Erreur lors de l'ajout du patient");
      alert("Erreur: " + (error.response?.data?.message || "Impossible d'ajouter le patient"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="card-title text-primary">Ajouter un Patient</h5>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom *</label>
          <input 
            type="text" 
            className="form-control" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
            required 
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prénom *</label>
          <input 
            type="text" 
            className="form-control" 
            name="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
            required 
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone *</label>
          <input 
            type="tel" 
            className="form-control" 
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            required 
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <textarea 
            className="form-control" 
            name="adresse" 
            value={formData.adresse} 
            onChange={handleChange} 
            rows="2"
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Ajout en cours...
            </>
          ) : (
            <>
              <i className="bi bi-person-plus me-2"></i>
              Ajouter le Patient
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default PatientForm;