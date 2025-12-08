// ============================================
// hooks/useDebounce.js
// ============================================

import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 * Delays updating a value until after a specified delay
 * Perfect for search inputs to avoid excessive API calls
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500)
 * @returns {any} - The debounced value
 */

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage Example:
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearch = useDebounce(searchTerm, 300);
// 
// useEffect(() => {
//   // This will only run 300ms after user stops typing
//   fetchSearchResults(debouncedSearch);
// }, [debouncedSearch]);