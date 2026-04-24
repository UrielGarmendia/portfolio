
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const plateVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 20 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-12 md:pt-20">
      <motion.div
        className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center mt-8 md:mt-auto mb-20 md:mb-32"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ perspective: 1000 }}
      >
        <motion.div 
          variants={plateVariants} 
          className="w-full bg-[#121212] p-8 md:p-12 lg:p-20 shadow-neu-out rounded-3xl relative flex flex-col items-center border border-white/5"
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl tracking-widest uppercase m-0 p-0 text-stamped select-none relative z-10 mt-6 text-center">
            URIEL GARMENDIA
          </h1>
          <div className="w-[80%] h-1 bg-[#0a0a0a] shadow-neu-in my-8 rounded-full relative z-10" />
          <p className="font-sans font-bold text-lg md:text-2xl text-zinc-400 tracking-[0.3em] uppercase select-none text-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
            Desarrollador Full Stack
          </p>

          <p className="font-sans text-xs md:text-sm text-zinc-400 mt-6 max-w-xl font-medium leading-relaxed">
            Apasionado por el desarrollo de sistemas de gestión y la resolución analítica de problemas. Mi enfoque principal está en construir soluciones a medida mediante código limpio, lógico y escalable, priorizando la eficiencia en cada desafío técnico que asumo.
          </p>
        </motion.div>

        <motion.div variants={plateVariants} className="mt-12 flex flex-wrap gap-8 justify-center">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-center px-10 py-5 font-sans font-bold text-xs uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 bg-[#121212] shadow-neu-out active:shadow-neu-in text-gray-300 border border-white/5 select-none cursor-none"
          >
            Ver Mis Proyectos
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
