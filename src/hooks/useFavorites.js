
// ============================================
// hooks/useFavorites.js
// ============================================

import { useState, useEffect, useCallback } from 'react';

/**
 * useFavorites Hook
 * Manages favorite properties with localStorage persistence
 * 
 * @returns {object} - { favorites, toggleFavorite, isFavorite, clearFavorites }
 */

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('estate_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('estate_favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoading]);

  // Toggle favorite status
  const toggleFavorite = useCallback((propertyId) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  }, []);

  // Check if property is favorited
  const isFavorite = useCallback((propertyId) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoading
  };
};

// Usage Example:
// const { favorites, toggleFavorite, isFavorite } = useFavorites();
// 
// <button onClick={() => toggleFavorite(property.id)}>
//   <Heart className={isFavorite(property.id) ? 'fill-red-500' : ''} />
// </button>
