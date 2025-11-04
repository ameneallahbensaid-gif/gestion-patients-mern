import React, { useEffect, useState } from "react";
import { medecinService } from "../services/api"; // Changement ici

function MedecinList({ refresh }) {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedecins();
  }, [refresh]);

  const fetchMedecins = async () => {
    try {
      setLoading(true);
      const res = await medecinService.getAll(); // Changement ici
      setMedecins(res.data);
    } catch (error) {
      console.error("Erreur chargement médecins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?")) {
      try {
        await medecinService.delete(id); // Changement ici
        fetchMedecins();
      } catch (error) {
        console.error("Erreur suppression médecin:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Chargement...</div>;
  }

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="card-title text-success mb-3">Liste des Médecins</h5>
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-success">
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map((m) => (
            <tr key={m._id}>
              <td>{m.nom}</td>
              <td>{m.specialite}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>
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

export default MedecinList;