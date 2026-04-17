/**
 * App.jsx — URIEL_OS Root v3
 * ─────────────────────────────────────────────────────────────────────────────
 * Enrutamiento por pantalla:
 *  < 768px → MobileLanding (modo portfolio de toda la vida, scroll vertical)
 *  ≥ 768px → OS Desktop (ventanas arrastrables + terminal posta + modo debug)
 *
 * Persistencia: Ahora guarda estado en LocalStorage. Si entrás por primera vez
 * te da la bienvenida onda sistema viejo, sino carga directo donde dejaste.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect } from 'react';

import useSystemStore, { WINDOW_IDS } from './store/useSystemStore';
import useDebugOverlay      from './hooks/useDebugOverlay';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import useIsMobile          from './hooks/useIsMobile';

import BaseLanding    from './components/mobile/MobileLanding'; // Now renamed to BaseLanding inside
import DesktopGrid    from './components/os/DesktopGrid';
import Taskbar        from './components/os/Taskbar';
import SystemToast    from './components/os/SystemToast';
import GlobalTerminal from './components/terminal/GlobalTerminal';

import AboutWindow    from './components/sections/AboutWindow';
import StackWindow    from './components/sections/StackWindow';
import ProjectsWindow from './components/sections/ProjectsWindow';
import ContactWindow  from './components/sections/ContactWindow';

import Cursor from './components/Cursor';


// ── GlobalHooks ───────────────────────────────────────────────────────────────
const GlobalHooks = () => {
  useDebugOverlay();
  useKeyboardShortcuts();
  return null;
};


// ── OSDesktop ─────────────────────────────────────────────────────────────────
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


// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const desktopRef    = useRef(null);
  const isMobile      = useIsMobile(768);
  const isDebugActive = useSystemStore((s) => s.isDebugActive);
  const openWindow    = useSystemStore((s) => s.openWindow);
  const _hasHydrated  = useSystemStore((s) => s._hasHydrated);

  // Sync debug class to <body>
  useEffect(() => {
    document.body.classList.toggle('debug-active', isDebugActive);
  }, [isDebugActive]);

  // Frenamos acá en seco hasta que Zustand cargue todo desde el LocalStorage,
  // sino la UI arranca desfasada y tira warnings.
  if (!_hasHydrated) return null;

  // ── Unified Layout ─────────────────────────────────────────────────────────
  return (
    <>
      <GlobalHooks />
      <Cursor />
      
      {/* Fondo y el brillito del mouse */}
      <DesktopGrid />
      
      {/* Todo el sitio scrolleable de fondo */}
      <BaseLanding />

      {/* Capa de ventanas flotantes por encima */}
      <OSDesktop desktopRef={desktopRef} />
      
      {/* OS Controls */}
      <Taskbar />
      <GlobalTerminal />
      <SystemToast />
    </>
  );
}
