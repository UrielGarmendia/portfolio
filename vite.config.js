import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Custom plugin: intercept PDF requests BEFORE Vite's SPA fallback.
// Returning a function from configureServer registers it as a post-middleware
// that runs prior to Vite's internal html fallback handler.
const servePublicFiles = () => ({
  name: 'serve-public-files',
  configureServer(server) {
    // ← Returning the function is the key — this runs BEFORE Vite's SPA fallback
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
})
