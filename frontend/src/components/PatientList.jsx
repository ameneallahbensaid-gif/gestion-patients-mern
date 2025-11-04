import React, { useEffect, useState } from "react";
import { patientService } from "../services/api"; // Changement ici

function PatientList({ refresh, searchTerm }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, [refresh]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await patientService.getAll(); // Changement ici
      setPatients(res.data);
    } catch (error) {
      console.error("Erreur chargement patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        await patientService.delete(id); // Changement ici
        fetchPatients();
      } catch (error) {
        console.error("Erreur suppression patient:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Chargement...</div>;
  }

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="card-title text-primary mb-3">Liste des Patients</h5>
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-primary">
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.nom}</td>
              <td>{p.prenom}</td>
              <td>{p.telephone}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;