import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import useSystemStore from '../../store/useSystemStore';
import useElementInspector from '../../hooks/useElementInspector';

const isMobileDevice = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);

const DesktopGrid = () => {
  const isDebugActive = useSystemStore((s) => s.isDebugActive);
  const mousePosition = useSystemStore((s) => s.mousePosition);

  const defaultInspected = useElementInspector();
  const inspected = isMobileDevice ? null : defaultInspected;

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth  / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const glowBackground = useMotionTemplate`
    radial-gradient(
      560px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 0, 127, 0.055) 0%,
      transparent 70%
    )
  `;

  useEffect(() => {
    if (isMobileDevice) return;
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const [uptime, setUptime] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState('N/A');
  const [netType, setNetType] = useState('N/A');

  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    
    let batteryRef = null;
    const handleBattery = () => {
      if (batteryRef) setBatteryLevel(`${Math.round(batteryRef.level * 100)}%`);
    };

    if (navigator.getBattery) {
      navigator.getBattery().then((b) => {
        batteryRef = b;
        setBatteryLevel(`${Math.round(b.level * 100)}%`);
        b.addEventListener('levelchange', handleBattery);
      }).catch(() => {});
    }
    
    const handleNetwork = () => {
      setNetType(navigator.connection.effectiveType || navigator.connection.type || 'N/A');
    };

    if (navigator.connection) {
      handleNetwork();
      navigator.connection.addEventListener('change', handleNetwork);
    }

    return () => {
      clearInterval(t);
      if (batteryRef) batteryRef.removeEventListener('levelchange', handleBattery);
      if (navigator.connection) navigator.connection.removeEventListener('change', handleNetwork);
    };
  }, []);

  const formatUptime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      {!isMobileDevice && (
        <motion.div
          style={{
            position:      'fixed',
            inset:          0,
            zIndex:         0,
            pointerEvents: 'none',
            background:     glowBackground,
          }}
        />
      )}

      <AnimatePresence>
        {isDebugActive && inspected && (
          <ElementScannerOverlay key="scanner" inspected={inspected} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDebugActive && (
          <motion.div
            key="debug-hud"
            data-os-ui="true"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{ opacity: 0, y: -8    }}
            transition={{ duration: 0.18 }}
            style={{
              position:      'fixed',
              top:            12,
              right:          16,
              zIndex:         9500,
              background:    'rgba(10, 10, 10, 0.92)',
              border:        '1px dashed rgba(255,0,127,0.4)',
              padding:       '10px 14px',
              fontFamily:    '"JetBrains Mono", monospace',
              pointerEvents: 'none',
              minWidth:      '220px',
            }}
          >
            <div style={{
              fontSize:      '9px',
              color:         '#FF007F',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom:  '8px',
              borderBottom:  '1px solid rgba(255,0,127,0.15)',
              paddingBottom: '6px',
            }}>
              // MODO DEBUG: ACTIVADO
            </div>

            {!isMobileDevice && (
              <div style={{ marginBottom: '8px' }}>
                <SectionLabel text="CURSOR" />
                <DebugRow label="x"        value={`${mousePosition.x}px`} />
                <DebugRow label="y"        value={`${mousePosition.y}px`} />
              </div>
            )}

            <div style={{ marginBottom: '8px' }}>
              <SectionLabel text="SYSTEM STATUS" />
              <DebugRow label="uptime"   value={formatUptime(uptime)} />
              <DebugRow label="battery"  value={batteryLevel} valueColor="#4ade80" />
              <DebugRow label="network"  value={netType}      valueColor="#61dafb" />
              <DebugRow label="viewport" value={`${window.innerWidth}×${window.innerHeight}`} />
            </div>

            {inspected && (
              <div>
                <SectionLabel text="INSPECTED" />
                <DebugRow
                  label="element"
                  value={`<${inspected.tag}>`}
                  valueColor="#61dafb"
                />
                {inspected.id && (
                  <DebugRow label="id" value={`#${inspected.id}`} valueColor="#f59e0b" />
                )}
                {inspected.classes && (
                  <DebugRow label="class" value={`.${inspected.classes.split(' ')[0]}`} valueColor="#9b59b6" />
                )}
                <DebugRow
                  label="size"
                  value={`${Math.round(inspected.rect.width)}×${Math.round(inspected.rect.height)}`}
                />
                <DebugRow
                  label="pos"
                  value={`${Math.round(inspected.rect.left)}, ${Math.round(inspected.rect.top)}`}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ElementScannerOverlay = ({ inspected }) => {
  const { tag, id, rect } = inspected;

  const badgeLabel = [
    `<${tag}>`,
    id ? `#${id}` : '',
    `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
  ].filter(Boolean).join('  |  ');

  if (rect.width < 4 || rect.height < 4) return null;

  return (
    <motion.div
      data-os-ui="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      style={{
        position:      'fixed',
        top:            rect.top,
        left:           rect.left,
        width:          rect.width,
        height:         rect.height,
        border:        '1px dashed #FF007F',
        background:    'rgba(255, 0, 127, 0.055)',
        boxSizing:     'border-box',
        pointerEvents: 'none',
        zIndex:         9400,
        outline:        'none',
      }}
    >
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div
        style={{
          position:      'absolute',
          top:           '-20px',
          left:          '-1px',
          background:    '#FF007F',
          color:         '#000',
          fontFamily:    '"JetBrains Mono", monospace',
          fontSize:      '9px',
          fontWeight:    700,
          padding:       '2px 7px',
          letterSpacing: '0.06em',
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          lineHeight:     1.4,
          userSelect:    'none',
        }}
      >
        {badgeLabel}
      </div>

      {rect.height > 30 && (
        <div
          style={{
            position:      'absolute',
            right:         '-36px',
            top:           '50%',
            transform:     'translateY(-50%)',
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '8px',
            color:         '#FF007F',
            opacity:       0.7,
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
            userSelect:    'none',
          }}
        >
          {Math.round(rect.height)}
        </div>
      )}
    </motion.div>
  );
};

const CORNER_STYLES = {
  tl: { top:    0, left:  0, borderTop:    '2px solid #FF007F', borderLeft:  '2px solid #FF007F' },
  tr: { top:    0, right: 0, borderTop:    '2px solid #FF007F', borderRight: '2px solid #FF007F' },
  bl: { bottom: 0, left:  0, borderBottom: '2px solid #FF007F', borderLeft:  '2px solid #FF007F' },
  br: { bottom: 0, right: 0, borderBottom: '2px solid #FF007F', borderRight: '2px solid #FF007F' },
};

const Corner = ({ position }) => (
  <div
    style={{
      position:      'absolute',
      width:          '8px',
      height:         '8px',
      pointerEvents: 'none',
      ...CORNER_STYLES[position],
    }}
  />
);


const SectionLabel = ({ text }) => (
  <div style={{
    fontFamily:    '"JetBrains Mono", monospace',
    fontSize:      '8px',
    color:         '#333',
    letterSpacing: '0.18em',
    marginBottom:  '4px',
    marginTop:     '2px',
  }}>
    {text}
  </div>
);

const DebugRow = ({ label, value, valueColor = '#FF007F' }) => (
  <div style={{ display: 'flex', gap: '8px', lineHeight: 1.8 }}>
    <span style={{
      fontFamily:    '"JetBrains Mono", monospace',
      fontSize:      '10px',
      color:         '#444',
      minWidth:      '62px',
      flexShrink:    0,
    }}>
      {label}:
    </span>
    <span style={{
      fontFamily:    '"JetBrains Mono", monospace',
      fontSize:      '10px',
      color:         valueColor,
    }}>
      {value}
    </span>
  </div>
);


export default DesktopGrid;
