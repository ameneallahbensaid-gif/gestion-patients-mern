import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-primary bg-gradient text-white py-5">
      <div className="container">
        <div className="row align-items-center min-vh-75 py-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-4">
              🏥 Système de Gestion Hospitalière
            </h1>
            <p className="lead mb-4">
              Solution complète pour la gestion de votre établissement médical. 
              Optimisez votre workflow avec notre plateforme intégrée.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/dashboard" className="btn btn-light btn-lg px-4 me-md-2 fw-bold">
                Tableau de Bord
              </Link>
              <Link to="/patients" className="btn btn-outline-light btn-lg px-4">
                Commencer
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div className="bg-white rounded-3 p-4 shadow-lg mt-4 mt-lg-0">
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 border border-primary rounded-3">
                    <i className="bi bi-people fs-1 text-primary"></i>
                    <h5 className="mt-2 text-dark">Patients</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border border-success rounded-3">
                    <i className="bi bi-heart-pulse fs-1 text-success"></i>
                    <h5 className="mt-2 text-dark">Médecins</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border border-warning rounded-3">
                    <i className="bi bi-calendar-check fs-1 text-warning"></i>
                    <h5 className="mt-2 text-dark">Rendez-vous</h5>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border border-info rounded-3">
                    <i className="bi bi-receipt fs-1 text-info"></i>
                    <h5 className="mt-2 text-dark">Factures</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}