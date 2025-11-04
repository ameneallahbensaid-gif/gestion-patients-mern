import React, { useState, useEffect } from "react";
import { rendezVousService } from "../services/api";
import { patientService, medecinService } from "../services/api";

function RendezVousForm({ onAdd }) {
  const [formData, setFormData] = useState({
    patient: "",
    medecin: "",
    date: "",
    heure: "",
    motif: "",
    type: "consultation"
  });
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSelectData();
  }, []);

  const fetchSelectData = async () => {
    try {
      const [patientsRes, medecinsRes] = await Promise.all([
        patientService.getAll(),
        medecinService.getAll()
      ]);
      setPatients(patientsRes.data);
      setMedecins(medecinsRes.data);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Combiner date et heure
      const dateTime = `${formData.date}T${formData.heure}`;
      const submitData = {
        ...formData,
        date: dateTime
      };
      
      await rendezVousService.create(submitData);
      setFormData({ patient: "", medecin: "", date: "", heure: "", motif: "", type: "consultation" });
      onAdd();
    } catch (error) {
      alert("Erreur lors de la création du rendez-vous");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-warning shadow-sm">
      <div className="card-header bg-warning text-white">
        <h5 className="card-title mb-0">
          <i className="bi bi-calendar-plus me-2"></i>
          Nouveau Rendez-vous
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold">Patient</label>
              <select 
                className="form-select"
                name="patient"
                value={formData.patient}
                onChange={(e) => setFormData({...formData, patient: e.target.value})}
                required
              >
                <option value="">Sélectionner un patient</option>
                {patients.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.prenom} {p.nom} - {p.telephone}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-12">
              <label className="form-label fw-semibold">Médecin</label>
              <select 
                className="form-select"
                name="medecin"
                value={formData.medecin}
                onChange={(e) => setFormData({...formData, medecin: e.target.value})}
                required
              >
                <option value="">Sélectionner un médecin</option>
                {medecins.map(m => (
                  <option key={m._id} value={m._id}>
                    Dr. {m.nom} - {m.specialite}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Date</label>
              <input 
                type="date" 
                className="form-control"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Heure</label>
              <input 
                type="time" 
                className="form-control"
                name="heure"
                value={formData.heure}
                onChange={(e) => setFormData({...formData, heure: e.target.value})}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Type de consultation</label>
              <select 
                className="form-select"
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="consultation">Consultation standard</option>
                <option value="urgence">Urgence</option>
                <option value="controle">Contrôle</option>
                <option value="operation">Opération</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold">Motif</label>
              <textarea 
                className="form-control"
                name="motif"
                value={formData.motif}
                onChange={(e) => setFormData({...formData, motif: e.target.value})}
                rows="3"
                placeholder="Décrivez le motif de la consultation..."
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-warning w-100 mt-3 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Programmation...
              </>
            ) : (
              <>
                <i className="bi bi-calendar-check me-2"></i>
                Programmer le Rendez-vous
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RendezVousForm;