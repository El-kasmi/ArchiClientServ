import axios from 'axios';

// Utiliser l'adresse IP locale au lieu de localhost
const API_URL = 'http://127.0.0.1:5000/api/';

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ajouter des intercepteurs pour le débogage
apiClient.interceptors.request.use(
  config => {
    console.log('Requête envoyée:', config);
    return config;
  },
  error => {
    console.error('Erreur de requête:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('Réponse reçue:', response);
    return response;
  },
  error => {
    console.error('Erreur de réponse:', error);
    return Promise.reject(error);
  }
);

// Fonctions pour interagir avec l'API
export const taskService = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  // Récupérer une tâche spécifique
  getTaskById: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
      throw error;
    }
  },

  // Ajouter une nouvelle tâche
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  },

  // Modifier une tâche existante
  updateTask: async (id, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la modification de la tâche ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une tâche
  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la tâche ${id}:`, error);
      throw error;
    }
  }
};
