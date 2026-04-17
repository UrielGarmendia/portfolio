import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'uriel_os_onboarded';

const SystemToast = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const showTimer    = setTimeout(() => setVisible(true),  1800);
    const dismissTimer = setTimeout(() => handleDismiss(),   9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-os-ui="true"
          initial={{ opacity: 0, x: 48, y: -8 }}
          animate={{ opacity: 1, x: 0,  y: 0  }}
          exit={{ opacity: 0,  x: 48, y: -8, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          style={{
            position:       'fixed',
            top:             70,
            right:           20,
            zIndex:          9999,
            width:           '320px',
            background:     'rgba(10, 10, 10, 0.96)',
            backdropFilter:  'blur(12px)',
            border:         '1px solid rgba(255, 0, 127, 0.25)',
            borderLeft:     '3px solid #FF007F',
            boxShadow:      '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
            overflow:        'hidden',
          }}
        >
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 7.2, ease: 'linear', delay: 0 }}
            style={{
              position:       'absolute',
              bottom:          0,
              left:            0,
              right:           0,
              height:         '2px',
              background:     '#FF007F',
              transformOrigin:'left center',
              opacity:         0.6,
            }}
          />

          <div style={{ padding: '14px 16px' }}>
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   '10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  style={{
                    width:        '6px',
                    height:       '6px',
                    borderRadius: '50%',
                    background:   '#FF007F',
                    flexShrink:    0,
                  }}
                />
                <span style={{
                  fontFamily:    '"JetBrains Mono", monospace',
                  fontSize:      '9px',
                  color:         '#FF007F',
                  letterSpacing: '0.16em',
                  fontWeight:    700,
                }}>
                  SYS_INFO
                </span>
              </div>

              <button
                onClick={handleDismiss}
                style={{
                  background:    'transparent',
                  border:        'none',
                  color:         '#374151',
                  cursor:        'pointer',
                  fontFamily:    '"JetBrains Mono", monospace',
                  fontSize:      '12px',
                  lineHeight:    1,
                  padding:       '2px 4px',
                  transition:    'color 0.12s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F3F4F6'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#374151'; }}
              >
                ×
              </button>
            </div>

            <p style={{
              fontFamily:  '"Inter", sans-serif',
              fontSize:    '14px',
              color:       '#E5E7EB',
              lineHeight:   1.6,
              margin:      '0 0 12px 0',
            }}>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Bienvenido.</span> Mandale interactuar a la OS Terminal de abajo o a la barra lateral para explorar mi portfolio. Mis e-commerce se están reescribiendo a nuevas arquitecturas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Hint icon="◈" text="Barra lateral izquierda → abre secciones" />
              <Hint icon="⌨" text="Ctrl + K → activa la terminal de comandos" />
              <Hint icon="⚙" text="sudo debug → modo inspector de elementos" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hint = ({ icon, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ color: '#FF007F', fontSize: '12px', flexShrink: 0 }}>{icon}</span>
    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#D1D5DB', letterSpacing: '0.02em' }}>
      {text}
    </span>
  </div>
);

export default SystemToast;
