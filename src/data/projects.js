/**
 * projects.js — Datos canónicos de proyectos
 * ─────────────────────────────────────────────────────────────────────────────
 * Todos los imageUrl apuntan a /public/ (Vite los sirve como rutas absolutas).
 * El campo `architecture` alimenta la cara trasera del ProjectCard (flip 3D).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projectsData = [
  {
    id:    'mi-planner',
    title: 'Mi Planner',
    role:  'Full Stack Developer',
    techStack: ['React', 'JavaScript', 'CSS', 'Node.js'],
    simpleDesc:
      'Herramienta de organización personal y gestión de tareas estructurada para maximizar la productividad.',
    academicChallenge:
      'Manejo complejo de estado global y persistencia de datos para asegurar que las tareas, calendarios y recordatorios se mantengan sincronizados sin latencia perceptible.',
    repoUrl:   'https://github.com/UrielGarmendia',
    deployUrl: 'https://mi-planner.netlify.app/',
    imageUrl:  '/projects/mi-planner.png',
    architecture: [
      { label: 'React UI',         sublabel: 'Context & Hooks', type: 'client' },
      { label: 'State Management', sublabel: 'Local Storage',   type: 'db' }
    ],
    dataFlow: '[User Input] <--(Events)--> [React State] <--(Sync)--> [Storage]',
  },
  {
    id:    'fitxperience',
    title: 'FitXperience',
    role:  'Full Stack Architect',
    techStack: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'React (En Migración)'],
    simpleDesc:
      'Plataforma integral de E-commerce orientada al mercado fitness. Desarrollada originalmente como proyecto final en Digital House (2022), actualmente está atravesando una reestructuración completa para modernizar todo el código a tecnologías web de 2026.',
    academicChallenge:
      'Llevar a cabo una actualización total de un proyecto Full Stack heredado. Esto implica rediseñar la seguridad con JWT, los modelos de la base de datos (Sequelize), y construir un panel de administración interactivo desde cero usando React.',
    repoUrl:   '',
    deployUrl: '',
    inRedesign: true,
    imageUrl:  '/projects/fitxperience.png',
    architecture: [
       { label: 'Core Backend', sublabel: 'Node / Express API', type: 'api' },
       { label: 'Relational DB', sublabel: 'Sequelize ORM', type: 'db' },
    ],
    dataFlow: '[Legacy SSR] --(Refactoring)--> [React SPA / RESTful API]',
  },
  {
    id:    'cocheando',
    title: 'Cocheando',
    role:  'Full Stack Developer',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT'],
    simpleDesc:
      'Plataforma de compra-venta de autos con autenticación JWT, roles de usuario, y panel de administración. Proyecto académico UADE.',
    academicChallenge:
      'Modelar un sistema de publicaciones con estados de ciclo de vida (Disponible → Reservado → Vendido) y asegurar consistencia transaccional en la compra usando Sequelize transactions.',
    repoUrl:   'https://github.com/UrielGarmendia',
    deployUrl: 'https://blog-personal-tp2.netlify.app/',
    imageUrl:  '/projects/cocheando.png',
    architecture: [
      { label: 'React Client',   sublabel: 'Vite · Context API',    type: 'client'  },
      { label: 'Express API',    sublabel: 'REST · JWT Middleware',  type: 'api'     },
      { label: 'Database',       sublabel: 'MySQL · Relacional',     type: 'db'      },
    ],
    dataFlow: '[Client React] <--(JSON)--> [Node/Express API] <--(Query)--> [Database]',
  },
  {
    id:    'ong-ecofuturo',
    title: 'ONG EcoFuturo',
    role:  'Fullstack Developer',
    techStack: ['HTML', 'CSS Avanzado', 'JavaScript'],
    simpleDesc:
      'Plataforma de datos de reforestación con impacto visual. Dark Mode nativo y animaciones de alta respuesta. Proyecto académico UADE.',
    academicChallenge:
      'Renderizar gráficos SVG de datos complejos sin librerías, calculando coordenadas dinámicamente desde arrays de datos crudos usando transformaciones matemáticas puras.',
    repoUrl:   'https://github.com/UrielGarmendia/ONG-Ecofuturo',
    deployUrl: 'https://ong-tp-final.netlify.app/',
    imageUrl:  '/projects/ecofuturo.png',
    architecture: [
      { label: 'Vanilla JS',   sublabel: 'DOM API · Events',    type: 'client'  },
      { label: 'SVG Engine',   sublabel: 'Dynamic Coord Calc',  type: 'service' },
      { label: 'In-Memory DB', sublabel: 'JS Arrays · JSON',    type: 'db'      },
    ],
    dataFlow: '[Client Interface] <--(Events)--> [Logic Engine] <--(Data)--> [In-Memory Storage]',
  },
  {
    id:    'garmendia-cia',
    title: 'Garmendia & Cia',
    role:  'Frontend Developer',
    techStack: ['React', 'CSS Avanzado'],
    simpleDesc:
      'Caso de Estudio de UI/UX Conceptual - Desarrollo Pausado.',
    academicChallenge:
      'Construir un sitio completamente estático y optimizado para SEO sin framework de routing, usando React como motor de renderizado puro con zero dependencias de backend.',
    repoUrl:   'https://github.com/UrielGarmendia/garmendia-cia',
    deployUrl: 'https://garmendiaycia.netlify.app/',
    imageUrl:  '/projects/garmendiaycia.png',
    architecture: [
      { label: 'React SPA',    sublabel: 'Static · No Router',   type: 'client'  },
      { label: 'Netlify CDN',  sublabel: 'Edge Distribution',    type: 'service' },
    ],
    dataFlow: '[Browser Client] <--(HTTP)--> [Netlify Edge] <--(Bundler)--> [React SPA]',
  },
  {
    id:    'identikit',
    title: 'Identikit',
    role:  'Frontend Developer',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    simpleDesc:
      'Plataforma web interactiva centrada en la experiencia musical y búsqueda visual fluida.',
    academicChallenge:
      'Implementación de animaciones complejas de UI con Framer Motion, logrando una estética musical vibrante sin pérdida de rendimiento (60fps en mobile).',
    repoUrl:   'https://github.com/UrielGarmendia/identikittv',
    deployUrl: 'https://identikittv.netlify.app/',
    imageUrl:  '/projects/identikit.png',
    architecture: [
      { label: 'React SPA',     sublabel: 'Context State',     type: 'client' },
      { label: 'Animation API', sublabel: 'Framer Pipeline',   type: 'service'}
    ],
    dataFlow: '[User Gesture] <--(Event)--> [React State] <--(Render)--> [Framer Motion Engine]',
  },
  {
    id:    'linktree-clone',
    title: 'Linktree Hub',
    role:  'Frontend Developer',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    simpleDesc:
      'Landing page minimalista ultra-rápida construida sin frameworks para centralizar enlaces sociales.',
    academicChallenge:
      'Alcanzar 100/100 en Lighthouse Mobile limitando peticiones HTTP y aprovechando variables CSS nativas para tematización extrema.',
    repoUrl:   'https://github.com/UrielGarmendia/linktree',
    deployUrl: 'https://urielgarmendialinks.netlify.app/',
    imageUrl:  '/projects/linktree.png',
    architecture: [
      { label: 'Static HTML',   sublabel: 'DOM Native',    type: 'client' },
      { label: 'CSS Engine',    sublabel: 'Vars Theming',  type: 'client' }
    ],
    dataFlow: '[Browser Cache] <--(Static Serve)--> [Device Screen]',
  }
];
