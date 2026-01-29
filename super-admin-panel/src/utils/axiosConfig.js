import axios from "axios";
import { logout } from "./auth";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false, // JWT → no cookies
});

// ✅ Attach JWT from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global auth error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    const isAuthApi =
      url.includes("/auth/login") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/reset-password");

    if ((status === 401 || status === 403) && !isAuthApi) {
      logout();
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
