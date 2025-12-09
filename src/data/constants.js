// src/data/constants.js

// ==================== CURRENCIES ====================
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  EGP: { symbol: 'ج.م', name: 'Egyptian Pound', rate: 50.5 },
  SAR: { symbol: 'ر.س', name: 'Saudi Riyal', rate: 3.75 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 }
};

// ==================== PROPERTY TYPES ====================
export const PROPERTY_TYPES = {
  SALE: 'Sale',
  RENT: 'Rent',
  AUCTION: 'Auction'
};

export const PROPERTY_CATEGORIES = {
  RESIDENTIAL: 'Residential',
  COMMERCIAL: 'Commercial',
  INDUSTRIAL: 'Industrial',
  LAND: 'Land',
  MIXED_USE: 'Mixed Use'
};

// ==================== PROPERTY STATUS ====================
export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SOLD: 'sold',
  RENTED: 'rented',
  OFF_MARKET: 'off_market'
};

// ==================== AMENITIES ====================
export const AMENITIES = [
  'Private Pool',
  'Garden View',
  'Sea View',
  'Mountain View',
  'City View',
  'Free Wi-Fi',
  'Central A/C',
  'Central Heating',
  'Smart Home',
  'Security System',
  '24/7 Security',
  'CCTV',
  'Gym',
  'Spa',
  'Sauna',
  'Jacuzzi',
  'Parking',
  'Garage',
  'EV Charging',
  'Elevator',
  'Balcony',
  'Terrace',
  'Rooftop',
  'Basement',
  'Storage',
  'Laundry Room',
  'Maid\'s Room',
  'Guest Room',
  'Home Office',
  'Library',
  'Wine Cellar',
  'Pet Friendly',
  'Kids Play Area',
  'BBQ Area',
  'Outdoor Kitchen',
  'Tennis Court',
  'Basketball Court',
  'Golf Course',
  'Beach Access',
  'Marina Access',
  'Concierge',
  'Doorman',
  'Valet Parking',
  'Business Center',
  'Conference Room',
  'Restaurant',
  'Cafe',
  'Shopping Mall',
  'School Nearby',
  'Hospital Nearby',
  'Metro Station',
  'Bus Stop',
  'Airport Nearby'
];

// ==================== LOCATIONS ====================
export const COUNTRIES = {
  USA: 'USA',
  EGYPT: 'Egypt',
  UAE: 'UAE',
  SAUDI_ARABIA: 'Saudi Arabia',
  UK: 'UK',
  FRANCE: 'France',
  GERMANY: 'Germany',
  SPAIN: 'Spain',
  ITALY: 'Italy',
  TURKEY: 'Turkey'
};

export const LOCATIONS = {
  USA: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Denver', 'Las Vegas'],
  Egypt: ['Cairo', 'New Cairo', 'Alexandria', 'Giza', '6th October', 'Sheikh Zayed', 'New Capital', 'North Coast', 'Sharm El Sheikh', 'El Gouna', 'Hurghada', 'Ain Sokhna'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran', 'Taif', 'Abha'],
  UK: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Bristol', 'Leeds'],
  France: ['Paris', 'Lyon', 'Marseille', 'Nice', 'Bordeaux', 'Cannes', 'Monaco'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'],
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Marbella', 'Ibiza'],
  Italy: ['Rome', 'Milan', 'Venice', 'Florence', 'Naples', 'Turin'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bodrum', 'Bursa']
};

// ==================== FILTERS ====================
export const PRICE_RANGES = [
  { label: 'Under $100K', min: 0, max: 100000 },
  { label: '$100K - $250K', min: 100000, max: 250000 },
  { label: '$250K - $500K', min: 250000, max: 500000 },
  { label: '$500K - $1M', min: 500000, max: 1000000 },
  { label: '$1M - $2M', min: 1000000, max: 2000000 },
  { label: '$2M - $5M', min: 2000000, max: 5000000 },
  { label: '$5M+', min: 5000000, max: Infinity }
];

export const BEDROOM_OPTIONS = [
  { label: 'Studio', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
  { label: '6+', value: 6 }
];

export const BATHROOM_OPTIONS = [
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 }
];

export const SQFT_RANGES = [
  { label: 'Under 500', min: 0, max: 500 },
  { label: '500 - 1000', min: 500, max: 1000 },
  { label: '1000 - 1500', min: 1000, max: 1500 },
  { label: '1500 - 2000', min: 1500, max: 2000 },
  { label: '2000 - 3000', min: 2000, max: 3000 },
  { label: '3000 - 5000', min: 3000, max: 5000 },
  { label: '5000+', min: 5000, max: Infinity }
];

// ==================== SORT OPTIONS ====================
export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Highest Rated', value: 'rating' }
];

// ==================== USER ROLES ====================
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  AGENT: 'agent',
  ADMIN: 'admin',
  DEVELOPER: 'developer'
};

// ==================== NOTIFICATION TYPES ====================
export const NOTIFICATION_TYPES = {
  NEW_PROPERTY: 'new_property',
  PRICE_DROP: 'price_drop',
  AUCTION_ENDING: 'auction_ending',
  BID_OUTBID: 'bid_outbid',
  BID_WON: 'bid_won',
  MESSAGE: 'message',
  TOUR_SCHEDULED: 'tour_scheduled',
  DOCUMENT_UPLOADED: 'document_uploaded',
  OFFER_RECEIVED: 'offer_received',
  OFFER_ACCEPTED: 'offer_accepted',
  OFFER_REJECTED: 'offer_rejected'
};

// ==================== MESSAGE STATUS ====================
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
};

// ==================== DEAL STAGES ====================
export const DEAL_STAGES = {
  LEAD: 'Lead',
  VIEWING: 'Viewing Scheduled',
  OFFER: 'Offer Made',
  NEGOTIATION: 'Under Negotiation',
  ACCEPTED: 'Offer Accepted',
  INSPECTION: 'Under Inspection',
  FINANCING: 'Securing Financing',
  CLOSING: 'Closing Process',
  CLOSED: 'Closed/Won',
  LOST: 'Lost'
};

// ==================== API ENDPOINTS ====================
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  PROPERTIES: '/properties',
  AUCTIONS: '/auctions',
  USERS: '/users',
  AUTH: '/auth',
  MESSAGES: '/messages',
  ANALYTICS: '/analytics',
  NOTIFICATIONS: '/notifications',
  SAVED_SEARCHES: '/saved-searches',
  FAVORITES: '/favorites'
};

// ==================== WEBSOCKET ====================
export const WS_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000',
  AUCTIONS: '/auctions',
  NOTIFICATIONS: '/notifications',
  CHAT: '/chat'
};

// ==================== PAGINATION ====================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48, 96]
};

// ==================== DATE FORMATS ====================
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss'
};

// ==================== LOCAL STORAGE KEYS ====================
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  CURRENCY: 'app_currency',
  LANGUAGE: 'app_language',
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
  THEME: 'theme'
};

// ==================== VALIDATION ====================
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,
  MAX_MESSAGE_LENGTH: 1000,
  MAX_DESCRIPTION_LENGTH: 5000,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024 // 10MB
};

// ==================== EXPORT OPTIONS ====================
export const EXPORT_FORMATS = {
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'xlsx'
};

export default {
  CURRENCIES,
  PROPERTY_TYPES,
  PROPERTY_CATEGORIES,
  PROPERTY_STATUS,
  AMENITIES,
  COUNTRIES,
  LOCATIONS,
  PRICE_RANGES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  SQFT_RANGES,
  SORT_OPTIONS,
  USER_ROLES,
  NOTIFICATION_TYPES,
  MESSAGE_STATUS,
  DEAL_STAGES,
  API_ENDPOINTS,
  WS_ENDPOINTS,
  PAGINATION,
  DATE_FORMATS,
  STORAGE_KEYS,
  VALIDATION,
  EXPORT_FORMATS
};