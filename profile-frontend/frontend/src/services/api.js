import axios from "axios";

// ==============================
// API URLs
// ==============================

const PROFILE_API = "http://127.0.0.1:8005/api/profile";
const AUTH_API = "http://127.0.0.1:8000/api/auth";

// ==============================
// Axios Instance
// ==============================

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// Add JWT Token Automatically
// ==============================

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==============================
// Profile APIs
// ==============================

// Get Logged-in User Profile
export const getProfile = () => {
  return api.get(`${PROFILE_API}/me/`);
};

// Update Profile
export const updateProfile = (data) => {
  return api.put(`${PROFILE_API}/update/`, data);
};

// Upload Profile Image
export const uploadProfileImage = (formData) => {
  return api.put(`${PROFILE_API}/upload-image/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ==============================
// Auth APIs
// ==============================

// Get Logged-in User Details
export const getUser = () => {
  return api.get(`${AUTH_API}/me/`);
};

// Change Password
export const changePassword = (data) => {
  return api.put(`${AUTH_API}/change-password/`, data);
};

export default api;
