import { useRef, useEffect } from 'react';

import useSystemStore, { WINDOW_IDS } from './store/useSystemStore';
import useDebugOverlay      from './hooks/useDebugOverlay';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import useIsMobile          from './hooks/useIsMobile';

import BaseLanding    from './components/mobile/MobileLanding';
import DesktopGrid    from './components/os/DesktopGrid';
import Taskbar        from './components/os/Taskbar';
import SystemToast    from './components/os/SystemToast';
import GlobalTerminal from './components/terminal/GlobalTerminal';

import AboutWindow    from './components/sections/AboutWindow';
import StackWindow    from './components/sections/StackWindow';
import ProjectsWindow from './components/sections/ProjectsWindow';
import ContactWindow  from './components/sections/ContactWindow';

import Cursor from './components/Cursor';


const GlobalHooks = () => {
  useDebugOverlay();
  useKeyboardShortcuts();
  return null;
};


const OSDesktop = ({ desktopRef }) => {
  const isDebugActive = useSystemStore((s) => s.isDebugActive);

  return (
    <div
      ref={desktopRef}
      className={isDebugActive ? 'debug-active' : ''}
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:         100,
        pointerEvents:  'none',
        overflow:       'hidden',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <AboutWindow    constraintsRef={desktopRef} />
        <StackWindow    constraintsRef={desktopRef} />
        <ProjectsWindow constraintsRef={desktopRef} />
        <ContactWindow  constraintsRef={desktopRef} />
      </div>
    </div>
  );
};



export default function App() {
  const desktopRef    = useRef(null);
  const isMobile      = useIsMobile(768);
  const isDebugActive = useSystemStore((s) => s.isDebugActive);
  const openWindow    = useSystemStore((s) => s.openWindow);
  const _hasHydrated  = useSystemStore((s) => s._hasHydrated);

  useEffect(() => {
    document.body.classList.toggle('debug-active', isDebugActive);
  }, [isDebugActive]);
  if (!_hasHydrated) return null;

  return (
    <>
      <GlobalHooks />
      <Cursor />
      {/* main: punto de referencia principal — requerido por WCAG 2.4.1 */}
      <main id="main-content" style={{ display: 'contents' }}>
        <DesktopGrid />
        <BaseLanding />
        <OSDesktop desktopRef={desktopRef} />
      </main>
      <Taskbar />
      <GlobalTerminal />
      <SystemToast />
    </>
  );
}
