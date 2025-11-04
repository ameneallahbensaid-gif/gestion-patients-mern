import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import MedecinsPage from "./pages/MedecinsPage";
import RendezVousPage from "./pages/RendezVousPage";
import FacturesPage from "./pages/FacturesPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="App min-vh-100 bg-light">
        <Navbar />
        <main className="pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/medecins" element={<MedecinsPage />} />
            <Route path="/rendezvous" element={<RendezVousPage />} />
            <Route path="/factures" element={<FacturesPage />} />
          </Routes>
        </main>
        
        {/* Footer Bootstrap */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">&copy; 2024 Gestion Hospitalière. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;