// src/data/mockAnalytics.js

// ==================== MARKET TRENDS DATA ====================
export const marketTrends = {
  priceIndex: {
    current: 245.8,
    previousMonth: 242.3,
    change: 1.44,
    history: [
      { month: "Jan", value: 235.2 },
      { month: "Feb", value: 237.8 },
      { month: "Mar", value: 239.5 },
      { month: "Apr", value: 241.2 },
      { month: "May", value: 242.3 },
      { month: "Jun", value: 245.8 },
    ],
  },
  avgDaysOnMarket: {
    current: 32,
    previousMonth: 35,
    change: -8.57,
  },
  inventoryLevels: {
    current: 1847,
    previousMonth: 1923,
    change: -3.95,
  },
  salesVolume: {
    current: 234500000,
    previousMonth: 218900000,
    change: 7.13,
  },
};

// ==================== PROPERTY PERFORMANCE ====================
export const propertyPerformance = [
  {
    month: "Jan 2024",
    views: 12450,
    inquiries: 234,
    tours: 89,
    offers: 45,
    closed: 12,
  },
  {
    month: "Feb 2024",
    views: 14230,
    inquiries: 278,
    tours: 103,
    offers: 52,
    closed: 15,
  },
  {
    month: "Mar 2024",
    views: 15890,
    inquiries: 312,
    tours: 118,
    offers: 61,
    closed: 18,
  },
  {
    month: "Apr 2024",
    views: 17650,
    inquiries: 345,
    tours: 134,
    offers: 68,
    closed: 21,
  },
  {
    month: "May 2024",
    views: 19200,
    inquiries: 389,
    tours: 156,
    offers: 78,
    closed: 24,
  },
  {
    month: "Jun 2024",
    views: 21800,
    inquiries: 423,
    tours: 178,
    offers: 89,
    closed: 28,
  },
];

// ==================== REVENUE DATA ====================
export const revenueData = [
  {
    month: "Jan",
    residential: 4500000,
    commercial: 2300000,
    land: 890000,
  },
  {
    month: "Feb",
    residential: 5200000,
    commercial: 2800000,
    land: 1200000,
  },
  {
    month: "Mar",
    residential: 5800000,
    commercial: 3100000,
    land: 1450000,
  },
  {
    month: "Apr",
    residential: 6300000,
    commercial: 3400000,
    land: 1680000,
  },
  {
    month: "May",
    residential: 6900000,
    commercial: 3900000,
    land: 1920000,
  },
  {
    month: "Jun",
    residential: 7500000,
    commercial: 4200000,
    land: 2100000,
  },
];

// ==================== PROPERTY TYPE DISTRIBUTION ====================
export const propertyTypeDistribution = [
  { type: "Residential", count: 542, percentage: 54.2, avgPrice: 1250000 },
  { type: "Commercial", count: 234, percentage: 23.4, avgPrice: 3400000 },
  { type: "Land", count: 123, percentage: 12.3, avgPrice: 890000 },
  { type: "Industrial", count: 67, percentage: 6.7, avgPrice: 2100000 },
  { type: "Mixed Use", count: 34, percentage: 3.4, avgPrice: 4500000 },
];

// ==================== TOP LOCATIONS ====================
export const topLocations = [
  {
    city: "New York",
    country: "USA",
    listings: 234,
    avgPrice: 2450000,
    growth: 12.3,
    hotness: 95,
  },
  {
    city: "Dubai",
    country: "UAE",
    listings: 189,
    avgPrice: 1890000,
    growth: 18.7,
    hotness: 92,
  },
  {
    city: "London",
    country: "UK",
    listings: 156,
    avgPrice: 3200000,
    growth: 8.4,
    hotness: 88,
  },
  {
    city: "Los Angeles",
    country: "USA",
    listings: 145,
    avgPrice: 2100000,
    growth: 10.2,
    hotness: 85,
  },
  {
    city: "Miami",
    country: "USA",
    listings: 134,
    avgPrice: 1650000,
    growth: 15.6,
    hotness: 83,
  },
  {
    city: "Cairo",
    country: "Egypt",
    listings: 123,
    avgPrice: 450000,
    growth: 22.1,
    hotness: 80,
  },
  {
    city: "Paris",
    country: "France",
    listings: 98,
    avgPrice: 2800000,
    growth: 6.8,
    hotness: 78,
  },
  {
    city: "Singapore",
    country: "Singapore",
    listings: 87,
    avgPrice: 3500000,
    growth: 14.2,
    hotness: 75,
  },
];

// ==================== PRICE RANGE DISTRIBUTION ====================
export const priceRangeDistribution = [
  { range: "Under $100K", count: 45, percentage: 4.5 },
  { range: "$100K-$250K", count: 123, percentage: 12.3 },
  { range: "$250K-$500K", count: 234, percentage: 23.4 },
  { range: "$500K-$1M", count: 289, percentage: 28.9 },
  { range: "$1M-$2M", count: 178, percentage: 17.8 },
  { range: "$2M-$5M", count: 89, percentage: 8.9 },
  { range: "$5M+", count: 42, percentage: 4.2 },
];

// ==================== AGENT PERFORMANCE ====================
export const agentPerformance = [
  {
    id: "agent_1",
    name: "Sarah Johnson",
    listings: 45,
    sold: 38,
    revenue: 18900000,
    avgDaysOnMarket: 28,
    rating: 4.9,
    conversionRate: 84.4,
  },
  {
    id: "agent_2",
    name: "Emily Chen",
    listings: 38,
    sold: 35,
    revenue: 23400000,
    avgDaysOnMarket: 25,
    rating: 5.0,
    conversionRate: 92.1,
  },
  {
    id: "agent_3",
    name: "Michael Roberts",
    listings: 42,
    sold: 31,
    revenue: 15600000,
    avgDaysOnMarket: 32,
    rating: 4.7,
    conversionRate: 73.8,
  },
  {
    id: "agent_4",
    name: "Jessica Williams",
    listings: 36,
    sold: 29,
    revenue: 12800000,
    avgDaysOnMarket: 30,
    rating: 4.8,
    conversionRate: 80.6,
  },
];

// ==================== CONVERSION FUNNEL ====================
export const conversionFunnel = [
  { stage: "Views", count: 45620, percentage: 100 },
  { stage: "Property Details", count: 12340, percentage: 27.0 },
  { stage: "Saved/Favorited", count: 3450, percentage: 7.6 },
  { stage: "Inquiries Sent", count: 1234, percentage: 2.7 },
  { stage: "Tours Scheduled", count: 456, percentage: 1.0 },
  { stage: "Offers Made", count: 234, percentage: 0.5 },
  { stage: "Closed Deals", count: 89, percentage: 0.2 },
];

// ==================== USER ENGAGEMENT ====================
export const userEngagement = {
  dailyActiveUsers: {
    current: 12450,
    previousWeek: 11890,
    change: 4.71,
  },
  avgSessionDuration: {
    current: "8m 34s",
    seconds: 514,
    previousWeek: 486,
    change: 5.76,
  },
  bounceRate: {
    current: 32.4,
    previousWeek: 35.1,
    change: -7.69,
  },
  avgPropertiesViewed: {
    current: 5.7,
    previousWeek: 5.2,
    change: 9.62,
  },
};

// ==================== SEARCH TRENDS ====================
export const searchTrends = [
  { query: "luxury villa Dubai", count: 2340, change: 23.5 },
  { query: "apartment New York", count: 1890, change: 15.2 },
  { query: "beachfront property Miami", count: 1560, change: 31.8 },
  { query: "commercial office London", count: 1234, change: 8.4 },
  { query: "investment property Cairo", count: 1120, change: 45.6 },
  { query: "penthouse Los Angeles", count: 987, change: 12.3 },
  { query: "villa North Coast Egypt", count: 876, change: 67.9 },
  { query: "studio Paris", count: 765, change: -5.2 },
  { query: "townhouse San Francisco", count: 654, change: 18.7 },
  { query: "land Riyadh", count: 543, change: 52.3 },
];

// ==================== NOTIFICATION STATS ====================
export const notificationStats = {
  total: 1247,
  unread: 23,
  byType: {
    new_property: 456,
    price_drop: 234,
    auction_ending: 123,
    bid_outbid: 89,
    message: 178,
    tour_scheduled: 67,
    offer_received: 45,
    document_uploaded: 55,
  },
};

// ==================== EXPORT FUNCTIONS ====================
export const getMarketTrends = () => marketTrends;
export const getPropertyPerformance = () => propertyPerformance;
export const getRevenueData = () => revenueData;
export const getPropertyTypeDistribution = () => propertyTypeDistribution;
export const getTopLocations = () => topLocations;
export const getPriceRangeDistribution = () => priceRangeDistribution;
export const getAgentPerformance = () => agentPerformance;
export const getConversionFunnel = () => conversionFunnel;
export const getUserEngagement = () => userEngagement;
export const getSearchTrends = () => searchTrends;
export const getNotificationStats = () => notificationStats;

export default {
  marketTrends,
  propertyPerformance,
  revenueData,
  propertyTypeDistribution,
  topLocations,
  priceRangeDistribution,
  agentPerformance,
  conversionFunnel,
  userEngagement,
  searchTrends,
  notificationStats,
};
