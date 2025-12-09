// src/data/mockUsers.js

import { USER_ROLES } from './constants';

export const mockUsers = [
  {
    id: 'user_1',
    email: 'john.smith@example.com',
    password: 'password123', // In production, this would be hashed
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    phone: '+1-555-0123',
    role: USER_ROLES.BUYER,
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Smith Investments LLC',
    bio: 'Professional real estate investor with 10+ years of experience in commercial properties.',
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060]
    },
    joinedAt: '2023-01-15T10:00:00Z',
    lastActive: new Date().toISOString(),
    preferences: {
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      searchAlerts: true
    },
    stats: {
      propertiesViewed: 245,
      propertiesSaved: 28,
      offersSubmitted: 12,
      dealsCompleted: 3
    }
  },
  {
    id: 'user_2',
    email: 'sarah.johnson@realty.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Johnson',
    phone: '+1-555-0124',
    role: USER_ROLES.AGENT,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Premium Realty Group',
    license: 'RE-2023-NY-45678',
    bio: 'Top-rated real estate agent specializing in luxury properties in Manhattan and Brooklyn.',
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: [40.7589, -73.9851]
    },
    joinedAt: '2022-06-20T14:30:00Z',
    lastActive: new Date().toISOString(),
    rating: 4.9,
    reviewsCount: 156,
    stats: {
      propertiesListed: 87,
      propertiesSold: 64,
      totalSalesVolume: 45600000,
      activeListings: 23,
      clientsServed: 142
    }
  },
  {
    id: 'user_3',
    email: 'ahmed.hassan@example.com',
    password: 'password123',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    fullName: 'Ahmed Hassan',
    phone: '+20-100-123-4567',
    role: USER_ROLES.BUYER,
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=8b5cf6&color=fff&bold=true&size=200',
    verified: true,
    isPremium: false,
    company: null,
    bio: 'Looking for investment opportunities in New Cairo and North Coast.',
    location: {
      city: 'Cairo',
      country: 'Egypt',
      coordinates: [30.0444, 31.2357]
    },
    joinedAt: '2024-01-10T09:15:00Z',
    lastActive: new Date().toISOString(),
    preferences: {
      currency: 'EGP',
      notifications: {
        email: true,
        push: true,
        sms: true
      },
      searchAlerts: true
    },
    stats: {
      propertiesViewed: 89,
      propertiesSaved: 12,
      offersSubmitted: 3,
      dealsCompleted: 0
    }
  },
  {
    id: 'user_4',
    email: 'mohammed.alfarsi@properties.ae',
    password: 'password123',
    firstName: 'Mohammed',
    lastName: 'Al Farsi',
    fullName: 'Mohammed Al Farsi',
    phone: '+971-50-123-4567',
    role: USER_ROLES.DEVELOPER,
    avatar: 'https://ui-avatars.com/api/?name=Mohammed+AlFarsi&background=f59e0b&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Emirates Property Development',
    license: 'DEV-2023-DXB-12345',
    bio: 'Leading property developer in Dubai with focus on sustainable luxury developments.',
    location: {
      city: 'Dubai',
      country: 'UAE',
      coordinates: [25.2048, 55.2708]
    },
    joinedAt: '2021-03-05T08:00:00Z',
    lastActive: new Date().toISOString(),
    rating: 4.8,
    reviewsCount: 234,
    stats: {
      projectsCompleted: 12,
      projectsActive: 5,
      unitsDelivered: 1247,
      totalInvestment: 890000000
    }
  },
  {
    id: 'user_5',
    email: 'emily.chen@luxury.com',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Chen',
    fullName: 'Emily Chen',
    phone: '+1-555-0125',
    role: USER_ROLES.AGENT,
    avatar: 'https://ui-avatars.com/api/?name=Emily+Chen&background=ec4899&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Luxury Estates International',
    license: 'RE-2023-CA-98765',
    bio: 'Specializing in high-end properties in Beverly Hills and Malibu. 15+ years of experience.',
    location: {
      city: 'Los Angeles',
      country: 'USA',
      coordinates: [34.0522, -118.2437]
    },
    joinedAt: '2020-08-12T11:00:00Z',
    lastActive: new Date().toISOString(),
    rating: 5.0,
    reviewsCount: 89,
    stats: {
      propertiesListed: 156,
      propertiesSold: 142,
      totalSalesVolume: 287000000,
      activeListings: 14,
      clientsServed: 178
    }
  },
  {
    id: 'user_6',
    email: 'david.martinez@commercial.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Martinez',
    fullName: 'David Martinez',
    phone: '+1-555-0126',
    role: USER_ROLES.BUYER,
    avatar: 'https://ui-avatars.com/api/?name=David+Martinez&background=ef4444&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Martinez Commercial Realty',
    bio: 'Commercial real estate investor focused on retail and office spaces.',
    location: {
      city: 'Miami',
      country: 'USA',
      coordinates: [25.7617, -80.1918]
    },
    joinedAt: '2023-05-20T13:45:00Z',
    lastActive: new Date().toISOString(),
    preferences: {
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        sms: true
      },
      searchAlerts: true
    },
    stats: {
      propertiesViewed: 312,
      propertiesSaved: 45,
      offersSubmitted: 18,
      dealsCompleted: 7
    }
  },
  {
    id: 'user_7',
    email: 'admin@estatepro.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    phone: '+1-555-0000',
    role: USER_ROLES.ADMIN,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff&bold=true&size=200',
    verified: true,
    isPremium: true,
    company: 'Estate PRO',
    bio: 'Platform administrator',
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060]
    },
    joinedAt: '2020-01-01T00:00:00Z',
    lastActive: new Date().toISOString(),
    preferences: {
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      searchAlerts: false
    }
  }
];

// Helper functions
export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email) => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getAgents = () => {
  return mockUsers.filter(user => user.role === USER_ROLES.AGENT);
};

export const getDevelopers = () => {
  return mockUsers.filter(user => user.role === USER_ROLES.DEVELOPER);
};

export const authenticateUser = (email, password) => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export default mockUsers;