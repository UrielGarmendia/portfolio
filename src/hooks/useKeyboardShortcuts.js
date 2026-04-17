/**
 * useKeyboardShortcuts.js
 * ─────────────────────────────────────────────────────────
 * Registro global de atajos de teclado.
 * Atajos:
 *   Ctrl + K   → Abre/Cierra la terminal
 *   Ctrl + D   → Activa el modo debug
 *   Escape     → Cierra la terminal (si está abierta)
 * ─────────────────────────────────────────────────────────
 */

import { useEffect } from 'react';
import useSystemStore from '../store/useSystemStore';

const useKeyboardShortcuts = () => {
  const toggleTerminal  = useSystemStore((s) => s.toggleTerminal);
  const closeTerminal   = useSystemStore((s) => s.closeTerminal);
  const toggleDebugMode = useSystemStore((s) => s.toggleDebugMode);
  const isTerminalOpen  = useSystemStore((s) => s.isTerminalOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + ` or Ctrl + K → toggle terminal
      if (e.ctrlKey && (e.key === '`' || e.key === 'k')) {
        e.preventDefault();
        toggleTerminal();
        return;
      }
      // Ctrl + D → toggle debug mode
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDebugMode();
        return;
      }
      // Escape → close terminal
      if (e.key === 'Escape' && isTerminalOpen) {
        closeTerminal();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal, closeTerminal, toggleDebugMode, isTerminalOpen]);
};

export default useKeyboardShortcuts;
