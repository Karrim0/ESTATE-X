// src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { STORAGE_KEYS } from "../data/constants";
import * as authAPI from "../services/api/auth";
import { setAuthToken, removeAuthToken } from "../services/api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ==================== INITIALIZE AUTH ====================
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (token && storedUser) {
          setAuthToken(token);
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);

          // Verify token is still valid
          try {
            const currentUser = await authAPI.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // Token invalid, logout
            console.error("Token validation failed:", error);
            handleLogout();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ==================== LOGIN ====================
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);

      const response = await authAPI.login(email, password);

      if (response.token && response.user) {
        // Store token and user
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

        setAuthToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);

        return { success: true, user: response.user };
      }

      return { success: false, message: "Invalid response from server" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== REGISTER ====================
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);

      const response = await authAPI.register(userData);

      if (response.token && response.user) {
        // Store token and user
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

        setAuthToken(response.token);
        setUser(response.user);
        setIsAuthenticated(true);

        return { success: true, user: response.user };
      }

      return { success: false, message: "Invalid response from server" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.message || "Registration failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== LOGOUT ====================
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      handleLogout();
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // ==================== UPDATE USER ====================
  const updateUser = useCallback(async (updates) => {
    try {
      const updatedUser = await authAPI.updateProfile(updates);

      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        message: error.message || "Failed to update profile",
      };
    }
  }, []);

  // ==================== CHANGE PASSWORD ====================
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      await authAPI.changePassword(currentPassword, newPassword);
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error("Change password error:", error);
      return {
        success: false,
        message: error.message || "Failed to change password",
      };
    }
  }, []);

  // ==================== VERIFY EMAIL ====================
  const verifyEmail = useCallback(
    async (token) => {
      try {
        const response = await authAPI.verifyEmail(token);

        if (user) {
          const updatedUser = { ...user, verified: true };
          setUser(updatedUser);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
        }

        return { success: true, message: response.message };
      } catch (error) {
        console.error("Email verification error:", error);
        return {
          success: false,
          message: error.message || "Email verification failed",
        };
      }
    },
    [user]
  );

  // ==================== FORGOT PASSWORD ====================
  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await authAPI.forgotPassword(email);
      return { success: true, message: response.message };
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        message: error.message || "Failed to send reset email",
      };
    }
  }, []);

  // ==================== RESET PASSWORD ====================
  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      const response = await authAPI.resetPassword(token, newPassword);
      return { success: true, message: response.message };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: error.message || "Failed to reset password",
      };
    }
  }, []);

  // ==================== CHECK PERMISSION ====================
  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;

      // Admin has all permissions
      if (user.role === "admin") return true;

      // Define role-based permissions
      const permissions = {
        agent: ["create_property", "edit_own_property", "view_analytics"],
        developer: [
          "create_property",
          "edit_own_property",
          "view_analytics",
          "bulk_upload",
        ],
        buyer: ["view_properties", "save_properties", "make_offer"],
        seller: ["create_property", "edit_own_property"],
      };

      return permissions[user.role]?.includes(permission) || false;
    },
    [user]
  );

  // ==================== CHECK IF PREMIUM ====================
  const isPremium = useCallback(() => {
    return user?.isPremium || false;
  }, [user]);

  const value = {
    // State
    user,
    loading,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateUser,
    changePassword,
    verifyEmail,
    forgotPassword,
    resetPassword,

    // Helpers
    hasPermission,
    isPremium,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ==================== CUSTOM HOOK ====================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;
