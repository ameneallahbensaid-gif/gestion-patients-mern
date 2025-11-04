import React, { useState } from "react";
import FactureForm from "../components/FactureForm";
import FactureList from "../components/FactureList";

function FacturesPage() {
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("liste");

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
              <h1 className="display-5 fw-bold text-info">
                <i className="bi bi-receipt me-3"></i>
                Gestion des Factures
              </h1>
              <p className="lead text-muted mb-0">
                Gérez la facturation et la comptabilité
              </p>
            </div>
            <div className="bg-info rounded-3 p-3">
              <i className="bi bi-currency-euro fs-1 text-white"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="row mb-4">
        <div className="col">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "liste" ? "active" : ""}`}
                onClick={() => setActiveTab("liste")}
              >
                <i className="bi bi-list-ul me-2"></i>
                Liste des Factures
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "nouvelle" ? "active" : ""}`}
                onClick={() => setActiveTab("nouvelle")}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Nouvelle Facture
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "stats" ? "active" : ""}`}
                onClick={() => setActiveTab("stats")}
              >
                <i className="bi bi-graph-up me-2"></i>
                Statistiques
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="row">
        <div className="col-12">
          {activeTab === "liste" && <FactureList refresh={refresh} />}
          {activeTab === "nouvelle" && <FactureForm onAdd={handleRefresh} />}
          {activeTab === "stats" && (
            <div className="card shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-graph-up me-2"></i>
                  Statistiques Financières
                </h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <div className="border rounded-3 p-3">
                      <h3 className="text-success">€12,540</h3>
                      <p className="text-muted mb-0">Chiffre d'Affaires</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="border rounded-3 p-3">
                      <h3 className="text-primary">45</h3>
                      <p className="text-muted mb-0">Factures Payées</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="border rounded-3 p-3">
                      <h3 className="text-warning">8</h3>
                      <p className="text-muted mb-0">Factures En Attente</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="border rounded-3 p-3">
                      <h3 className="text-danger">2</h3>
                      <p className="text-muted mb-0">Factures Impayées</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacturesPage;