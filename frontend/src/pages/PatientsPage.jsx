import React, { useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

function PatientsPage() {
  const [refresh, setRefresh] = useState(false);
  const [activeView, setActiveView] = useState("liste");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleNewPatient = () => {
    setActiveView("nouveau");
  };

  const handleBackToList = () => {
    setActiveView("liste");
    handleRefresh();
  };

  return (
    <div className="container mt-4">
      {/* En-tête de page */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5 fw-bold text-primary">
                <i className="bi bi-people me-3"></i>
                Gestion des Patients
              </h1>
              <p className="lead text-muted mb-0">
                Gérez les dossiers patients de votre établissement
              </p>
            </div>
            <div className="bg-primary rounded-3 p-3">
              <i className="bi bi-person-plus fs-1 text-white"></i>
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
                      placeholder="Rechercher un patient..."
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
                      className="btn btn-outline-primary"
                      title="Exporter"
                    >
                      <i className="bi bi-download me-2"></i>
                      Exporter
                    </button>
                    <button 
                      className="btn btn-primary d-flex align-items-center"
                      onClick={handleNewPatient}
                    >
                      <i className="bi bi-person-plus me-2"></i>
                      Nouveau Patient
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="row">
        {activeView === "liste" ? (
          <>
            {/* Vue liste */}
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-light">
                  <h6 className="card-title mb-0 text-primary">
                    <i className="bi bi-info-circle me-2"></i>
                    Informations
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-graph-up text-primary"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Patients Actifs</h6>
                      <small className="text-muted">Dossiers à jour</small>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="mt-3">
                    <h6 className="text-muted mb-2">Actions Rapides</h6>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary btn-sm text-start">
                        <i className="bi bi-printer me-2"></i>
                        Imprimer la liste
                      </button>
                      <button className="btn btn-outline-success btn-sm text-start">
                        <i className="bi bi-envelope me-2"></i>
                        Envoyer un rappel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-8">
              <PatientList refresh={refresh} searchTerm={searchTerm} />
            </div>
          </>
        ) : (
          <>
            {/* Vue nouveau patient */}
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-person-plus me-2"></i>
                    Nouveau Patient
                  </h5>
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={handleBackToList}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Retour à la liste
                  </button>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <PatientForm onAdd={handleBackToList} />
                    </div>
                    <div className="col-lg-4">
                      <div className="card border-success">
                        <div className="card-header bg-success text-white">
                          <h6 className="mb-0">
                            <i className="bi bi-lightbulb me-2"></i>
                            Conseils
                          </h6>
                        </div>
                        <div className="card-body">
                          <ul className="list-unstyled small">
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Renseignez tous les champs obligatoires
                            </li>
                            <li className="mb-2">
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Vérifiez l'exactitude des informations
                            </li>
                            <li>
                              <i className="bi bi-check-circle text-success me-2"></i>
                              Numéro de téléphone actif
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientsPage;