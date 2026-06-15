import axios from 'axios';

// Temel API URL yapılandırması
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Güvenlik Katmanı: Her istekten önce çalışır ve Token varsa başlığa (Header) ekler
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;