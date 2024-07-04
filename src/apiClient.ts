import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // ajusta la URL base según tu configuración
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes añadir otros headers necesarios para tu aplicación
  },
});

export default apiClient;
