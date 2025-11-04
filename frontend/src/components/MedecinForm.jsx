import React, { useState } from "react";
import { medecinService } from "../services/api";

function MedecinForm({ onAdd }) {
  const [formData, setFormData] = useState({ 
    nom: "", 
    specialite: "",
    email: "",
    telephone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("🔄 Tentative de création médecin:", formData);
      const response = await medecinService.create(formData);
      console.log("✅ Médecin créé avec succès:", response.data);
      
      setFormData({ nom: "", specialite: "", email: "", telephone: "" });
      onAdd(); // Rafraîchir la liste
      
      alert("Médecin ajouté avec succès !");
      
    } catch (error) {
      console.error("❌ Erreur création médecin:", error);
      setError(error.response?.data?.message || "Erreur lors de l'ajout du médecin");
      alert("Erreur: " + (error.response?.data?.message || "Impossible d'ajouter le médecin"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="card-title text-success">Ajouter un Médecin</h5>
      
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
          <label className="form-label">Spécialité *</label>
          <input 
            type="text" 
            className="form-control" 
            name="specialite" 
            value={formData.specialite} 
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
          <label className="form-label">Téléphone</label>
          <input 
            type="tel" 
            className="form-control" 
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-success w-100" 
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
              Ajouter le Médecin
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default MedecinForm;