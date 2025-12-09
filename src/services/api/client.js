// src/services/api/client.js

import axios from "axios";
import { API_ENDPOINTS, STORAGE_KEYS } from "../../data/constants";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          const response = await axios.post(
            `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH}/refresh`,
            { refreshToken }
          );

          const { token, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Helper functions
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

export const removeAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Mock mode helper (for development without backend)
export const useMockMode = import.meta.env.VITE_USE_MOCK_API === "true";

// Mock response wrapper
export const mockResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, success: true });
    }, delay);
  });
};

// API call with automatic mock fallback
export const apiCall = async (apiFunction, mockData) => {
  if (useMockMode) {
    return mockResponse(mockData);
  }

  try {
    return await apiFunction();
  } catch (error) {
    console.error("API call failed:", error);

    // Fallback to mock data if available
    if (mockData) {
      console.warn("Using mock data as fallback");
      return mockResponse(mockData);
    }

    throw error;
  }
};

export default apiClient;
