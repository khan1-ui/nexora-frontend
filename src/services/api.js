import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just reject, do NOT show toast here
    return Promise.reject(error);
  }
);

export default api;
