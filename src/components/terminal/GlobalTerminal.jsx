import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSystemStore, { WINDOW_IDS } from '../../store/useSystemStore';

const buildCommandRegistry = () => {
  const gs = () => useSystemStore.getState();

  const registry = new Map();

  registry.set('help', {
    description: 'Lista todos los comandos disponibles',
    usage:       'help',
    execute: () => {
      const lines = ['', '  URIEL_OS — Comandos Disponibles', '  ' + '─'.repeat(42)];
      for (const [name, def] of registry.entries()) {
        lines.push(`  ${name.padEnd(22)} ${def.description}`);
      }
      lines.push('');
      gs().pushToHistory({ type: 'output', text: lines.join('\n') });
      return { status: 'ok', message: 'Ayuda cargada.' };
    },
  });

  registry.set('open', {
    description: 'Abrir una ventana   →  open about | open stack | open projects',
    usage:       'open <window>',
    execute: (args) => {
      const target = args[0]?.toLowerCase();
      const windowMap = {
        about:    WINDOW_IDS.ABOUT,
        stack:    WINDOW_IDS.STACK,
        projects: WINDOW_IDS.PROJECTS,
        project:  WINDOW_IDS.PROJECTS,
        contact:  WINDOW_IDS.CONTACT,
      };
      const id = windowMap[target];
      if (!id) {
        gs().pushToHistory({
          type: 'error',
          text: `  Ventana desconocida: '${target}'. Fijate si es: about, stack, projects, contact`,
        });
        return { status: 'error', message: `Ventana '${target}' no encontrada.` };
      }
      gs().openWindow(id);
      gs().pushToHistory({ type: 'output', text: `  Montando ${id}.sys → listo rey.` });
      return { status: 'ok', message: `Abriendo ${id}...` };
    },
  });

  registry.set('ls', {
    description: 'Listar ventanas listas para abrir',
    usage:       'ls [proyectos]',
    aliases:     ['dir'],
    execute: (args) => {
      const target = args[0]?.toLowerCase();
      if (target === 'proyectos' || target === 'projects') {
        gs().openWindow(WINDOW_IDS.PROJECTS);
        gs().pushToHistory({ type: 'output', text: '  Abriendo la base de datos de proyectos...' });
        return { status: 'ok', message: 'Abriendo proyectos...' };
      }
      const { windows } = gs();
      const lines = Object.values(windows).map(
        (w) => `  ${w.isOpen ? '▶' : '○'}  ${w.title.padEnd(18)} [${w.id}]`
      );
      gs().pushToHistory({ type: 'output', text: lines.join('\n') });
      return { status: 'ok', message: 'Listado.' };
    },
  });

  registry.set('filter', {
    description: 'Filtrar proyectos por tecnología  →  filter --react | filter --clear',
    usage:       'filter --<tech> | filter --clear',
    execute: (args) => {
      const flag = args[0];
      if (!flag?.startsWith('--')) {
        gs().pushToHistory({ type: 'error', text: '  Uso: filter --<tecnologia> | filter --clear' });
        return { status: 'error', message: 'Sintaxis de filtro inválida.' };
      }
      const value = flag.slice(2);
      if (value === 'clear') {
        gs().clearFilter();
        gs().pushToHistory({ type: 'output', text: '  Filtro borrado — mostrando todos los proyectos.' });
        return { status: 'ok', message: 'Filtro borrado.' };
      }
      gs().setActiveFilter(value);
      gs().openWindow(WINDOW_IDS.PROJECTS);
      gs().pushToHistory({
        type: 'output',
        text: `  Aplicando recuento de bytes y filtro glitch: [ ${value.toUpperCase()} ]`,
      });
      return { status: 'ok', message: `Filtro: ${value}` };
    },
  });

  registry.set('sudo', {
    description: 'Comandos de chapa alta  →  sudo debug',
    usage:       'sudo <command>',
    execute: (args) => {
      const sub = args[0]?.toLowerCase();
      if (sub === 'debug') {
        const { isDebugActive } = gs();
        gs().toggleDebugMode();
        const next = !isDebugActive;
        gs().pushToHistory({
          type: next ? 'output' : 'system',
          text: next
            ? '  [MODO DEBUG] Capa de ingeniería ACTIVADA\n  Grilla de ref y tooltips prendidos.'
            : '  [MODO DEBUG] Apagado.',
        });
        return {
          status:  'ok',
          message: next ? 'Debug Prendido' : 'Debug Apagado',
        };
      }
      gs().pushToHistory({ type: 'error', text: `  sudo: no reconozco el sub-comando '${sub}'` });
      return { status: 'error', message: `Comando sudo inválido: ${sub}` };
    },
  });

  registry.set('rm', {
    description: 'Reventar los datos del sistema  →  rm -rf /',
    usage:       'rm -rf /',
    execute: (args) => {
      const fullArgs = args.join(' ');
      if (fullArgs === '-rf /') {
        localStorage.clear();
        for (const id of Object.values(WINDOW_IDS)) gs().closeWindow(id);
        gs().pushToHistory({ type: 'error', text: '  [FATAL] Sistema destruido. Reiniciando...' });
        
        document.body.classList.add('glitch-load');
        setTimeout(() => document.body.classList.remove('glitch-load'), 1000);

        return { status: 'error', message: 'Sistema borrado.' };
      }
      gs().pushToHistory({ type: 'error', text: `  rm: no se puede borrar '${fullArgs}': Te faltan permisos, mostro.` });
      return { status: 'error', message: 'Permiso denegado.' };
    },
  });

  registry.set('download', {
    description: 'Bajar mi Currículum  →  download cv',
    usage:       'download cv',
    aliases:     ['export'],
    execute: (args) => {
      const target = args[0]?.toLowerCase();
      if (target === 'cv' || target === 'resume') {
        gs().pushToHistory({ type: 'output', text: '  [OK] Buscando Uriel-Garmendia-CV.pdf...' });
        fetch('/Uriel-Garmendia-CV.pdf')
          .then((res) => {
            if (!res.ok) throw new Error('File not found');
            return res.blob();
          })
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Uriel-Garmendia-CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            gs().pushToHistory({ type: 'output', text: '  [OK] Descarga arrancada.' });
          })
          .catch(() => {
            gs().pushToHistory({ type: 'error', text: '  [ERR] Che, el archivo CV no aparece en el server.' });
          });
        return { status: 'ok', message: 'Bajando CV...' };
      }
      gs().pushToHistory({ type: 'error', text: `  Destino desconocido: '${target}'. Probá usar 'download cv'` });
      return { status: 'error', message: `Objetivo falso: ${target}` };
    },
  });

  registry.set('clear', {
    description: 'Limpiar historial de la terminal',
    usage:       'clear',
    execute: () => {
      gs().clearHistory();
      return { status: 'ok', message: 'Limpito.' };
    },
  });

  registry.set('close', {
    description: 'Cerrar una ventana por nombre',
    usage:       'close <window>',
    execute: (args) => {
      const target = args[0]?.toLowerCase();
      const windowMap = {
        about:    WINDOW_IDS.ABOUT,
        stack:    WINDOW_IDS.STACK,
        projects: WINDOW_IDS.PROJECTS,
        contact:  WINDOW_IDS.CONTACT,
      };
      const id = windowMap[target];
      if (!id) {
        gs().pushToHistory({ type: 'error', text: `  Cero chances, no hay ninguna ventana que se llame '${target}'.` });
        return { status: 'error', message: `Ruta rota: ${target}` };
      }
      gs().closeWindow(id);
      gs().pushToHistory({ type: 'output', text: `  Cerrando ${id}...` });
      return { status: 'ok', message: `Cerrada la ventana ${id}.` };
    },
  });

  return registry;
};

const parse = (rawInput, registry) => {
  const tokens     = rawInput.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return { status: 'warn', message: '' };

  const [baseCmd, ...args] = tokens;

  if (registry.has(baseCmd)) {
    return registry.get(baseCmd).execute(args);
  }

  for (const [, def] of registry.entries()) {
    if (def.aliases?.includes(baseCmd)) {
      return def.execute(args);
    }
  }

  return { status: 'error', message: `Command not found: '${baseCmd}'. Type 'help'.` };
};

 const panelVariants = {
  collapsed: {
    height:  '44px',
    opacity:  1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  expanded: {
    height:  '340px',
    opacity:  1,
    transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
  },
};

const historyVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
};

const GlobalTerminal = () => {
  const isTerminalOpen  = useSystemStore((s) => s.isTerminalOpen);
  const terminalHistory = useSystemStore((s) => s.terminalHistory);
  const toggleTerminal  = useSystemStore((s) => s.toggleTerminal);
  const closeTerminal   = useSystemStore((s) => s.closeTerminal);
  const pushToHistory   = useSystemStore((s) => s.pushToHistory);

  const [inputValue,   setInputValue]   = useState('');
  const [feedback,     setFeedback]     = useState(null); 
  const [shellHistory, setShellHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [savedInput,   setSavedInput]   = useState('');

  const inputRef      = useRef(null);
  const historyEndRef = useRef(null);
  const registryRef   = useRef(null);

  useEffect(() => {
    registryRef.current = buildCommandRegistry();
  }, []); 
  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 2000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleExecute = useCallback(() => {
    const raw = inputValue.trim();
    if (!raw) return;

    pushToHistory({ type: 'command', text: `$ ${raw}` });

    setShellHistory((prev) => [raw, ...prev].slice(0, 50));
    setHistoryIndex(-1);
    setSavedInput('');

    const result = parse(raw, registryRef.current);

    if (result.message) setFeedback(result);

    setInputValue('');
  }, [inputValue, pushToHistory]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
      return;
    }

    if (e.key === 'Escape') {
      closeTerminal();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!shellHistory.length) return;
      const nextIndex = Math.min(historyIndex + 1, shellHistory.length - 1);
      if (historyIndex === -1) setSavedInput(inputValue); 
      setHistoryIndex(nextIndex);
      setInputValue(shellHistory[nextIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue(historyIndex === 0 ? savedInput : '');
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setInputValue(shellHistory[nextIndex]);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleTerminal();
    }
  }, [handleExecute, closeTerminal, toggleTerminal, shellHistory,
      historyIndex, inputValue, savedInput]);

  return (
    <motion.div
      data-os-ui="true"
      variants={panelVariants}
      animate={isTerminalOpen ? 'expanded' : 'collapsed'}
      initial="collapsed"
      className="fixed bottom-0 w-full left-0 md:left-1/2 md:-translate-x-1/2 md:w-[min(760px,96vw)] z-[9000]"
      style={{
        overflow:        'hidden',
        background:      'rgba(14, 14, 14, 0.97)',
        backdropFilter:  'blur(12px)',
        borderTop:       '1px solid rgba(255,0,127,0.35)',
        borderLeft:      '1px solid rgba(255,255,255,0.06)',
        borderRight:     '1px solid rgba(255,255,255,0.06)',
        fontFamily:      '"JetBrains Mono", monospace',
      }}
    >

      <div
        onClick={() => toggleTerminal()}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 16px',
          height:         '44px',
          borderBottom:   isTerminalOpen
                            ? '1px solid rgba(255,255,255,0.06)'
                            : 'none',
          cursor:         'pointer',
          userSelect:     'none',
          flexShrink:     0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            style={{
              width:        '6px',
              height:       '6px',
              borderRadius: '50%',
              background:   '#FF007F',
              flexShrink:   0,
            }}
          />
          <span style={{ fontSize: '11px', color: '#FF007F', letterSpacing: '0.14em' }}>
            TERMINAL
          </span>
          <span style={{ fontSize: '10px', color: '#3a3a3a', letterSpacing: '0.08em' }}>
            // URIEL_OS v2.0
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AnimatePresence>
            {feedback && (
              <motion.span
                key={feedback.message}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize:    '10px',
                  fontFamily:  '"JetBrains Mono", monospace',
                  color:       feedback.status === 'ok' ? '#4ade80' : '#FF007F',
                  letterSpacing: '0.08em',
                }}
              >
                {feedback.status === 'ok' ? '[OK]' : '[ERR]'} {feedback.message}
              </motion.span>
            )}
          </AnimatePresence>

          <span style={{ fontSize: '9px', color: '#2e2e2e', letterSpacing: '0.1em' }}>
            CTRL + K
          </span>

          <motion.span
            animate={{ rotate: isTerminalOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: '10px', color: '#444', display: 'block' }}
          >
            ▲
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            variants={historyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              height:      '248px',
              overflowY:   'auto',
              overflowX:   'hidden',
              padding:     '12px 16px 4px',
              scrollbarWidth:  'thin',
              scrollbarColor:  '#FF007F22 transparent',
            }}
            className="window-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {terminalHistory.map((entry, i) => (
              <HistoryLine key={i} entry={entry} />
            ))}
            <div ref={historyEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '8px',
          padding:      '0 16px',
          height:       '44px',
          borderTop:    isTerminalOpen
                          ? '1px solid rgba(255,255,255,0.05)'
                          : 'none',
          flexShrink:   0,
        }}
      >
        <span
          style={{
            fontSize:      '12px',
            color:         '#FF007F',
            letterSpacing: '0.04em',
            whiteSpace:    'nowrap',
            flexShrink:    0,
          }}
        >
          uriel@sys:~$
        </span>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            e.stopPropagation();
            if (!isTerminalOpen) toggleTerminal();
          }}
          placeholder={isTerminalOpen ? "escribí un comando — o tirá 'help' para ver qué onda" : ''}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          style={{
            flex:          1,
            background:    'transparent',
            border:        'none',
            outline:       'none',
            color:         '#F3F4F6',
            fontFamily:    '"JetBrains Mono", monospace',
            fontSize:      '13px',
            letterSpacing: '0.03em',
            caretColor:    '#FF007F',
            borderBottom:  '1px solid rgba(255,0,127,0.0)',
            paddingBottom:  '2px',
            transition:    'border-color 0.15s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = 'rgba(255,0,127,0.5)';
            if (!isTerminalOpen) toggleTerminal();
          }}
          onBlur={(e) => {
            e.target.style.borderBottomColor = 'rgba(255,0,127,0.0)';
          }}
        />

        {isTerminalOpen && inputValue &&  (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => { e.stopPropagation(); handleExecute(); }}
            style={{
              background:    'rgba(255,0,127,0.12)',
              border:        '1px solid rgba(255,0,127,0.3)',
              color:         '#FF007F',
              fontFamily:    '"JetBrains Mono", monospace',
              fontSize:      '9px',
              letterSpacing: '0.1em',
              padding:       '3px 8px',
              cursor:        'pointer',
              flexShrink:    0,
            }}
          >
            ENTER ↵
          </motion.button>
        )}
      </div>

    </motion.div>
  );
};

const LINE_STYLES = {
  command: { color: '#F3F4F6',     prefix: ''   },
  output:  { color: '#6b7280',     prefix: ''   },
  error:   { color: '#FF007F',     prefix: ''   },
  system:  { color: '#374151',     prefix: ''   },
  warn:    { color: '#f59e0b',     prefix: ''   },
};

const HistoryLine = ({ entry }) => {
  const style = LINE_STYLES[entry.type] ?? LINE_STYLES.output;

  return (
    <pre
      style={{
        margin:      '0 0 2px 0',
        fontFamily:  '"JetBrains Mono", monospace',
        fontSize:    '11px',
        lineHeight:  1.65,
        color:       style.color,
        whiteSpace:  'pre-wrap',
        wordBreak:   'break-word',
      }}
    >
      {entry.text}
    </pre>
  );
};


export default GlobalTerminal;
