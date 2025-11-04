
import { patientService, medecinService, rendezVousService } from "../services/api"; // Correction ici

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    medecins: 0,
    rendezVous: 0,
    factures: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [patientsRes, medecinsRes, rdvRes] = await Promise.all([
        patientService.getAll(),
        medecinService.getAll(),
        rendezVousService.getAll()
      ]);
      
      setStats({
        patients: patientsRes.data.length,
        medecins: medecinsRes.data.length,
        rendezVous: rdvRes.data.length,
        factures: 12 // Temporaire - à remplacer par l'API
      });
    } catch (error) {
      console.error("Erreur chargement stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-5 fw-bold text-primary">Tableau de Bord</h1>
          <p className="lead text-muted">Vue d'ensemble de votre activité médicale</p>
        </div>
      </div>

      {/* Cartes de Statistiques */}
      <div className="row g-4 mb-5">
        <div className="col-xl-3 col-md-6">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-primary text-uppercase fw-bold">Patients</h6>
                  <h2 className="display-6 fw-bold text-dark">{stats.patients}</h2>
                </div>
                <div className="bg-primary rounded-3 p-3">
                  <i className="bi bi-people fs-2 text-white"></i>
                </div>
              </div>
              <Link to="/patients" className="btn btn-outline-primary btn-sm mt-3">
                Voir les patients
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-success text-uppercase fw-bold">Médecins</h6>
                  <h2 className="display-6 fw-bold text-dark">{stats.medecins}</h2>
                </div>
                <div className="bg-success rounded-3 p-3">
                  <i className="bi bi-heart-pulse fs-2 text-white"></i>
                </div>
              </div>
              <Link to="/medecins" className="btn btn-outline-success btn-sm mt-3">
                Voir les médecins
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-warning shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-warning text-uppercase fw-bold">Rendez-vous</h6>
                  <h2 className="display-6 fw-bold text-dark">{stats.rendezVous}</h2>
                </div>
                <div className="bg-warning rounded-3 p-3">
                  <i className="bi bi-calendar-check fs-2 text-white"></i>
                </div>
              </div>
              <Link to="/rendezvous" className="btn btn-outline-warning btn-sm mt-3">
                Voir les RDV
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-info shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title text-info text-uppercase fw-bold">Factures</h6>
                  <h2 className="display-6 fw-bold text-dark">{stats.factures}</h2>
                </div>
                <div className="bg-info rounded-3 p-3">
                  <i className="bi bi-receipt fs-2 text-white"></i>
                </div>
              </div>
              <Link to="/factures" className="btn btn-outline-info btn-sm mt-3">
                Voir les factures
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Actions Rapides</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <Link to="/patients" className="btn btn-outline-primary w-100 py-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-person-plus fs-4 me-3"></i>
                    <div className="text-start">
                      <div className="fw-bold">Nouveau Patient</div>
                      <small className="text-muted">Ajouter un patient</small>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link to="/rendezvous" className="btn btn-outline-warning w-100 py-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-calendar-plus fs-4 me-3"></i>
                    <div className="text-start">
                      <div className="fw-bold">Nouveau RDV</div>
                      <small className="text-muted">Planifier un rendez-vous</small>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card bg-primary text-white shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-graph-up-arrow fs-1 mb-3"></i>
              <h5>Performance</h5>
              <p className="mb-0">Votre établissement fonctionne à plein régime !</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;