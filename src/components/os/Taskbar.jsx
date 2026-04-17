import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSystemStore, { WINDOW_IDS } from '../../store/useSystemStore';

const TASKBAR_ITEMS = [
  { id: WINDOW_IDS.ABOUT,    label: 'Sobre Mí',  icon: 'USR', shortcut: '01' },
  { id: WINDOW_IDS.STACK,    label: 'Tech Stack', icon: 'STK', shortcut: '02' },
  { id: WINDOW_IDS.PROJECTS, label: 'Proyectos',  icon: 'PRJ', shortcut: '03' },
  { id: WINDOW_IDS.CONTACT,  label: 'Contacto',   icon: 'MSG', shortcut: '04' },
];


const Taskbar = () => {
  const windows     = useSystemStore((s) => s.windows);
  const openWindow  = useSystemStore((s) => s.openWindow);
  const focusWindow = useSystemStore((s) => s.focusWindow);

  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      data-os-ui="true"
      className="hidden md:flex"
      style={{
        position:       'fixed',
        left:            16,
        top:            '50%',
        transform:      'translateY(-50%)',
        zIndex:          8500,
        flexDirection:  'column',
        alignItems:     'center',
        gap:             6,
        padding:        '12px 8px',
        background:     'rgba(14, 14, 14, 0.92)',
        backdropFilter: 'blur(10px)',
        border:         '1px solid rgba(255,255,255,0.06)',
        borderLeft:     `2px solid ${booting ? '#FF007F' : 'rgba(255,0,127,0.25)'}`,
        transition:     'border-left-color 1s ease',
        boxShadow:      booting ? '0 0 20px rgba(255,0,127,0.12)' : 'none',
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          width:        '4px',
          height:       '4px',
          borderRadius: '50%',
          background:   '#FF007F',
          marginBottom: '4px',
          flexShrink:   0,
        }}
      />

      <div style={{
        width:        '20px',
        height:       '1px',
        background:   'rgba(255,255,255,0.08)',
        marginBottom: '4px',
      }} />

      {TASKBAR_ITEMS.map((item) => {
        const win = windows[item.id];
        if (!win) return null;
        return (
          <TaskbarButton
            key={item.id}
            item={item}
            win={win}
            onActivate={() => {
              if (!win.isOpen || win.isMinimized) {
                openWindow(item.id);
              } else {
                focusWindow(item.id);
              }
            }}
          />
        );
      })}

      <div style={{
        width:        '1px',
        height:       '20px',
        background:   'rgba(255,255,255,0.06)',
        marginTop:    '4px',
      }} />
      <span style={{
        fontFamily:    '"JetBrains Mono", monospace',
        fontSize:      '7px',
        color:         '#2a2a2a',
        letterSpacing: '0.15em',
        writingMode:   'vertical-rl',
        marginTop:     '4px',
        userSelect:    'none',
      }}>
        URIEL_OS
      </span>
    </div>
  );
};



const TaskbarButton = ({ item, win, onActivate }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isActive    = win.isOpen && !win.isMinimized;
  const isMinimized = win.isOpen && win.isMinimized;

  const statusLabel = isActive
    ? 'ACTIVE'
    : isMinimized
    ? 'MINIMIZED'
    : 'CLOSED';

  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.button
        onClick={onActivate}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width:         '40px',
          height:        '40px',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          justifyContent:'center',
          gap:            '2px',
          background:    isActive
                           ? 'rgba(255,0,127,0.1)'
                           : 'rgba(255,255,255,0.03)',
          border:         isActive
                           ? '1px solid rgba(255,0,127,0.35)'
                           : '1px solid rgba(255,255,255,0.07)',
          cursor:        'pointer',
          transition:    'all 0.15s ease',
          padding:        0,
          borderRadius:   0,
        }}
      >
        <span style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          fontWeight:    700,
          color:         isActive ? '#FF007F' : isMinimized ? '#555' : '#333',
          letterSpacing: '0.06em',
          transition:    'color 0.15s ease',
        }}>
          {item.icon}
        </span>
        <span style={{
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '7px',
          color:         '#2a2a2a',
          letterSpacing: '0.1em',
        }}>
          {item.shortcut}
        </span>
      </motion.button>

      <div style={{ height: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence>
          {(isActive || isMinimized) && (
            <motion.div
              key="indicator"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                width:        '4px',
                height:       '4px',
                borderRadius: '50%',
                background:   isActive ? '#FF007F' : '#444',
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -6, scale: 0.95 }}
            animate={{ opacity: 1, x:  0, scale: 1    }}
            exit={{ opacity: 0, x: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            style={{
              position:      'absolute',
              left:          '48px',
              top:           '50%',
              transform:     'translateY(-50%)',
              background:    'rgba(0,0,0,0.92)',
              border:        '1px solid rgba(255,0,127,0.3)',
              padding:       '5px 10px',
              whiteSpace:    'nowrap',
              pointerEvents: 'none',
              zIndex:         9999,
            }}
          >
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#F3F4F6' }}>
              {item.label}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '8px', color: '#FF007F', letterSpacing: '0.1em' }}>
              {statusLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Taskbar;
