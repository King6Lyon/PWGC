// src/services/api.js
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api' // Ajuste selon ton backend
})

// Ajoute le token JWT sur chaque requête
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})

export default API
