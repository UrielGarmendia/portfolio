/**
 * useDebugOverlay.js
 * ─────────────────────────────────────────────────────────
 * Tracks mouse position globally when Engineering Debug Mode
 * is active and writes it to the Zustand store.
 * Components read `mousePosition` from the store to render
 * the dynamic coordinate grid.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect } from 'react';
import useSystemStore from '../store/useSystemStore';

const useDebugOverlay = () => {
  const isDebugActive    = useSystemStore((s) => s.isDebugActive);
  const setMousePosition = useSystemStore((s) => s.setMousePosition);

  useEffect(() => {
    if (!isDebugActive) return;

    const handleMouseMove = (e) => {
      setMousePosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDebugActive, setMousePosition]);
};

export default useDebugOverlay;
