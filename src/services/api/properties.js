// src/services/api/properties.js

import apiClient, { apiCall } from "./client";
import { API_ENDPOINTS } from "../../data/constants";
import { properties, getPropertyById } from "../../data/mockData";

// ==================== GET ALL PROPERTIES ====================
export const getProperties = async (params = {}) => {
  const mockData = () => {
    let filteredProperties = [...properties];

    // Apply filters
    if (params.country) {
      filteredProperties = filteredProperties.filter(
        (p) => p.country === params.country
      );
    }
    if (params.city) {
      filteredProperties = filteredProperties.filter(
        (p) => p.city === params.city
      );
    }
    if (params.type) {
      filteredProperties = filteredProperties.filter(
        (p) => p.type === params.type
      );
    }
    if (params.minPrice) {
      filteredProperties = filteredProperties.filter(
        (p) => p.price >= parseFloat(params.minPrice)
      );
    }
    if (params.maxPrice) {
      filteredProperties = filteredProperties.filter(
        (p) => p.price <= parseFloat(params.maxPrice)
      );
    }
    if (params.beds) {
      filteredProperties = filteredProperties.filter(
        (p) => p.beds >= parseInt(params.beds)
      );
    }
    if (params.baths) {
      filteredProperties = filteredProperties.filter(
        (p) => p.baths >= parseInt(params.baths)
      );
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredProperties = filteredProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.country.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (params.sort) {
      switch (params.sort) {
        case "price-low":
          filteredProperties.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProperties.sort((a, b) => b.price - a.price);
          break;
        case "popular":
          filteredProperties.sort((a, b) => (b.views || 0) - (a.views || 0));
          break;
        case "newest":
        default:
          filteredProperties.sort(
            (a, b) => new Date(b.listedAt) - new Date(a.listedAt)
          );
      }
    }

    // Apply pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      properties: filteredProperties.slice(startIndex, endIndex),
      total: filteredProperties.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProperties.length / limit),
    };
  };

  return apiCall(
    () => apiClient.get(API_ENDPOINTS.PROPERTIES, { params }),
    mockData()
  );
};

// ==================== GET SINGLE PROPERTY ====================
export const getProperty = async (id) => {
  const mockData = () => {
    const property = getPropertyById(id);

    if (!property) {
      throw { message: "Property not found", status: 404 };
    }

    return property;
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.PROPERTIES}/${id}`),
    mockData()
  );
};

// ==================== CREATE PROPERTY ====================
export const createProperty = async (propertyData) => {
  const mockData = () => {
    const newProperty = {
      id: Date.now(),
      ...propertyData,
      listedAt: new Date().toISOString(),
      views: 0,
      rating: 0,
      status: "available",
    };

    return newProperty;
  };

  return apiCall(
    () => apiClient.post(API_ENDPOINTS.PROPERTIES, propertyData),
    mockData()
  );
};

// ==================== UPDATE PROPERTY ====================
export const updateProperty = async (id, updates) => {
  const mockData = () => {
    const property = getPropertyById(id);

    if (!property) {
      throw { message: "Property not found", status: 404 };
    }

    return { ...property, ...updates };
  };

  return apiCall(
    () => apiClient.patch(`${API_ENDPOINTS.PROPERTIES}/${id}`, updates),
    mockData()
  );
};

// ==================== DELETE PROPERTY ====================
export const deleteProperty = async (id) => {
  const mockData = () => {
    return {
      message: "Property deleted successfully",
      id,
    };
  };

  return apiCall(
    () => apiClient.delete(`${API_ENDPOINTS.PROPERTIES}/${id}`),
    mockData()
  );
};

// ==================== GET FEATURED PROPERTIES ====================
export const getFeaturedProperties = async () => {
  const mockData = () => {
    return properties.filter((p) => p.featured);
  };

  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.PROPERTIES}/featured`),
    mockData()
  );
};

// ==================== GET SIMILAR PROPERTIES ====================
export const getSimilarProperties = async (id, limit = 4) => {
  const mockData = () => {
    const property = getPropertyById(id);

    if (!property) {
      return [];
    }

    // Find similar properties based on type, location, and price range
    const similar = properties
      .filter(
        (p) =>
          p.id !== property.id &&
          p.type === property.type &&
          p.country === property.country &&
          Math.abs(p.price - property.price) < property.price * 0.3
      )
      .slice(0, limit);

    return similar;
  };

  return apiCall(
    () =>
      apiClient.get(`${API_ENDPOINTS.PROPERTIES}/${id}/similar`, {
        params: { limit },
      }),
    mockData()
  );
};

// ==================== SEARCH PROPERTIES ====================
export const searchProperties = async (query, filters = {}) => {
  return getProperties({ ...filters, search: query });
};

// ==================== INCREMENT VIEW COUNT ====================
export const incrementViews = async (id) => {
  const mockData = () => {
    const property = getPropertyById(id);

    if (property) {
      property.views = (property.views || 0) + 1;
    }

    return { views: property?.views || 0 };
  };

  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.PROPERTIES}/${id}/view`),
    mockData()
  );
};

// ==================== SCHEDULE TOUR ====================
export const scheduleTour = async (propertyId, tourData) => {
  const mockData = () => {
    return {
      message: "Tour scheduled successfully",
      tour: {
        id: Date.now(),
        propertyId,
        ...tourData,
        status: "scheduled",
        createdAt: new Date().toISOString(),
      },
    };
  };

  return apiCall(
    () =>
      apiClient.post(
        `${API_ENDPOINTS.PROPERTIES}/${propertyId}/schedule-tour`,
        tourData
      ),
    mockData()
  );
};

// ==================== CONTACT SELLER ====================
export const contactSeller = async (propertyId, message) => {
  const mockData = () => {
    return {
      message: "Message sent successfully",
      messageId: Date.now(),
    };
  };

  return apiCall(
    () =>
      apiClient.post(`${API_ENDPOINTS.PROPERTIES}/${propertyId}/contact`, {
        message,
      }),
    mockData()
  );
};

// ==================== MAKE OFFER ====================
export const makeOffer = async (propertyId, offerData) => {
  const mockData = () => {
    return {
      message: "Offer submitted successfully",
      offer: {
        id: Date.now(),
        propertyId,
        ...offerData,
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    };
  };

  return apiCall(
    () =>
      apiClient.post(
        `${API_ENDPOINTS.PROPERTIES}/${propertyId}/offer`,
        offerData
      ),
    mockData()
  );
};

export default {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getSimilarProperties,
  searchProperties,
  incrementViews,
  scheduleTour,
  contactSeller,
  makeOffer,
};
