import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Specs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="specs" ref={ref} className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start justify-center">
        
        {/* Left: Photo inside a Neumorphic Inset Frame */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6 }}
           className="relative"
        >
          {/* Neumorphic Frame */}
          <div className="bg-[#121212] p-4 shadow-neu-out rounded-3xl border border-white/5 relative w-64 md:w-[280px] aspect-[3/4] flex flex-col items-center justify-center">
            {/* The Inset Area for the Image */}
            <div className="relative w-full h-full rounded-2xl bg-[#0a0a0a]">
              <img
                src="/foto-mia.png"
                alt="Uriel Garmendia"
                className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
                style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />
              {/* Overlay for pristine Inset Shadow (prevents Webkit clipping mask bug) */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-neu-in border border-black/50" />
            </div>
          </div>
        </motion.div>

        {/* Right: Diagnostic Console (Software Window) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={inView ? { opacity: 1, scale: 1 } : {}}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="relative max-w-lg w-full"
        >
          {/* Neumorphic Console Base (Brushed Metal) */}
          <div className="bg-brushed-metal p-8 rounded-3xl shadow-neu-out border border-[#333] relative flex flex-col gap-6">
             
             {/* System Info Header */}
             <div className="border-b-2 border-[#181818] pb-4 mb-2">
                <h2 className="font-display font-bold text-3xl uppercase tracking-widest text-stamped">
                  Sobre Mí
                </h2>
                <span className="font-mono font-black text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Perfil Profesional
                </span>
             </div>

             {/* Diagnostic Console Data */}
             <div className="flex flex-col gap-4 font-mono">
               <div className="bg-[#0a0a0a] shadow-neu-in rounded-xl p-4 border border-black/50 text-sm tracking-wide text-software-blue/80 flex flex-col gap-2">
                  <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
                    <span className="opacity-50 text-xs text-zinc-400">Nombre:</span>
                    <span className="font-bold text-white text-right">Uriel Garmendia</span>
                  </div>
                  <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
                    <span className="opacity-50 text-xs text-zinc-400">Rol:</span>
                    <span className="font-bold text-white text-right">Desarrollador Full Stack</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-50 text-xs text-zinc-400">Experiencia:</span>
                    <span className="font-bold text-white text-right">+2 Años</span>
                  </div>
               </div>
             </div>

             <div className="pt-2">
                <p className="font-sans text-sm font-medium leading-relaxed text-zinc-400 text-justify relative z-10">
                  Me especializo en el Desarrollo Web Full Stack, con un fuerte interés en estructurar plataformas y sistemas de gestión integrales. Disfruto enfrentarme a nuevos problemas lógicos e investigar cómo resolverlos paso a paso, garantizando siempre que el código y la interfaz cumplan con los más altos estándares de calidad.
                </p>
             </div>
          </div>

          {/* Neumorphic Brushed Metal Button */}
          <div className="mt-8 flex justify-center">
             <a
               href="/Uriel-Garmendia-CV.pdf"
               download="Uriel_Garmendia_CV.pdf"
               className="bg-[#121212] hover:brightness-110 text-white font-sans font-bold text-xs uppercase tracking-[0.2em] py-4 px-8 rounded-2xl transition-all shadow-neu-out active:shadow-neu-in border border-white/5 flex items-center gap-3 select-none"
             >
               <span>Descargar Curriculum Vitae</span>
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
