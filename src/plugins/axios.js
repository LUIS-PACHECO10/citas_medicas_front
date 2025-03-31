// src/api/axios.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Lee la URL desde .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Tiempo máximo de espera
});

export default apiClient;
