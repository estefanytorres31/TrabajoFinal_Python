import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://trabajofinal-python.onrender.com', // sin /api si no lo usas en tus rutas
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
