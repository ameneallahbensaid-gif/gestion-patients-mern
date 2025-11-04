import axios from 'axios';

// Configuration de base axios
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes timeout
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter un token d'authentification si disponible
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });

    // Gestion centralisée des erreurs
    if (error.response?.status === 401) {
      // Rediriger vers la page de login si non autorisé
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (error.response?.status === 404) {
      console.warn('Ressource non trouvée');
    } else if (error.response?.status >= 500) {
      console.error('Erreur serveur');
    }

    return Promise.reject(error);
  }
);
// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.config?.data,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

// Service pour les Patients
export const patientService = {
  // Récupérer tous les patients
  getAll: () => api.get('/patients'),
  
  // Récupérer un patient par ID
  getById: (id) => api.get(`/patients/${id}`),
  
  // Créer un nouveau patient
  create: (data) => api.post('/patients', data),
  
  // Mettre à jour un patient
  update: (id, data) => api.put(`/patients/${id}`, data),
  
  // Supprimer un patient
  delete: (id) => api.delete(`/patients/${id}`),
  
  // Rechercher des patients
  search: (query) => api.get(`/patients/search?q=${query}`),
  
  // Statistiques des patients
  getStats: () => api.get('/patients/stats'),
};

// Service pour les Médecins
export const medecinService = {
  // Récupérer tous les médecins
  getAll: () => api.get('/medecins'),
  
  // Récupérer un médecin par ID
  getById: (id) => api.get(`/medecins/${id}`),
  
  // Créer un nouveau médecin
  create: (data) => api.post('/medecins', data),
  
  // Mettre à jour un médecin
  update: (id, data) => api.put(`/medecins/${id}`, data),
  
  // Supprimer un médecin
  delete: (id) => api.delete(`/medecins/${id}`),
  
  // Récupérer les médecins par spécialité
  getBySpecialite: (specialite) => api.get(`/medecins/specialite/${specialite}`),
  
  // Statistiques des médecins
  getStats: () => api.get('/medecins/stats'),
};

// Service pour les Rendez-vous
export const rendezVousService = {
  // Récupérer tous les rendez-vous
  getAll: () => api.get('/rendezvous'),
  
  // Récupérer un rendez-vous par ID
  getById: (id) => api.get(`/rendezvous/${id}`),
  
  // Créer un nouveau rendez-vous
  create: (data) => api.post('/rendezvous', data),
  
  // Mettre à jour un rendez-vous
  update: (id, data) => api.put(`/rendezvous/${id}`, data),
  
  // Supprimer un rendez-vous
  delete: (id) => api.delete(`/rendezvous/${id}`),
  
  // Récupérer les rendez-vous par date
  getByDate: (date) => api.get(`/rendezvous/date/${date}`),
  
  // Récupérer les rendez-vous par médecin
  getByMedecin: (medecinId) => api.get(`/rendezvous/medecin/${medecinId}`),
  
  // Récupérer les rendez-vous par patient
  getByPatient: (patientId) => api.get(`/rendezvous/patient/${patientId}`),
  
  // Rendez-vous du jour
  getToday: () => api.get('/rendezvous/today'),
  
  // Statistiques des rendez-vous
  getStats: () => api.get('/rendezvous/stats'),
};

// Service pour les Factures
export const factureService = {
  // Récupérer toutes les factures
  getAll: () => api.get('/factures'),
  
  // Récupérer une facture par ID
  getById: (id) => api.get(`/factures/${id}`),
  
  // Créer une nouvelle facture
  create: (data) => api.post('/factures', data),
  
  // Mettre à jour une facture
  update: (id, data) => api.put(`/factures/${id}`, data),
  
  // Supprimer une facture
  delete: (id) => api.delete(`/factures/${id}`),
  
  // Factures par patient
  getByPatient: (patientId) => api.get(`/factures/patient/${patientId}`),
  
  // Factures par statut
  getByStatut: (statut) => api.get(`/factures/statut/${statut}`),
  
  // Générer PDF
  generatePDF: (id) => api.get(`/factures/${id}/pdf`, { responseType: 'blob' }),
  
  // Statistiques des factures
  getStats: () => api.get('/factures/stats'),
};

// Service pour les Messages
export const messageService = {
  // Récupérer tous les messages
  getAll: () => api.get('/messages'),
  
  // Récupérer un message par ID
  getById: (id) => api.get(`/messages/${id}`),
  
  // Envoyer un message
  create: (data) => api.post('/messages', data),
  
  // Mettre à jour un message
  update: (id, data) => api.put(`/messages/${id}`, data),
  
  // Supprimer un message
  delete: (id) => api.delete(`/messages/${id}`),
  
  // Récupérer la conversation entre deux utilisateurs
  getConversation: (user1, user2) => api.get(`/messages/conversation/${user1}/${user2}`),
  
  // Marquer comme lu
  markAsRead: (id) => api.put(`/messages/${id}/read`),
  
  // Messages non lus
  getUnread: (userId) => api.get(`/messages/unread/${userId}`),
};

// Service pour l'Authentification
export const authService = {
  // Connexion
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Inscription
  register: (userData) => api.post('/auth/register', userData),
  
  // Déconnexion
  logout: () => api.post('/auth/logout'),
  
  // Rafraîchir le token
  refreshToken: () => api.post('/auth/refresh'),
  
  // Vérifier le token
  verify: () => api.get('/auth/verify'),
};

// Service pour les Statistiques Globales
export const statsService = {
  // Statistiques générales du dashboard
  getDashboardStats: () => api.get('/stats/dashboard'),
  
  // Statistiques mensuelles
  getMonthlyStats: (year, month) => api.get(`/stats/monthly/${year}/${month}`),
  
  // Statistiques annuelles
  getYearlyStats: (year) => api.get(`/stats/yearly/${year}`),
  
  // Top médecins
  getTopMedecins: () => api.get('/stats/top-medecins'),
  
  // Activité récente
  getRecentActivity: () => api.get('/stats/recent-activity'),
};

// Service pour les Uploads (fichiers, images)
export const uploadService = {
  // Upload d'image
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Upload de document
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Utilitaires API
export const apiUtils = {
  // Tester la connexion à l'API
  testConnection: () => api.get('/health'),
  
  // Obtenir la version de l'API
  getVersion: () => api.get('/version'),
  
  // Nettoyer les données avant envoi
  sanitizeData: (data) => {
    const sanitized = { ...data };
    // Supprimer les champs vides
    Object.keys(sanitized).forEach(key => {
      if (sanitized[key] === '' || sanitized[key] == null) {
        delete sanitized[key];
      }
    });
    return sanitized;
  },
  
  // Formater les dates pour l'API
  formatDateForAPI: (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
  },
};

// Export par défaut pour une utilisation directe
export default api;

// Hook personnalisé pour les appels API (optionnel - pour React)
export const useApi = () => {
  const callApi = async (apiCall, options = {}) => {
    const { onSuccess, onError, loadingState } = options;
    
    try {
      if (loadingState) loadingState(true);
      const response = await apiCall;
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (error) {
      console.error('API Call failed:', error);
      if (onError) onError(error);
      throw error;
    } finally {
      if (loadingState) loadingState(false);
    }
  };

  return { callApi };
};