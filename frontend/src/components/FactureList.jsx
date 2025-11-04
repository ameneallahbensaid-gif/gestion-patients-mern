import React, { useEffect, useState } from "react";
import { factureService } from "../services/api";

function FactureList({ refresh, searchTerm }) {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredFactures, setFilteredFactures] = useState([]);
  const [filterStatut, setFilterStatut] = useState("tous");

  useEffect(() => {
    fetchFactures();
  }, [refresh]);

  useEffect(() => {
    // Filtrer les factures
    let filtered = factures;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(facture =>
        facture.patient?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.patient?.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.medecin?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (filterStatut !== "tous") {
      filtered = filtered.filter(facture => facture.statut === filterStatut);
    }

    setFilteredFactures(filtered);
  }, [searchTerm, factures, filterStatut]);

  const fetchFactures = async () => {
    try {
      setLoading(true);
      const res = await factureService.getAll();
      setFactures(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des factures");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      try {
        await factureService.delete(id);
        fetchFactures();
      } catch (err) {
        alert("Erreur lors de la suppression de la facture");
      }
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

  const getTypeBadge = (type) => {
    const types = {
      consultation: { class: "bg-primary", text: "Consultation" },
      urgence: { class: "bg-danger", text: "Urgence" },
      controle: { class: "bg-info", text: "Contrôle" },
      operation: { class: "bg-warning", text: "Opération" },
      analyse: { class: "bg-secondary", text: "Analyse" },
      radiologie: { class: "bg-dark", text: "Radiologie" }
    };
    
    const typeInfo = types[type] || { class: "bg-light text-dark", text: type };
    return <span className={`badge ${typeInfo.class}`}>{typeInfo.text}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatMontant = (montant) => {
    return `€${parseFloat(montant || 0).toFixed(2)}`;
  };

  const getStatutCounts = () => {
    const counts = {
      tous: factures.length,
      en_attente: factures.filter(f => f.statut === "en_attente").length,
      payee: factures.filter(f => f.statut === "payee").length,
      annulee: factures.filter(f => f.statut === "annulee").length,
      remboursement: factures.filter(f => f.statut === "remboursement").length
    };
    return counts;
  };

  if (loading) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Chargement des factures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <div>{error}</div>
      </div>
    );
  }

  const statutCounts = getStatutCounts();

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="bi bi-receipt me-2"></i>
          Liste des Factures
          <span className="badge bg-light text-info ms-2">{filteredFactures.length}</span>
        </h5>
        <div className="d-flex align-items-center">
          <small className="me-3">
            {searchTerm && `Résultats pour "${searchTerm}"`}
          </small>
          <div className="btn-group">
            <button className="btn btn-light btn-sm" title="Actualiser" onClick={fetchFactures}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Filtres par statut */}
      <div className="card-body border-bottom">
        <div className="row g-2">
          <div className="col-12">
            <label className="form-label fw-semibold">Filtrer par statut :</label>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "tous" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setFilterStatut("tous")}
            >
              Tous <span className="badge bg-light text-dark ms-1">{statutCounts.tous}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "en_attente" ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setFilterStatut("en_attente")}
            >
              En attente <span className="badge bg-light text-dark ms-1">{statutCounts.en_attente}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "payee" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setFilterStatut("payee")}
            >
              Payées <span className="badge bg-light text-dark ms-1">{statutCounts.payee}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "annulee" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setFilterStatut("annulee")}
            >
              Annulées <span className="badge bg-light text-dark ms-1">{statutCounts.annulee}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-info">
              <tr>
                <th scope="col" className="ps-4">Patient & Prestation</th>
                <th scope="col">Montant</th>
                <th scope="col">Dates</th>
                <th scope="col">Statut</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFactures.map((facture) => (
                <tr key={facture._id} className="align-middle">
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-info rounded-circle p-2 me-3">
                        <i className="bi bi-receipt text-white"></i>
                      </div>
                      <div>
                        <strong>{facture.patient?.prenom} {facture.patient?.nom}</strong>
                        <br />
                        <small className="text-muted">
                          {getTypeBadge(facture.type)}
                          {facture.medecin && ` • Dr. ${facture.medecin.nom}`}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold text-success">{formatMontant(facture.montant)}</div>
                    <small className="text-muted">TTC</small>
                  </td>
                  <td>
                    <div>
                      <small className="text-muted d-block">Émission:</small>
                      <strong>{formatDate(facture.dateEmission)}</strong>
                    </div>
                    {facture.dateEcheance && (
                      <div className="mt-1">
                        <small className="text-muted d-block">Échéance:</small>
                        <strong>{formatDate(facture.dateEcheance)}</strong>
                      </div>
                    )}
                  </td>
                  <td>
                    {getStatutBadge(facture.statut)}
                  </td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button 
                        className="btn btn-outline-primary"
                        title="Voir les détails"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button 
                        className="btn btn-outline-success"
                        title="Modifier"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button 
                        className="btn btn-outline-info"
                        title="Télécharger PDF"
                      >
                        <i className="bi bi-download"></i>
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(facture._id)}
                        title="Supprimer"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredFactures.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-receipt fs-1 text-muted mb-3"></i>
            <h5 className="text-muted">
              {searchTerm || filterStatut !== "tous" ? 
                "Aucune facture trouvée" : 
                "Aucune facture enregistrée"
              }
            </h5>
            <p className="text-muted">
              {searchTerm ? 
                "Aucune facture ne correspond à votre recherche." : 
                filterStatut !== "tous" ?
                `Aucune facture ${filterStatut} pour le moment.` :
                "Commencez par créer votre première facture."
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Résumé financier */}
      {filteredFactures.length > 0 && (
        <div className="card-footer bg-light">
          <div className="row text-center">
            <div className="col">
              <small className="text-muted d-block">Total affiché</small>
              <strong>{filteredFactures.length}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">En attente</small>
              <strong className="text-warning">{statutCounts.en_attente}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">Payées</small>
              <strong className="text-success">{statutCounts.payee}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">Montant total</small>
              <strong className="text-success">
                €{filteredFactures.reduce((sum, f) => sum + (parseFloat(f.montant) || 0), 0).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FactureList;