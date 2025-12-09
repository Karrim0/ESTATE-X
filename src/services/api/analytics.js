// src/services/api/analytics.js

import apiClient, { apiCall } from './client';
import { API_ENDPOINTS } from '../../data/constants';
import * as mockAnalytics from '../../data/mockAnalytics';

// ==================== GET MARKET TRENDS ====================
export const getMarketTrends = async (params = {}) => {
  const mockData = () => {
    return mockAnalytics.getMarketTrends();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/market-trends`, { params }),
    mockData()
  );
};

// ==================== GET PROPERTY PERFORMANCE ====================
export const getPropertyPerformance = async (propertyId = null, timeRange = '6m') => {
  const mockData = () => {
    if (propertyId) {
      // Return performance for specific property
      return {
        propertyId,
        data: mockAnalytics.getPropertyPerformance()
      };
    }
    
    // Return overall performance
    return mockAnalytics.getPropertyPerformance();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/performance`, {
      params: { propertyId, timeRange }
    }),
    mockData()
  );
};

// ==================== GET REVENUE DATA ====================
export const getRevenueData = async (timeRange = '6m') => {
  const mockData = () => {
    return mockAnalytics.getRevenueData();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/revenue`, {
      params: { timeRange }
    }),
    mockData()
  );
};

// ==================== GET PROPERTY TYPE DISTRIBUTION ====================
export const getPropertyTypeDistribution = async () => {
  const mockData = () => {
    return mockAnalytics.getPropertyTypeDistribution();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/property-types`),
    mockData()
  );
};

// ==================== GET TOP LOCATIONS ====================
export const getTopLocations = async (limit = 10) => {
  const mockData = () => {
    return mockAnalytics.getTopLocations().slice(0, limit);
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/top-locations`, {
      params: { limit }
    }),
    mockData()
  );
};

// ==================== GET PRICE RANGE DISTRIBUTION ====================
export const getPriceRangeDistribution = async () => {
  const mockData = () => {
    return mockAnalytics.getPriceRangeDistribution();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/price-ranges`),
    mockData()
  );
};

// ==================== GET AGENT PERFORMANCE ====================
export const getAgentPerformance = async () => {
  const mockData = () => {
    return mockAnalytics.getAgentPerformance();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/agent-performance`),
    mockData()
  );
};

// ==================== GET CONVERSION FUNNEL ====================
export const getConversionFunnel = async (timeRange = '30d') => {
  const mockData = () => {
    return mockAnalytics.getConversionFunnel();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/conversion-funnel`, {
      params: { timeRange }
    }),
    mockData()
  );
};

// ==================== GET USER ENGAGEMENT ====================
export const getUserEngagement = async () => {
  const mockData = () => {
    return mockAnalytics.getUserEngagement();
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/user-engagement`),
    mockData()
  );
};

// ==================== GET SEARCH TRENDS ====================
export const getSearchTrends = async (limit = 10) => {
  const mockData = () => {
    return mockAnalytics.getSearchTrends().slice(0, limit);
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/search-trends`, {
      params: { limit }
    }),
    mockData()
  );
};

// ==================== GET DASHBOARD SUMMARY ====================
export const getDashboardSummary = async () => {
  const mockData = () => {
    return {
      totalProperties: 1247,
      activeListings: 892,
      totalViews: 45620,
      savedProperties: 234,
      conversionRate: 12.4,
      avgPrice: 2450000,
      trends: {
        properties: 8.2,
        views: 15.3,
        saved: -2.4,
        conversion: 3.1
      },
      recentActivity: [
        {
          id: 1,
          type: 'view',
          property: 'Luxury Villa in Beverly Hills',
          time: '2m ago'
        },
        {
          id: 2,
          type: 'saved',
          property: 'Downtown Penthouse',
          time: '15m ago'
        },
        {
          id: 3,
          type: 'inquiry',
          property: 'Beachfront Bungalow',
          time: '1h ago'
        }
      ]
    };
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/dashboard`),
    mockData()
  );
};

// ==================== GET COMPARATIVE MARKET ANALYSIS ====================
export const getComparativeMarketAnalysis = async (propertyId) => {
  const mockData = () => {
    return {
      propertyId,
      estimatedValue: 1450000,
      confidenceLevel: 85,
      comparables: [
        {
          id: 2,
          title: 'Similar Property 1',
          price: 1420000,
          similarity: 92,
          location: 'Nearby',
          soldDate: '2024-05-15'
        },
        {
          id: 3,
          title: 'Similar Property 2',
          price: 1480000,
          similarity: 88,
          location: 'Same Area',
          soldDate: '2024-04-20'
        }
      ],
      marketConditions: {
        daysOnMarket: 28,
        pricePerSqft: 645,
        appreciation: 8.2
      }
    };
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/cma/${propertyId}`),
    mockData()
  );
};

// ==================== TRACK EVENT ====================
export const trackEvent = async (eventType, eventData) => {
  const mockData = () => {
    return {
      message: 'Event tracked successfully',
      eventType,
      timestamp: new Date().toISOString()
    };
  };
  
  return apiCall(
    () => apiClient.post(`${API_ENDPOINTS.ANALYTICS}/track`, {
      eventType,
      eventData,
      timestamp: new Date().toISOString()
    }),
    mockData()
  );
};

// ==================== GET PROPERTY INSIGHTS ====================
export const getPropertyInsights = async (propertyId) => {
  const mockData = () => {
    return {
      propertyId,
      insights: {
        viewTrend: 'increasing',
        viewGrowth: 23.5,
        avgTimeOnPage: '4m 32s',
        bounceRate: 28.4,
        popularTimes: {
          weekday: '6PM - 9PM',
          weekend: '10AM - 2PM'
        },
        demographics: {
          age: { '25-34': 35, '35-44': 40, '45-54': 20, '55+': 5 },
          income: { 'high': 60, 'medium': 30, 'low': 10 }
        },
        competitivePosition: {
          pricingVsMarket: 'competitive',
          demandLevel: 'high',
          recommendation: 'maintain_price'
        }
      }
    };
  };
  
  return apiCall(
    () => apiClient.get(`${API_ENDPOINTS.ANALYTICS}/property/${propertyId}/insights`),
    mockData()
  );
};

export default {
  getMarketTrends,
  getPropertyPerformance,
  getRevenueData,
  getPropertyTypeDistribution,
  getTopLocations,
  getPriceRangeDistribution,
  getAgentPerformance,
  getConversionFunnel,
  getUserEngagement,
  getSearchTrends,
  getDashboardSummary,
  getComparativeMarketAnalysis,
  trackEvent,
  getPropertyInsights
};