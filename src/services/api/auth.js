// src/services/api/auth.js

import apiClient, { mockResponse, apiCall } from './client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../../data/constants';
import { authenticateUser, getUserByEmail } from '../../data/mockUsers';

// ==================== LOGIN ====================
export const login = async (email, password) => {
  const mockData = () => {
    const user = authenticateUser(email, password);
    
    if (!user) {
      throw { message: 'Invalid email or password', status: 401 };
    }
    
    const token = 'mock_jwt_token_' + Date.now();
    const refreshToken = 'mock_refresh_token_' + Date.now();
    
    return {
      user,
      token,
      refreshToken,
      message: 'Login successful'
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/login`, { email, password }),
    mockData()
  );
};

// ==================== REGISTER ====================
export const register = async (userData) => {
  const mockData = () => {
    // Check if email already exists
    const existingUser = getUserByEmail(userData.email);
    
    if (existingUser) {
      throw { message: 'Email already registered', status: 400 };
    }
    
    const newUser = {
      id: 'user_' + Date.now(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      phone: userData.phone,
      role: userData.role || 'buyer',
      avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=3b82f6&color=fff&bold=true&size=200`,
      verified: false,
      isPremium: false,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    const token = 'mock_jwt_token_' + Date.now();
    const refreshToken = 'mock_refresh_token_' + Date.now();
    
    return {
      user: newUser,
      token,
      refreshToken,
      message: 'Registration successful'
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/register`, userData),
    mockData()
  );
};

// ==================== LOGOUT ====================
export const logout = async () => {
  const mockData = () => {
    return {
      message: 'Logout successful'
    };
  };
  
  // Clear local storage
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/logout`),
    mockData()
  );
};

// ==================== REFRESH TOKEN ====================
export const refreshToken = async (refreshToken) => {
  const mockData = () => {
    return {
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/refresh`, { refreshToken }),
    mockData()
  );
};

// ==================== VERIFY EMAIL ====================
export const verifyEmail = async (token) => {
  const mockData = () => {
    return {
      message: 'Email verified successfully',
      verified: true
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/verify-email`, { token }),
    mockData()
  );
};

// ==================== FORGOT PASSWORD ====================
export const forgotPassword = async (email) => {
  const mockData = () => {
    return {
      message: 'Password reset email sent',
      email
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/forgot-password`, { email }),
    mockData()
  );
};

// ==================== RESET PASSWORD ====================
export const resetPassword = async (token, newPassword) => {
  const mockData = () => {
    return {
      message: 'Password reset successfully'
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/reset-password`, { token, newPassword }),
    mockData()
  );
};

// ==================== CHANGE PASSWORD ====================
export const changePassword = async (currentPassword, newPassword) => {
  const mockData = () => {
    return {
      message: 'Password changed successfully'
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.AUTH}/change-password`, { currentPassword, newPassword }),
    mockData()
  );
};

// ==================== GET CURRENT USER ====================
export const getCurrentUser = async () => {
  const mockData = () => {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    
    if (!userJson) {
      throw { message: 'Not authenticated', status: 401 };
    }
    
    return JSON.parse(userJson);
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.AUTH}/me`),
    mockData()
  );
};

// ==================== UPDATE PROFILE ====================
export const updateProfile = async (updates) => {
  const mockData = () => {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    
    if (!userJson) {
      throw { message: 'Not authenticated', status: 401 };
    }
    
    const user = JSON.parse(userJson);
    const updatedUser = { ...user, ...updates };
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    
    return updatedUser;
  };
  
  return apiCall(
    () => apiClient.patch(`${API_ENDPOINTS.AUTH}/profile`, updates),
    mockData()
  );
};

export default {
  login,
  register,
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile
};