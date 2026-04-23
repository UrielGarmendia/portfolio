import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Plugin personalizado: sirve PDFs antes del SPA fallback de Vite.
const servePublicFiles = () => ({
  name: 'serve-public-files',
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent(req.url.split('?')[0]);
        if (url.endsWith('.pdf')) {
          const filePath = path.resolve(process.cwd(), 'public', url.slice(1));
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    };
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), servePublicFiles()],

  build: {
    // Advertir si algún chunk supera 400 KB (gzip ~130 KB típicamente)
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) requiere manualChunks como función
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/'))    return 'react-vendor';
            if (id.includes('framer-motion'))                          return 'motion';
            if (id.includes('recharts'))                               return 'charts';
            if (id.includes('@emailjs'))                               return 'email';
            if (id.includes('lucide-react'))                           return 'icons';
            if (id.includes('lenis'))                                  return 'scroll';
            if (id.includes('uvcanvas'))                               return 'canvas';
          }
        },
      },
    },

    // Minificación agresiva en producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console:  true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
      },
    },

    // Target moderno: reduce polyfills para browsers desde 2019+
    target: 'es2020',
  },

  // Pre-bundling de dependencias críticas en dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand'],
  },
})
