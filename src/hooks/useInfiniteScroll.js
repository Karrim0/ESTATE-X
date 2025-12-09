// src/hooks/useInfiniteScroll.js

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for infinite scroll functionality
 * @param {Function} fetchMore - Function to fetch more data
 * @param {Object} options - Configuration options
 * @returns {Object} Infinite scroll state and functions
 */
export const useInfiniteScroll = (fetchMore, options = {}) => {
  const {
    threshold = 200, // Distance from bottom to trigger load
    hasMore: initialHasMore = true,
    enabled = true,
  } = options;

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [error, setError] = useState(null);
  const observer = useRef(null);
  const loadingRef = useRef(false);

  // ==================== LOAD MORE ====================
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || !enabled) return;

    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      const result = await fetchMore();

      // Check if there's more data
      if (result && typeof result.hasMore !== "undefined") {
        setHasMore(result.hasMore);
      } else if (result && Array.isArray(result.data)) {
        setHasMore(result.data.length > 0);
      }
    } catch (err) {
      console.error("Infinite scroll error:", err);
      setError(err.message || "Failed to load more data");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchMore, hasMore, enabled]);

  // ==================== INTERSECTION OBSERVER ====================
  const lastElementRef = useCallback(
    (node) => {
      if (loading || !enabled) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, threshold, loadMore, enabled]
  );

  // ==================== SCROLL EVENT (Alternative) ====================
  const handleScroll = useCallback(() => {
    if (!enabled || loading || !hasMore) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore();
    }
  }, [enabled, loading, hasMore, threshold, loadMore]);

  // ==================== SETUP SCROLL LISTENER ====================
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, enabled]);

  // ==================== CLEANUP ====================
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // ==================== RESET ====================
  const reset = useCallback(() => {
    setHasMore(true);
    setError(null);
    setLoading(false);
    loadingRef.current = false;
  }, []);

  return {
    loading,
    hasMore,
    error,
    lastElementRef,
    loadMore,
    reset,
  };
};

export default useInfiniteScroll;
