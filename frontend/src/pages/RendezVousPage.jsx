import React, { useState } from "react";
import RendezVousForm from "../components/RendezVousForm";
import RendezVousList from "../components/RendezVousList";

function RendezVousPage() {
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-4">
      {/* En-tête de page */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5 fw-bold text-warning">
                <i className="bi bi-calendar-check me-3"></i>
                Gestion des Rendez-vous
              </h1>
              <p className="lead text-muted mb-0">
                Planifiez et suivez les consultations médicales
              </p>
            </div>
            <div className="bg-warning rounded-3 p-3">
              <i className="bi bi-clock-history fs-1 text-white"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body py-3">
              <div className="row align-items-center">
                <div className="col-md-6 mb-2 mb-md-0">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Rechercher un rendez-vous..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-2 justify-content-md-end">
                    <button 
                      className="btn btn-outline-secondary"
                      title="Filtrer"
                    >
                      <i className="bi bi-funnel me-2"></i>
                      Filtres
                    </button>
                    <button 
                      className="btn btn-outline-warning"
                      title="Aujourd'hui"
                    >
                      <i className="bi bi-calendar-day me-2"></i>
                      Aujourd'hui
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-5 mb-4">
          <RendezVousForm onAdd={handleRefresh} />
        </div>
        <div className="col-lg-7">
          <RendezVousList refresh={refresh} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

export default RendezVousPage;