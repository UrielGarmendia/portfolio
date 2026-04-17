/**
 * useSystemStore.js
 * ─────────────────────────────────────────────────────────
 * Manejador del estado global de todo el OS usando Zustand.
 * Qué pilla esto:
 *  - El registro de ventanas (cuál está abierta, minimizada, apilamiento z-index)
 *  - El Modo Debug de Ingeniería (la cajita inspectora y el grid)
 *  - El estado de la Terminal (el historial de comandos, filtros activos)
 * ─────────────────────────────────────────────────────────
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// ── Window IDs ──────────────────────────────────────────────
export const WINDOW_IDS = {
  ABOUT:    'about',
  STACK:    'stack',
  PROJECTS: 'projects',
  CONTACT:  'contact',
};

// ── Window default configs ──────────────────────────────────
const DEFAULT_WINDOWS = {
  [WINDOW_IDS.ABOUT]: {
    id:         WINDOW_IDS.ABOUT,
    title:      'about.exe',
    label:      'Sobre Mí',
    isOpen:     false,
    isMinimized: false,
    zIndex:     10,
    defaultPosition: { x: 60,  y: 60  },
  },
  [WINDOW_IDS.STACK]: {
    id:         WINDOW_IDS.STACK,
    title:      'stack.sys',
    label:      'Tech Stack',
    isOpen:     false,
    isMinimized: false,
    zIndex:     10,
    defaultPosition: { x: 120, y: 100 },
  },
  [WINDOW_IDS.PROJECTS]: {
    id:         WINDOW_IDS.PROJECTS,
    title:      'projects.db',
    label:      'Proyectos',
    isOpen:     false,
    isMinimized: false,
    zIndex:     10,
    defaultPosition: { x: 200, y: 80  },
  },
  [WINDOW_IDS.CONTACT]: {
    id:         WINDOW_IDS.CONTACT,
    title:      'contact.sh',
    label:      'Contacto',
    isOpen:     false,
    isMinimized: false,
    zIndex:     10,
    defaultPosition: { x: 300, y: 120 },
  },
};

// ── Z-index counter ─────────────────────────────────────────
let zCounter = 20;

const getNextZ = () => {
  zCounter += 1;
  return zCounter;
};

// ── Store ───────────────────────────────────────────────────
const useSystemStore = create(
  devtools(
    persist(
      (set, get) => ({

        // ══ HYDRATION ══════════════════════════════════════════
        _hasHydrated: false,
        setHasHydrated: (state) => set({ _hasHydrated: state }, false, 'setHasHydrated'),

        // ══ SISTEMA DE VENTANAS ════════════════════════════════════

        /** Registro de todas las ventanas por su WINDOW_ID */
        windows: { ...DEFAULT_WINDOWS },

      /**
       * openWindow(id)
       * Abre la ventana si está cerrada, la desminimiza si hace falta,
       * y la manda al tope del z-index para que tape al resto.
       */
      openWindow: (id) => {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isOpen:      true,
              isMinimized: false,
              zIndex:      getNextZ(),
            },
          },
        }), false, `openWindow/${id}`);
      },

      /**
       * closeWindow(id)
       * Oculta la ventana del DOM (pasa isOpen a false).
       */
      closeWindow: (id) => {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isOpen:      false,
              isMinimized: false,
            },
          },
        }), false, `closeWindow/${id}`);
      },

      /**
       * minimizeWindow(id)
       * La deja viviendo en la memoria pero oculta en pantalla.
       * Aparece apagadita en el dock o barra de tareas.
       */
      minimizeWindow: (id) => {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isMinimized: true,
            },
          },
        }), false, `minimizeWindow/${id}`);
      },

      /**
       * focusWindow(id)
       * Brings a window to the top of the z-index stack without
       * changing its open/minimized state.
       */
      focusWindow: (id) => {
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              zIndex: getNextZ(),
            },
          },
        }), false, `focusWindow/${id}`);
      },

      // ══ DEBUG MODE ════════════════════════════════════════

      /**
       * isDebugActive — Engineering Debug Mode
       * When true:
       *  - Renders coordinate grid that tracks mouse position
       *  - Reveals dashed-border overlays on all components
       *  - Shows live prop tooltips on interactive elements
       */
      isDebugActive: false,

      /** Mouse position tracked when debug mode is active */
      mousePosition: { x: 0, y: 0 },

      toggleDebugMode: () => {
        set((state) => ({
          isDebugActive: !state.isDebugActive,
        }), false, 'toggleDebugMode');
      },

      setMousePosition: (x, y) => {
        set({ mousePosition: { x, y } }, false, 'setMousePosition');
      },

      // ══ TERMINAL ══════════════════════════════════════════

      /** Whether the terminal overlay is visible */
      isTerminalOpen: false,

      /** Typed history of commands entered by the user */
      terminalHistory: [
        { type: 'system', text: 'URIEL_OS v2.0 — Industrial Cyber-Tech Shell' },
        { type: 'system', text: 'Type `help` for available commands.' },
      ],

      /** Active technology filter for project cards (null = show all) */
      activeFilter: null,

      /** Last executed command string */
      lastCommand: null,

      openTerminal: () => set({ isTerminalOpen: true  }, false, 'openTerminal'),
      closeTerminal: () => set({ isTerminalOpen: false }, false, 'closeTerminal'),
      toggleTerminal: () => set(
        (s) => ({ isTerminalOpen: !s.isTerminalOpen }),
        false,
        'toggleTerminal'
      ),

      /**
       * pushToHistory(entry)
       * Appends an entry to the terminal output log.
       * Entry shape: { type: 'command'|'output'|'error'|'system', text: string }
       */
      pushToHistory: (entry) => {
        set((state) => ({
          terminalHistory: [...state.terminalHistory, entry],
        }), false, 'pushToHistory');
      },

      clearHistory: () => {
        set({
          terminalHistory: [
            { type: 'system', text: 'Terminal cleared. Session continues.' },
          ],
        }, false, 'clearHistory');
      },

      setActiveFilter: (filter) => {
        set({ activeFilter: filter }, false, `setActiveFilter/${filter}`);
      },

      clearFilter: () => {
        set({ activeFilter: null }, false, 'clearFilter');
      },

      // ══ COMMAND PARSER ════════════════════════════════════

      /**
       * executeCommand(rawInput)
       * Parses a raw string from the terminal input and
       * dispatches the appropriate state mutations + side-effects.
       *
       * Supported commands:
       *  ls                     → list all windows
       *  ls proyectos           → open projects window
       *  open <window>          → open a specific window
       *  filter --<tech>        → filter project cards by tech
       *  filter --clear         → remove active filter
       *  sudo debug             → toggle debug mode
       *  clear                  → clear terminal history
       *  help                   → list available commands
       */
      executeCommand: (rawInput) => {
        const { pushToHistory, openWindow, toggleDebugMode,
                setActiveFilter, clearFilter, clearHistory,
                windows } = get();

        const input = rawInput.trim().toLowerCase();
        const parts = input.split(/\s+/);
        const [cmd, ...args] = parts;

        // Echo the command
        pushToHistory({ type: 'command', text: `$ ${rawInput.trim()}` });

        set({ lastCommand: input });

        // ── ls ───────────────────────────────────────────
        if (cmd === 'ls') {
          if (!args.length || args[0] === '-a') {
            pushToHistory({
              type: 'output',
              text: Object.values(windows)
                .map((w) => `  ${w.isOpen ? '▶' : '○'} ${w.title.padEnd(18)} [${w.id}]`)
                .join('\n'),
            });
            return;
          }
          if (args[0] === 'proyectos' || args[0] === 'projects') {
            openWindow(WINDOW_IDS.PROJECTS);
            pushToHistory({ type: 'output', text: '  Opening projects.db...' });
            return;
          }
        }

        // ── open ─────────────────────────────────────────
        if (cmd === 'open') {
          const target = args[0];
          const match = Object.values(WINDOW_IDS).find(
            (id) => id === target || id.startsWith(target)
          );
          if (match) {
            openWindow(match);
            pushToHistory({ type: 'output', text: `  Mounting ${match}...` });
          } else {
            pushToHistory({ type: 'error', text: `  Error: window '${target}' not found.` });
          }
          return;
        }

        // ── filter ───────────────────────────────────────
        if (cmd === 'filter') {
          const flag = args[0]; // e.g. "--react"
          if (!flag) {
            pushToHistory({ type: 'error', text: '  Usage: filter --<tech> | filter --clear' });
            return;
          }
          if (flag === '--clear') {
            clearFilter();
            openWindow(WINDOW_IDS.PROJECTS);
            pushToHistory({ type: 'output', text: '  Filter cleared. Showing all projects.' });
            return;
          }
          const tech = flag.replace(/^--/, '');
          setActiveFilter(tech);
          openWindow(WINDOW_IDS.PROJECTS);
          pushToHistory({ type: 'output', text: `  Applying glitch filter: ${tech.toUpperCase()}` });
          return;
        }

        // ── sudo debug ───────────────────────────────────
        if (cmd === 'sudo' && args[0] === 'debug') {
          const next = !get().isDebugActive;
          toggleDebugMode();
          pushToHistory({
            type:  next ? 'output' : 'system',
            text:  next
              ? '  [DEBUG] Engineering overlay ACTIVE — rendering props & grid.'
              : '  [DEBUG] Engineering overlay DEACTIVATED.',
          });
          return;
        }

        // ── clear ────────────────────────────────────────
        if (cmd === 'clear') {
          clearHistory();
          return;
        }

        // ── help ─────────────────────────────────────────
        if (cmd === 'help') {
          pushToHistory({
            type: 'output',
            text: [
              '  Available commands:',
              '  ─────────────────────────────────────',
              '  ls                    List all windows',
              '  ls proyectos          Open projects window',
              '  open <id>             Open window by id',
              '  filter --<tech>       Filter projects by technology',
              '  filter --clear        Remove active filter',
              '  sudo debug            Toggle engineering debug mode',
              '  clear                 Clear terminal output',
              '  help                  Show this menu',
            ].join('\n'),
          });
          return;
        }

        // ── Unknown ──────────────────────────────────────
        pushToHistory({
          type: 'error',
          text: `  Command not found: '${cmd}'. Try 'help'.`,
        });
      },
      }),
      {
        name: 'uriel_os_state',
        onRehydrateStorage: () => (state) => {
          if (state) state.setHasHydrated(true);
        },
      }
    ),
    { name: 'URIEL_OS_Store' }
  )
);

export default useSystemStore;
