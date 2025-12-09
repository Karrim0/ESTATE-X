// src/utils/auth.js

import { STORAGE_KEYS } from '../data/constants';

// ==================== JWT HELPERS ====================

/**
 * Decode JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token payload
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

/**
 * Get token expiry time
 * @param {string} token - JWT token
 * @returns {Date|null} Expiry date
 */
export const getTokenExpiry = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  
  return new Date(decoded.exp * 1000);
};

/**
 * Get time until token expires
 * @param {string} token - JWT token
 * @returns {number} Milliseconds until expiry
 */
export const getTimeUntilExpiry = (token) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return 0;
  
  return expiry.getTime() - Date.now();
};

// ==================== STORAGE HELPERS ====================

/**
 * Get stored auth token
 * @returns {string|null} Auth token
 */
export const getStoredToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error reading token from storage:', error);
    return null;
  }
};

/**
 * Get stored refresh token
 * @returns {string|null} Refresh token
 */
export const getStoredRefreshToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error reading refresh token from storage:', error);
    return null;
  }
};

/**
 * Get stored user data
 * @returns {Object|null} User data
 */
export const getStoredUser = () => {
  try {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error reading user from storage:', error);
    return null;
  }
};

/**
 * Store auth data
 * @param {string} token - Auth token
 * @param {string} refreshToken - Refresh token
 * @param {Object} user - User data
 */
export const storeAuthData = (token, refreshToken, user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

/**
 * Clear all auth data
 */
export const clearAuthData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// ==================== VALIDATION ====================

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  if (!token) return false;
  
  return !isTokenExpired(token);
};

/**
 * Get user role from token
 * @returns {string|null} User role
 */
export const getUserRole = () => {
  const user = getStoredUser();
  return user?.role || null;
};

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean} True if user has role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Check if user has any of the specified roles
 * @param {Array<string>} roles - Roles to check
 * @returns {boolean} True if user has any role
 */
export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};

/**
 * Check if user is admin
 * @returns {boolean} True if admin
 */
export const isAdmin = () => {
  return hasRole('admin');
};

/**
 * Check if user is agent
 * @returns {boolean} True if agent
 */
export const isAgent = () => {
  return hasRole('agent');
};

/**
 * Check if user is premium
 * @returns {boolean} True if premium
 */
export const isPremium = () => {
  const user = getStoredUser();
  return user?.isPremium || false;
};

// ==================== PERMISSIONS ====================

/**
 * Check if user has permission
 * @param {string} permission - Permission to check
 * @returns {boolean} True if has permission
 */
export const hasPermission = (permission) => {
  const role = getUserRole();
  
  if (role === 'admin') return true;
  
  const permissions = {
    agent: [
      'create_property',
      'edit_own_property',
      'delete_own_property',
      'view_analytics',
      'contact_leads'
    ],
    developer: [
      'create_property',
      'edit_own_property',
      'delete_own_property',
      'view_analytics',
      'bulk_upload',
      'manage_projects'
    ],
    buyer: [
      'view_properties',
      'save_properties',
      'make_offer',
      'bid_auction',
      'contact_sellers'
    ],
    seller: [
      'create_property',
      'edit_own_property',
      'delete_own_property',
      'view_inquiries'
    ]
  };
  
  return permissions[role]?.includes(permission) || false;
};

/**
 * Check if user can edit property
 * @param {Object} property - Property object
 * @returns {boolean} True if can edit
 */
export const canEditProperty = (property) => {
  const user = getStoredUser();
  
  if (!user || !property) return false;
  if (isAdmin()) return true;
  
  // Check if user owns the property
  return property.seller?.id === user.id;
};

/**
 * Check if user can delete property
 * @param {Object} property - Property object
 * @returns {boolean} True if can delete
 */
export const canDeleteProperty = (property) => {
  return canEditProperty(property);
};

// ==================== SESSION MANAGEMENT ====================

/**
 * Check if session is about to expire
 * @param {number} thresholdMinutes - Minutes before expiry
 * @returns {boolean} True if expiring soon
 */
export const isSessionExpiringSoon = (thresholdMinutes = 5) => {
  const token = getStoredToken();
  if (!token) return false;
  
  const timeUntilExpiry = getTimeUntilExpiry(token);
  const threshold = thresholdMinutes * 60 * 1000;
  
  return timeUntilExpiry > 0 && timeUntilExpiry < threshold;
};

/**
 * Get session info
 * @returns {Object} Session information
 */
export const getSessionInfo = () => {
  const token = getStoredToken();
  const user = getStoredUser();
  
  if (!token || !user) {
    return {
      isValid: false,
      user: null,
      expiresAt: null,
      timeRemaining: 0
    };
  }
  
  const expiresAt = getTokenExpiry(token);
  const timeRemaining = getTimeUntilExpiry(token);
  
  return {
    isValid: !isTokenExpired(token),
    user,
    expiresAt,
    timeRemaining,
    expiringSoon: isSessionExpiringSoon()
  };
};

// ==================== REDIRECT HELPERS ====================

/**
 * Get redirect URL after login
 * @returns {string} Redirect URL
 */
export const getRedirectAfterLogin = () => {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  
  // Validate redirect URL to prevent open redirect
  if (redirect && redirect.startsWith('/')) {
    return redirect;
  }
  
  const user = getStoredUser();
  
  // Default redirects based on role
  switch (user?.role) {
    case 'admin':
      return '/dashboard';
    case 'agent':
    case 'developer':
      return '/dashboard';
    case 'seller':
      return '/dashboard';
    default:
      return '/';
  }
};

/**
 * Get login URL with redirect
 * @param {string} redirectUrl - URL to redirect after login
 * @returns {string} Login URL with redirect param
 */
export const getLoginUrl = (redirectUrl) => {
  if (redirectUrl) {
    return `/login?redirect=${encodeURIComponent(redirectUrl)}`;
  }
  return '/login';
};

export default {
  decodeToken,
  isTokenExpired,
  getTokenExpiry,
  getTimeUntilExpiry,
  getStoredToken,
  getStoredRefreshToken,
  getStoredUser,
  storeAuthData,
  clearAuthData,
  isAuthenticated,
  getUserRole,
  hasRole,
  hasAnyRole,
  isAdmin,
  isAgent,
  isPremium,
  hasPermission,
  canEditProperty,
  canDeleteProperty,
  isSessionExpiringSoon,
  getSessionInfo,
  getRedirectAfterLogin,
  getLoginUrl
};