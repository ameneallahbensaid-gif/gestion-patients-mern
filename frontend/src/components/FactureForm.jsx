import React, { useState, useEffect } from "react";
import { factureService, rendezVousService } from "../services/api";

function FactureForm({ onAdd }) {
  const [formData, setFormData] = useState({
    patient: "",
    medecin: "",
    rendezVous: "",
    montant: "",
    dateEmission: new Date().toISOString().split('T')[0],
    dateEcheance: "",
    statut: "en_attente",
    type: "consultation",
    details: ""
  });
  
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculMontant, setCalculMontant] = useState({
    ht: 0,
    tva: 0,
    ttc: 0
  });

  useEffect(() => {
    fetchRendezVous();
  }, []);

  useEffect(() => {
    // Calcul automatique du montant HT et TVA
    if (formData.montant) {
      const montant = parseFloat(formData.montant) || 0;
      const ht = montant / 1.2; // TVA 20%
      const tva = montant - ht;
      
      setCalculMontant({
        ht: ht.toFixed(2),
        tva: tva.toFixed(2),
        ttc: montant.toFixed(2)
      });
    } else {
      setCalculMontant({ ht: 0, tva: 0, ttc: 0 });
    }
  }, [formData.montant]);

  const fetchRendezVous = async () => {
    try {
      const res = await rendezVousService.getAll();
      setRendezVous(res.data);
    } catch (error) {
      console.error("Erreur chargement rendez-vous:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        montant: parseFloat(formData.montant),
        details: formData.details || `Facture pour ${formData.type}`
      };
      
      await factureService.create(submitData);
      
      // Réinitialiser le formulaire
      setFormData({
        patient: "",
        medecin: "",
        rendezVous: "",
        montant: "",
        dateEmission: new Date().toISOString().split('T')[0],
        dateEcheance: "",
        statut: "en_attente",
        type: "consultation",
        details: ""
      });
      
      setCalculMontant({ ht: 0, tva: 0, ttc: 0 });
      onAdd();
      
    } catch (error) {
      console.error("Erreur création facture:", error);
      alert("Erreur lors de la création de la facture");
    } finally {
      setLoading(false);
    }
  };

  const handleRendezVousChange = (e) => {
    const rdvId = e.target.value;
    const selectedRdv = rendezVous.find(rdv => rdv._id === rdvId);
    
    if (selectedRdv) {
      setFormData(prev => ({
        ...prev,
        rendezVous: rdvId,
        patient: selectedRdv.patient?._id || "",
        medecin: selectedRdv.medecin?._id || "",
        type: selectedRdv.type || "consultation"
      }));
      
      // Prix par défaut selon le type
      const prixParType = {
        consultation: 50,
        urgence: 80,
        controle: 40,
        operation: 200
      };
      
      const montantDefaut = prixParType[selectedRdv.type] || 50;
      setFormData(prev => ({ ...prev, montant: montantDefaut.toString() }));
    }
  };

  const getStatutBadge = (statut) => {
    const statuts = {
      en_attente: { class: "bg-warning", text: "En attente" },
      payee: { class: "bg-success", text: "Payée" },
      annulee: { class: "bg-danger", text: "Annulée" },
      remboursement: { class: "bg-info", text: "Remboursement" }
    };
    
    const statutInfo = statuts[statut] || { class: "bg-secondary", text: statut };
    return <span className={`badge ${statutInfo.class}`}>{statutInfo.text}</span>;
  };

  return (
    <div className="card border-info shadow-sm">
      <div className="card-header bg-info text-white">
        <h5 className="card-title mb-0">
          <i className="bi bi-receipt me-2"></i>
          Nouvelle Facture
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Rendez-vous associé */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-calendar-check me-2"></i>
                Rendez-vous associé
              </label>
              <select 
                className="form-select"
                name="rendezVous"
                value={formData.rendezVous}
                onChange={handleRendezVousChange}
                required
              >
                <option value="">Sélectionner un rendez-vous</option>
                {rendezVous.map(rdv => (
                  <option key={rdv._id} value={rdv._id}>
                    RDV #{rdv._id?.slice(-6)} - {rdv.patient?.prenom} {rdv.patient?.nom} 
                    {rdv.medecin && ` avec Dr. ${rdv.medecin.nom}`}
                    {rdv.date && ` (${new Date(rdv.date).toLocaleDateString('fr-FR')})`}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                La sélection d'un rendez-vous pré-remplira automatiquement les informations
              </small>
            </div>

            {/* Informations patient et médecin (lecture seule après sélection RDV) */}
            {(formData.patient || formData.medecin) && (
              <>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Patient</label>
                  <input 
                    type="text" 
                    className="form-control bg-light"
                    value={rendezVous.find(r => r._id === formData.rendezVous)?.patient?.prenom + " " + 
                           rendezVous.find(r => r._id === formData.rendezVous)?.patient?.nom || "Non spécifié"}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Médecin</label>
                  <input 
                    type="text" 
                    className="form-control bg-light"
                    value={rendezVous.find(r => r._id === formData.rendezVous)?.medecin?.nom ? 
                           "Dr. " + rendezVous.find(r => r._id === formData.rendezVous)?.medecin?.nom : "Non spécifié"}
                    readOnly
                  />
                </div>
              </>
            )}

            {/* Type de prestation */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Type de prestation</label>
              <select 
                className="form-select"
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="consultation">Consultation standard</option>
                <option value="urgence">Consultation d'urgence</option>
                <option value="controle">Contrôle médical</option>
                <option value="operation">Opération</option>
                <option value="analyse">Analyse médicale</option>
                <option value="radiologie">Radiologie</option>
              </select>
            </div>

            {/* Statut */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Statut</label>
              <select 
                className="form-select"
                name="statut"
                value={formData.statut}
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
              >
                <option value="en_attente">En attente de paiement</option>
                <option value="payee">Payée</option>
                <option value="annulee">Annulée</option>
                <option value="remboursement">En remboursement</option>
              </select>
            </div>

            {/* Montant */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                <i className="bi bi-currency-euro me-2"></i>
                Montant TTC (€)
              </label>
              <div className="input-group">
                <span className="input-group-text">€</span>
                <input 
                  type="number" 
                  className="form-control"
                  name="montant"
                  value={formData.montant}
                  onChange={(e) => setFormData({...formData, montant: e.target.value})}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Date d'émission</label>
              <input 
                type="date" 
                className="form-control"
                name="dateEmission"
                value={formData.dateEmission}
                onChange={(e) => setFormData({...formData, dateEmission: e.target.value})}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Date d'échéance</label>
              <input 
                type="date" 
                className="form-control"
                name="dateEcheance"
                value={formData.dateEcheance}
                onChange={(e) => setFormData({...formData, dateEcheance: e.target.value})}
              />
            </div>

            {/* Détails */}
            <div className="col-12">
              <label className="form-label fw-semibold">Détails de la prestation</label>
              <textarea 
                className="form-control"
                name="details"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                rows="3"
                placeholder="Décrivez les prestations médicales effectuées..."
              />
            </div>

            {/* Récapitulatif financier */}
            <div className="col-12">
              <div className="border rounded-3 p-3 bg-light">
                <h6 className="fw-semibold mb-3">
                  <i className="bi bi-calculator me-2"></i>
                  Récapitulatif financier
                </h6>
                <div className="row text-center">
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Montant HT</small>
                    <div className="fw-bold text-primary">€{calculMontant.ht}</div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">TVA (20%)</small>
                    <div className="fw-bold text-secondary">€{calculMontant.tva}</div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Total TTC</small>
                    <div className="fw-bold text-success">€{calculMontant.ttc}</div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <small className="text-muted d-block">Statut</small>
                    <div>{getStatutBadge(formData.statut)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations de facturation */}
            <div className="col-12">
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>
                  Informations de facturation
                </h6>
                <small className="mb-0">
                  <strong>Établissement Médical</strong><br />
                  123 Rue de la Santé, 75000 Paris<br />
                  SIRET: 123 456 789 00012 - TVA: FR12 345678901<br />
                  Tél: 01 23 45 67 89 - Email: facturation@clinique.fr
                </small>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-info w-100 mt-3 py-2 fw-semibold text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Création en cours...
              </>
            ) : (
              <>
                <i className="bi bi-file-earmark-plus me-2"></i>
                Créer la Facture
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FactureForm;