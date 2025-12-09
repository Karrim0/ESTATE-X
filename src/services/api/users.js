// src/services/api/users.js

import apiClient, { apiCall } from "./client";
import { API_ENDPOINTS } from "../../data/constants";
import { mockUsers, getUserById } from "../../data/mockUsers";

// ==================== GET USER BY ID ====================
export const getUser = async (userId) => {
  const mockData = () => {
    const user = getUserById(userId);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    // Remove sensitive data
    const { password, ...safeUser } = user;
    return safeUser;
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.USERS}/${userId}`),
    mockData()
  );
};

// ==================== UPDATE USER PROFILE ====================
export const updateUserProfile = async (userId, updates) => {
  const mockData = () => {
    const user = getUserById(userId);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const updatedUser = { ...user, ...updates };
    const { password, ...safeUser } = updatedUser;

    return safeUser;
  };

  return apiCall(
    () => apiClient.patch(`${API_ENDPOINTS.USERS}/${userId}`, updates),
    mockData()
  );
};

// ==================== UPLOAD AVATAR ====================
export const uploadAvatar = async (userId, file) => {
  const mockData = () => {
    // Simulate avatar URL
    const avatarUrl = `https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&bold=true&size=200&timestamp=${Date.now()}`;

    return {
      message: "Avatar uploaded successfully",
      avatarUrl,
    };
  };

  const formData = new FormData();
  formData.append("avatar", file);

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.USERS}/${userId}/avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    mockData()
  );
};

// ==================== GET USER PROPERTIES ====================
export const getUserProperties = async (userId) => {
  const mockData = () => {
    // Mock: Return properties where seller ID matches
    return {
      properties: [],
      total: 0,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.USERS}/${userId}/properties`),
    mockData()
  );
};

// ==================== GET FAVORITES ====================
export const getFavorites = async (userId) => {
  const mockData = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    return {
      propertyIds: favorites,
      total: favorites.length,
    };
  };

  return apiCall(() => apiClient.get(`${API_ENDPOINTS.FAVORITES}`), mockData());
};

// ==================== ADD TO FAVORITES ====================
export const addToFavorites = async (propertyId) => {
  const mockData = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    return {
      message: "Added to favorites",
      favorites,
    };
  };

  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.FAVORITES}/${propertyId}`),
    mockData()
  );
};

// ==================== REMOVE FROM FAVORITES ====================
export const removeFromFavorites = async (propertyId) => {
  const mockData = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = favorites.filter((id) => id !== propertyId);
    localStorage.setItem("favorites", JSON.stringify(updated));

    return {
      message: "Removed from favorites",
      favorites: updated,
    };
  };

  return apiCall(
    () => apiClient.delete(`${API_ENDPOINTS.FAVORITES}/${propertyId}`),
    mockData()
  );
};

// ==================== GET SAVED SEARCHES ====================
export const getSavedSearches = async () => {
  const mockData = () => {
    const saved = JSON.parse(localStorage.getItem("saved_searches") || "[]");

    return {
      searches: saved,
      total: saved.length,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.SAVED_SEARCHES}`),
    mockData()
  );
};

// ==================== SAVE SEARCH ====================
export const saveSearch = async (searchData) => {
  const mockData = () => {
    const saved = JSON.parse(localStorage.getItem("saved_searches") || "[]");

    const newSearch = {
      id: Date.now(),
      ...searchData,
      createdAt: new Date().toISOString(),
      notificationsEnabled: true,
      matchCount: 0,
    };

    saved.push(newSearch);
    localStorage.setItem("saved_searches", JSON.stringify(saved));

    return {
      message: "Search saved successfully",
      search: newSearch,
    };
  };

  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.SAVED_SEARCHES}`, searchData),
    mockData()
  );
};

// ==================== DELETE SAVED SEARCH ====================
export const deleteSavedSearch = async (searchId) => {
  const mockData = () => {
    const saved = JSON.parse(localStorage.getItem("saved_searches") || "[]");
    const updated = saved.filter((s) => s.id !== searchId);
    localStorage.setItem("saved_searches", JSON.stringify(updated));

    return {
      message: "Saved search deleted",
      searchId,
    };
  };

  return apiCall(
    () => apiClient.delete(`${API_ENDPOINTS.SAVED_SEARCHES}/${searchId}`),
    mockData()
  );
};

// ==================== UPDATE SAVED SEARCH ====================
export const updateSavedSearch = async (searchId, updates) => {
  const mockData = () => {
    const saved = JSON.parse(localStorage.getItem("saved_searches") || "[]");
    const index = saved.findIndex((s) => s.id === searchId);

    if (index === -1) {
      throw { message: "Saved search not found", status: 404 };
    }

    saved[index] = { ...saved[index], ...updates };
    localStorage.setItem("saved_searches", JSON.stringify(saved));

    return {
      message: "Saved search updated",
      search: saved[index],
    };
  };

  return apiCall(
    () =>
      apiClient.patch(`${API_ENDPOINTS.SAVED_SEARCHES}/${searchId}`, updates),
    mockData()
  );
};

// ==================== GET USER STATS ====================
export const getUserStats = async (userId) => {
  const mockData = () => {
    return {
      propertiesViewed: 245,
      propertiesSaved: 28,
      offersSubmitted: 12,
      dealsCompleted: 3,
      auctionsBidOn: 7,
      auctionsWon: 2,
      totalSpent: 4500000,
      savedSearches: 5,
      alerts: 12,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.USERS}/${userId}/stats`),
    mockData()
  );
};

// ==================== GET USER NOTIFICATIONS ====================
export const getUserNotifications = async (params = {}) => {
  const mockData = () => {
    const notifications = [
      {
        id: 1,
        type: "new_property",
        title: "New property matches your criteria",
        message:
          "A luxury villa in Dubai matching your saved search is now available",
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        data: { propertyId: 7 },
      },
      {
        id: 2,
        type: "price_drop",
        title: "Price drop on saved property",
        message: "Downtown Penthouse price reduced by $50,000",
        read: false,
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        data: { propertyId: 2 },
      },
      {
        id: 3,
        type: "auction_ending",
        title: "Auction ending soon",
        message: "Beverly Hills Villa auction ends in 2 hours",
        read: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        data: { propertyId: 1 },
      },
    ];

    return {
      notifications,
      total: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
    };
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.NOTIFICATIONS}`, { params }),
    mockData()
  );
};

// ==================== MARK NOTIFICATION AS READ ====================
export const markNotificationAsRead = async (notificationId) => {
  const mockData = () => {
    return {
      message: "Notification marked as read",
      notificationId,
    };
  };

  return apiCall(
    () =>
      apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`),
    mockData()
  );
};

// ==================== MARK ALL NOTIFICATIONS AS READ ====================
export const markAllNotificationsAsRead = async () => {
  const mockData = () => {
    return {
      message: "All notifications marked as read",
    };
  };

  return apiCall(
    () => apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS}/read-all`),
    mockData()
  );
};

export default {
  getUser,
  updateUserProfile,
  uploadAvatar,
  getUserProperties,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getSavedSearches,
  saveSearch,
  deleteSavedSearch,
  updateSavedSearch,
  getUserStats,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
