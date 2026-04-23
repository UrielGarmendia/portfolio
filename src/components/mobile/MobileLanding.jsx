import { lazy, Suspense } from 'react';
import Hero from '../Hero';
import Specs from '../Specs';

// Carga diferida — secciones below-the-fold no bloquean el hilo principal
const Skills   = lazy(() => import('../Skills'));
const Projects = lazy(() => import('../Projects'));
const Contact  = lazy(() => import('../Contact'));

const FallbackSection = () => (
  <div className="py-24 flex items-center justify-center" aria-hidden="true">
    <div className="w-6 h-6 rounded-full border border-white/10 animate-pulse" />
  </div>
);

const BaseLanding = () => {
  return (
    <main
      id="main-content"
      aria-label="Contenido principal del portfolio"
      className="text-white min-h-screen font-sans selection:bg-software-blue/30 selection:text-white relative z-10 pb-20"
    >
      <Hero />
      <Specs />
      <Suspense fallback={<FallbackSection />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<FallbackSection />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<FallbackSection />}>
        <Contact />
      </Suspense>

      <div className="py-8 text-center border-t border-white/5 opacity-50 font-mono text-xs tracking-widest uppercase">
         Uriel Garmendia · Portfolio 
      </div>
    </main>
  );
};

export default BaseLanding;
