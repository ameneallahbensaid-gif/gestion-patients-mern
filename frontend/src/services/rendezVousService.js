import api from './api';

const BASE_URL = '/rendezvous';

export const rendezVousService = {
  getAll: () => api.get(BASE_URL),
  getById: (id) => api.get(`${BASE_URL}/${id}`),
  create: (data) => api.post(BASE_URL, data),
  update: (id, data) => api.put(`${BASE_URL}/${id}`, data),
  delete: (id) => api.delete(`${BASE_URL}/${id}`),
  getByDate: (date) => api.get(`${BASE_URL}/date/${date}`),
  getByMedecin: (medecinId) => api.get(`${BASE_URL}/medecin/${medecinId}`),
  getByPatient: (patientId) => api.get(`${BASE_URL}/patient/${patientId}`),
  getToday: () => api.get(`${BASE_URL}/today`),
  getStats: () => api.get(`${BASE_URL}/stats`),
};

export default rendezVousService;