// ============================================
// hooks/useMediaQuery.js
// ============================================

import { useState, useEffect } from "react";

/**
 * useMediaQuery Hook
 * Detects media query matches (responsive design)
 *
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the media query matches
 */

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (e) => setMatches(e.matches);

    // Add listener (modern browsers)
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
};

// Usage Example:
// const isMobile = useMediaQuery('(max-width: 768px)');
// const isDesktop = useMediaQuery('(min-width: 1024px)');
//
// return isMobile ? <MobileLayout /> : <DesktopLayout />;
