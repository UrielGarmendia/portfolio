/**
 * useIsMobile.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects if the viewport is narrower than the `breakpoint` (default: 768px).
 *
 * Strategy:
 *  - Initializes synchronously from window.innerWidth to avoid flash-of-wrong-layout.
 *  - listens to 'resize' with a debounce (150ms) to avoid excessive re-renders
 *    during pinch-zoom or orientation changes on mobile.
 *  - Returns a stable boolean — only triggers re-renders when crossing the breakpoint.
 *
 * Usage:
 *   const isMobile = useIsMobile();       // default 768px breakpoint
 *   const isMobile = useIsMobile(1024);   // custom breakpoint
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // Debounce: only update state after 150ms of no resizing
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timerRef.current);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
