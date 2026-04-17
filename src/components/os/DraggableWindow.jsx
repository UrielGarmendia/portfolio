import { useRef, useState } from 'react';
import {
  motion,
  useDragControls,
  AnimatePresence,
} from 'framer-motion';
import useSystemStore from '../../store/useSystemStore';
import useIsMobile from '../../hooks/useIsMobile';

const windowVariants = {
  hidden: {
    opacity:   0,
    scale:     0.94,
    y:        -12,
    filter:    'blur(4px)',
  },
  visible: {
    opacity:   1,
    scale:     1,
    y:         0,
    filter:    'blur(0px)',
    transition: {
      duration:   0.22,
      ease:       [0.16, 1, 0.3, 1],   
    },
  },
  exit: {
    opacity:   0,
    scale:     0.96,
    y:         6,
    filter:    'blur(3px)',
    transition: {
      duration: 0.15,
      ease:     'easeIn',
    },
  },
};

const GLOW_ACTIVE   = '0 0 0 1px #FF007F, 0 0 12px 1px rgba(255,0,127,0.25)';
const GLOW_INACTIVE = '0 0 0 1px rgba(255,255,255,0.08)';

const DraggableWindow = ({
  id,
  title,
  children,
  constraintsRef,
  defaultPosition = { x: 80, y: 80 },
  width  = '640px',
  height = '480px',
}) => {
  const isMobile     = useIsMobile(768);
  const window_      = useSystemStore((s) => s.windows[id]);
  const focusWindow  = useSystemStore((s) => s.focusWindow);
  const closeWindow  = useSystemStore((s) => s.closeWindow);
  const minimizeWindow = useSystemStore((s) => s.minimizeWindow);
  const isDebugActive = useSystemStore((s) => s.isDebugActive);

  const [isFocused, setIsFocused] = useState(false);

  const dragControls = useDragControls();
  const windowRef    = useRef(null);

  if (!window_) return null;

  const { isOpen, isMinimized, zIndex } = window_;

  // Responsive logic
  const finalWidth  = isMobile ? '92vw' : width;
  const finalHeight = isMobile ? '75vh' : height;
  const finalX      = isMobile ? '4vw' : defaultPosition.x;
  const finalY      = isMobile ? '10vh' : defaultPosition.y;

  const handleFocus = () => {
    setIsFocused(true);
    focusWindow(id);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleHeaderPointerDown = (e) => {
    dragControls.start(e);
    focusWindow(id);
  };

  const handlePointerDown = () => {
    focusWindow(id);
    setIsFocused(true);
  };

  const debugInfo = `id="${id}" status="${isOpen ? 'rendered' : 'closed'}" z=${zIndex}`;

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          ref={windowRef}
          key={id}
          drag={!isMobile}
          dragControls={dragControls}
          dragListener={false}           
          dragConstraints={constraintsRef}
          dragMomentum={false}           
          dragElastic={0}               
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={windowVariants}
          style={{
            position:  'fixed',
            x:         finalX,
            y:         finalY,
            width:     finalWidth,
            height:    finalHeight,
            zIndex,
            boxShadow: isFocused ? GLOW_ACTIVE : GLOW_INACTIVE,
            transition: 'box-shadow 0.18s ease',
          }}
          onPointerDown={handlePointerDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          className="flex flex-col select-none outline-none"
          data-debug={isDebugActive ? debugInfo : undefined}
        >

          {isDebugActive && (
            <div
              style={{
                position:        'absolute',
                top:            '-22px',
                left:            0,
                fontSize:       '10px',
                fontFamily:     'monospace',
                color:          '#FF007F',
                background:     'rgba(0,0,0,0.8)',
                padding:        '1px 6px',
                border:         '1px dashed #FF007F',
                pointerEvents:  'none',
                whiteSpace:     'nowrap',
                zIndex:          9999,
              }}
            >
              {'<DraggableWindow ' + debugInfo + ' />'}
            </div>
          )}

          <div
            style={{
              width:         '100%',
              height:        '100%',
              display:       'flex',
              flexDirection: 'column',
              background:    '#1A1A1A',
              border:        isFocused
                               ? '1px solid rgba(255,0,127,0.6)'
                               : '1px solid rgba(255,255,255,0.08)',
              transition:    'border-color 0.18s ease',
              overflow:      'hidden',
            }}
          >

            <div
              data-os-ui="true"
              onPointerDown={handleHeaderPointerDown}
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '0 12px',
                height:         '36px',
                minHeight:      '36px',
                background:     isFocused
                                  ? 'linear-gradient(90deg, #1E1E1E 0%, #222 60%, rgba(255,0,127,0.06) 100%)'
                                  : '#1B1B1B',
                borderBottom:   isFocused
                                  ? '1px solid rgba(255,0,127,0.4)'
                                  : '1px solid rgba(255,255,255,0.07)',
                cursor:         'grab',
                userSelect:     'none',
                transition:     'background 0.18s ease, border-color 0.18s ease',
                flexShrink:     0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{ opacity: isFocused ? [1, 0.3, 1] : 0.3 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  style={{
                    width:        '6px',
                    height:       '6px',
                    borderRadius: '50%',
                    background:   isFocused ? '#FF007F' : '#555',
                    flexShrink:   0,
                  }}
                />
                <span
                  style={{
                    fontFamily:    'monospace',
                    fontSize:      '11px',
                    letterSpacing: '0.08em',
                    color:         isFocused ? '#F3F4F6' : '#666',
                    fontWeight:    500,
                    transition:    'color 0.18s ease',
                  }}
                >
                  {title}
                </span>
              </div>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <WindowControl
                  label="–"
                  title="Minimize"
                  hoverColor="rgba(255,200,0,0.15)"
                  hoverBorder="#FFB800"
                  onClick={() => minimizeWindow(id)}
                />
                <WindowControl
                  label="×"
                  title="Close"
                  hoverColor="rgba(255,0,127,0.15)"
                  hoverBorder="#FF007F"
                  onClick={() => closeWindow(id)}
                />
              </div>
            </div>

            <div
              style={{
                height:     '2px',
                background: isFocused
                              ? 'linear-gradient(90deg, transparent, #FF007F, transparent)'
                              : 'transparent',
                transition: 'background 0.3s ease',
                flexShrink: 0,
              }}
            />

            <div
              onPointerDown={(e) => e.stopPropagation()}
              style={{
                flex:       1,
                overflowY:  'auto',
                overflowX:  'hidden',
                padding:    '20px',
                color:      '#F3F4F6',
                scrollbarWidth:      'thin',
                scrollbarColor:      '#FF007F22 transparent',
              }}
              className="window-scrollbar"
            >
              {children}
            </div>

            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'space-between',
                padding:      '0 12px',
                height:       '22px',
                minHeight:    '22px',
                background:   '#161616',
                borderTop:    '1px solid rgba(255,255,255,0.05)',
                flexShrink:   0,
              }}
            >
              <span style={{
                fontFamily:    'monospace',
                fontSize:      '9px',
                color:         '#444',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {id}.sys
              </span>
              <span style={{
                fontFamily:    'monospace',
                fontSize:      '9px',
                color:         isFocused ? 'rgba(255,0,127,0.6)' : '#333',
                letterSpacing: '0.12em',
                transition:    'color 0.18s ease',
              }}>
                {isFocused ? '● ACTIVE' : '○ IDLE'}
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WindowControl = ({ label, title, hoverColor, hoverBorder, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:           '20px',
        height:          '20px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        background:      hovered ? hoverColor : 'transparent',
        border:          `1px solid ${hovered ? hoverBorder : 'rgba(255,255,255,0.12)'}`,
        color:           hovered ? hoverBorder : '#555',
        fontFamily:      'monospace',
        fontSize:        '13px',
        lineHeight:      1,
        cursor:          'pointer',
        transition:      'all 0.12s ease',
        borderRadius:    0,
        padding:         0,
        flexShrink:      0,
      }}
    >
      {label}
    </button>
  );
};


export default DraggableWindow;
