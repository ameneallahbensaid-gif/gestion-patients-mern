import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active fw-bold" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        {/* Brand avec icône */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <span className="fs-4 me-2">🏥</span>
          <span>Gestion Hospitalière</span>
        </Link>
        
        {/* Toggle button pour mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Menu de navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                <i className="bi bi-house me-1"></i>Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i>Tableau de Bord
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                 role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-gear me-1"></i>Gestion
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className={`dropdown-item ${isActive("/patients")}`} to="/patients">
                    <i className="bi bi-people me-2 text-primary"></i>Patients
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item ${isActive("/medecins")}`} to="/medecins">
                    <i className="bi bi-heart-pulse me-2 text-success"></i>Médecins
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className={`dropdown-item ${isActive("/rendezvous")}`} to="/rendezvous">
                    <i className="bi bi-calendar-check me-2 text-warning"></i>Rendez-vous
                  </Link>
                </li>
                <li>
                  <Link className={`dropdown-item ${isActive("/factures")}`} to="/factures">
                    <i className="bi bi-receipt me-2 text-info"></i>Factures
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;