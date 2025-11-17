import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Recommendation API calls
export const recommendationAPI = {
  // Create new recommendation from audio
  create: async (audioFile, userId = "default") => {
    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("userId", userId);

    return api.post("/recommendations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Get recommendation history
  getHistory: async (userId = "default", limit = 10) => {
    return api.get("/recommendations", {
      params: { userId, limit },
    });
  },

  // Get single recommendation by ID
  getById: async (id) => {
    return api.get(`/recommendations/${id}`);
  },

  // Delete recommendation by ID
  delete: async (id) => {
    return api.delete(`/recommendations/${id}`);
  },
};

// Instruction API calls
export const instructionAPI = {
  // Get all instructions
  getAll: async (userId = "default") => {
    return api.get("/instructions", {
      params: { userId },
    });
  },

  // Get active instruction
  getActive: async (userId = "default") => {
    return api.get("/instructions/active", {
      params: { userId },
    });
  },

  // Create new instruction
  create: async (instructionData) => {
    return api.post("/instructions", instructionData);
  },

  // Update instruction
  update: async (id, instructionData) => {
    return api.put(`/instructions/${id}`, instructionData);
  },

  // Delete instruction
  delete: async (id) => {
    return api.delete(`/instructions/${id}`);
  },
};

// Health check
export const healthCheck = async () => {
  return api.get("/health");
};

export default api;
