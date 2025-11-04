import React, { useEffect, useState } from "react";
import { rendezVousService } from "../services/api";

function RendezVousList({ refresh, searchTerm }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredRendezVous, setFilteredRendezVous] = useState([]);
  const [filterStatut, setFilterStatut] = useState("tous");

  useEffect(() => {
    fetchRendezVous();
  }, [refresh]);

  useEffect(() => {
    // Filtrer les rendez-vous selon la recherche et le statut
    let filtered = rendezVous;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(rdv =>
        rdv.patient?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rdv.patient?.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rdv.medecin?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rdv.motif?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (filterStatut !== "tous") {
      filtered = filtered.filter(rdv => getRdvStatut(rdv) === filterStatut);
    }

    setFilteredRendezVous(filtered);
  }, [searchTerm, rendezVous, filterStatut]);

  const fetchRendezVous = async () => {
    try {
      setLoading(true);
      const res = await rendezVousService.getAll();
      setRendezVous(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des rendez-vous");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        await rendezVousService.delete(id);
        fetchRendezVous();
      } catch (err) {
        alert("Erreur lors de la suppression du rendez-vous");
      }
    }
  };

  const getRdvStatut = (rdv) => {
    const now = new Date();
    const rdvDate = new Date(rdv.date);
    
    if (rdvDate < now) return "termine";
    if (rdvDate.toDateString() === now.toDateString()) return "aujourdhui";
    if (rdvDate < new Date(now.getTime() + 24 * 60 * 60 * 1000)) return "demain";
    return "futur";
  };

  const getStatutBadge = (rdv) => {
    const statut = getRdvStatut(rdv);
    
    switch (statut) {
      case "termine":
        return <span className="badge bg-secondary">Terminé</span>;
      case "aujourdhui":
        return <span className="badge bg-success">Aujourd'hui</span>;
      case "demain":
        return <span className="badge bg-warning">Demain</span>;
      case "futur":
        return <span className="badge bg-info">À venir</span>;
      default:
        return <span className="badge bg-light text-dark">Inconnu</span>;
    }
  };

  const getTypeBadge = (type) => {
    const types = {
      consultation: { class: "bg-primary", text: "Consultation" },
      urgence: { class: "bg-danger", text: "Urgence" },
      controle: { class: "bg-info", text: "Contrôle" },
      operation: { class: "bg-warning", text: "Opération" }
    };
    
    const typeInfo = types[type] || { class: "bg-secondary", text: type };
    return <span className={`badge ${typeInfo.class}`}>{typeInfo.text}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatutCounts = () => {
    const counts = {
      tous: rendezVous.length,
      aujourdhui: rendezVous.filter(rdv => getRdvStatut(rdv) === "aujourdhui").length,
      demain: rendezVous.filter(rdv => getRdvStatut(rdv) === "demain").length,
      futur: rendezVous.filter(rdv => getRdvStatut(rdv) === "futur").length,
      termine: rendezVous.filter(rdv => getRdvStatut(rdv) === "termine").length
    };
    return counts;
  };

  if (loading) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-3 text-muted">Chargement des rendez-vous...</p>
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
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          <i className="bi bi-calendar-check me-2"></i>
          Liste des Rendez-vous
          <span className="badge bg-dark ms-2">{filteredRendezVous.length}</span>
        </h5>
        <div className="d-flex align-items-center">
          <small className="me-3">
            {searchTerm && `Résultats pour "${searchTerm}"`}
          </small>
          <div className="btn-group">
            <button className="btn btn-light btn-sm" title="Actualiser" onClick={fetchRendezVous}>
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
              className={`btn btn-sm ${filterStatut === "aujourdhui" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setFilterStatut("aujourdhui")}
            >
              Aujourd'hui <span className="badge bg-light text-dark ms-1">{statutCounts.aujourdhui}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "demain" ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setFilterStatut("demain")}
            >
              Demain <span className="badge bg-light text-dark ms-1">{statutCounts.demain}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "futur" ? "btn-info" : "btn-outline-info"}`}
              onClick={() => setFilterStatut("futur")}
            >
              À venir <span className="badge bg-light text-dark ms-1">{statutCounts.futur}</span>
            </button>
          </div>
          <div className="col-auto">
            <button
              className={`btn btn-sm ${filterStatut === "termine" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setFilterStatut("termine")}
            >
              Terminés <span className="badge bg-light text-dark ms-1">{statutCounts.termine}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-warning">
              <tr>
                <th scope="col" className="ps-4">Patient & Médecin</th>
                <th scope="col">Date & Heure</th>
                <th scope="col">Type & Motif</th>
                <th scope="col">Statut</th>
                <th scope="col" className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRendezVous.map((rdv) => (
                <tr key={rdv._id} className="align-middle">
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-warning rounded-circle p-2 me-3">
                        <i className="bi bi-calendar-event text-white"></i>
                      </div>
                      <div>
                        <strong>{rdv.patient?.prenom} {rdv.patient?.nom}</strong>
                        <br />
                        <small className="text-muted">
                          <i className="bi bi-person-badge me-1"></i>
                          Dr. {rdv.medecin?.nom}
                          {rdv.medecin?.specialite && ` - ${rdv.medecin.specialite}`}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">{formatDate(rdv.date)}</div>
                    <small className="text-muted">
                      {new Date(rdv.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                    </small>
                  </td>
                  <td>
                    <div className="mb-1">
                      {getTypeBadge(rdv.type || 'consultation')}
                    </div>
                    <small className="text-muted" title={rdv.motif}>
                      {rdv.motif?.length > 50 ? `${rdv.motif.substring(0, 50)}...` : rdv.motif}
                    </small>
                  </td>
                  <td>
                    {getStatutBadge(rdv)}
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
                        title="Confirmer"
                      >
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(rdv._id)}
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
        
        {filteredRendezVous.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
            <h5 className="text-muted">
              {searchTerm || filterStatut !== "tous" ? 
                "Aucun rendez-vous trouvé" : 
                "Aucun rendez-vous programmé"
              }
            </h5>
            <p className="text-muted">
              {searchTerm ? 
                "Aucun rendez-vous ne correspond à votre recherche." : 
                filterStatut !== "tous" ?
                `Aucun rendez-vous ${filterStatut} pour le moment.` :
                "Commencez par programmer votre premier rendez-vous."
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Résumé */}
      {filteredRendezVous.length > 0 && (
        <div className="card-footer bg-light">
          <div className="row text-center">
            <div className="col">
              <small className="text-muted d-block">Total affiché</small>
              <strong>{filteredRendezVous.length}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">Aujourd'hui</small>
              <strong className="text-success">{statutCounts.aujourdhui}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">À venir</small>
              <strong className="text-info">{statutCounts.futur + statutCounts.demain}</strong>
            </div>
            <div className="col">
              <small className="text-muted d-block">Terminés</small>
              <strong className="text-secondary">{statutCounts.termine}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RendezVousList;