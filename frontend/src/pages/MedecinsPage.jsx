import React, { useState } from "react";
import MedecinForm from "../components/MedecinForm";
import MedecinList from "../components/MedecinList";

function MedecinsPage() {
  const [refresh, setRefresh] = useState(false);

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
              <h1 className="display-5 fw-bold text-success">
                <i className="bi bi-heart-pulse me-3"></i>
                Gestion des Médecins
              </h1>
              <p className="lead text-muted mb-0">
                Gérez le personnel médical de votre établissement
              </p>
            </div>
            <div className="bg-success rounded-3 p-3">
              <i className="bi bi-person-badge fs-1 text-white"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <MedecinForm onAdd={handleRefresh} />
        </div>
        <div className="col-lg-8">
          <MedecinList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default MedecinsPage;