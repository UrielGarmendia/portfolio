import { useEffect } from 'react';
import useSystemStore from '../store/useSystemStore';

const useKeyboardShortcuts = () => {
  const toggleTerminal  = useSystemStore((s) => s.toggleTerminal);
  const closeTerminal   = useSystemStore((s) => s.closeTerminal);
  const toggleDebugMode = useSystemStore((s) => s.toggleDebugMode);
  const isTerminalOpen  = useSystemStore((s) => s.isTerminalOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'k')) {
        e.preventDefault();
        toggleTerminal();
        return;
      }
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDebugMode();
        return;
      }
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
