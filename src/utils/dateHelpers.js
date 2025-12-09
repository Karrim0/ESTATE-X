// src/utils/dateHelpers.js

// ==================== FORMAT DATES ====================

/**
 * Format date to readable string
 * @param {Date|string} date - Date object or string
 * @param {string} format - Format type
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'long':
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'full':
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'time':
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    
    case 'datetime':
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    
    case 'iso':
      return d.toISOString();
    
    default:
      return d.toLocaleDateString();
  }
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date object or string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
};

/**
 * Format countdown timer
 * @param {Date|string} endDate - End date
 * @returns {Object} Time remaining
 */
export const formatCountdown = (endDate) => {
  if (!endDate) return null;
  
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const now = new Date();
  const diff = end - now;
  
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    total: diff
  };
};

// ==================== DATE CALCULATIONS ====================

/**
 * Add days to date
 * @param {Date} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Subtract days from date
 * @param {Date} date - Starting date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Get difference between two dates in days
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  const diffMs = Math.abs(d2 - d1);
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if today
 */
export const isToday = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if in the past
 */
export const isPast = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
};

/**
 * Check if date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if in the future
 */
export const isFuture = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d > new Date();
};

// ==================== DATE RANGES ====================

/**
 * Get date range (e.g., last 7 days)
 * @param {string} range - Range type
 * @returns {Object} Start and end dates
 */
export const getDateRange = (range) => {
  const now = new Date();
  const start = new Date();
  
  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'yesterday':
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'last7days':
      start.setDate(start.getDate() - 7);
      break;
    case 'last30days':
      start.setDate(start.getDate() - 30);
      break;
    case 'last90days':
      start.setDate(start.getDate() - 90);
      break;
    case 'thisWeek':
      const day = start.getDay();
      const diff = start.getDate() - day + (day === 0 ? -6 : 1);
      start.setDate(diff);
      start.setHours(0, 0, 0, 0);
      break;
    case 'thisMonth':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'thisYear':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      start.setDate(start.getDate() - 30);
  }
  
  return {
    start,
    end: now
  };
};

/**
 * Get start of day
 * @param {Date} date - Date
 * @returns {Date} Start of day
 */
export const startOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of day
 * @param {Date} date - Date
 * @returns {Date} End of day
 */
export const endOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

// ==================== PARSING ====================

/**
 * Parse date string safely
 * @param {string} dateString - Date string
 * @returns {Date|null} Parsed date or null
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Validate date
 * @param {any} date - Value to validate
 * @returns {boolean} True if valid date
 */
export const isValidDate = (date) => {
  if (!date) return false;
  const d = date instanceof Date ? date : new Date(date);
  return !isNaN(d.getTime());
};

// ==================== TIMEZONE ====================

/**
 * Get user's timezone
 * @returns {string} Timezone string
 */
export const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Convert date to timezone
 * @param {Date} date - Date to convert
 * @param {string} timezone - Target timezone
 * @returns {string} Formatted date in timezone
 */
export const toTimezone = (date, timezone) => {
  return date.toLocaleString('en-US', { timeZone: timezone });
};

export default {
  formatDate,
  formatRelativeTime,
  formatCountdown,
  addDays,
  subtractDays,
  getDaysDifference,
  isToday,
  isPast,
  isFuture,
  getDateRange,
  startOfDay,
  endOfDay,
  parseDate,
  isValidDate,
  getUserTimezone,
  toTimezone
};