import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Cpu, Database, Blocks, CircleDashed } from 'lucide-react';

const skillsData = [
  { category: 'Lenguajes', icon: <Cpu size={16} />, items: ['HTML', 'CSS', 'JavaScript', 'Python'], color: '#0078D7' },
  { category: 'Frameworks', icon: <Blocks size={16} />, items: ['React', 'Redux', 'Bootstrap', 'Tailwind', 'EJS', 'Express.js', 'Node.js'], color: '#388E3C' },
  { category: 'Bases de Datos', icon: <Database size={16} />, items: ['MySQL', 'PostgreSQL'], color: '#D3B58D' },
  { category: 'Herramientas', icon: <Monitor size={16} />, items: ['Ajax', 'Web Server', 'APIs', 'ORM'], color: '#C586C0' },
  { category: 'Agile', icon: <CircleDashed size={16} />, items: ['Scrum'], color: '#4FC1FF' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const allSkills = skillsData.flatMap(cat => cat.items.map(item => ({ item, color: cat.color, icon: cat.icon })));

  return (
    <section id="skills" ref={ref} className="py-24 px-6 relative flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="bg-[#121212] rounded-3xl shadow-neu-out border border-white/5 flex flex-col overflow-hidden relative">
          
          <div className="border-b-2 border-[#181818] bg-gradient-to-r from-[#1b1b1b] to-[#121212] px-6 py-4 flex justify-between items-center select-none z-20">
             <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                    [ Stack Tecnológico ]
                </span>
             </div>
             <div className="flex gap-1.5 opacity-80">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-inner" />
             </div>
          </div>

          <div className="p-6 lg:p-12 relative flex flex-col gap-12">
            
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6 }}
               className="w-full bg-[#050505] border border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] rounded-2xl py-6 overflow-hidden relative"
            >
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
                
                <div className="flex animate-marquee">
                   {[...allSkills, ...allSkills, ...allSkills, ...allSkills].map((obj, idx) => (
                      <span key={idx} className="flex items-center gap-3 mx-8 font-mono font-bold text-sm tracking-widest uppercase" style={{ color: obj.color }}>
                        <span className="opacity-70">{obj.icon}</span>
                        <span className="text-industrial-300">{obj.item}</span>
                        <span className="text-zinc-800 ml-6">/</span>
                      </span>
                   ))}
                </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
               {skillsData.map((mod) => (
                 <div key={mod.category} className="bg-[#1A1A1C] p-6 rounded-2xl shadow-neu-out border border-[#222] font-mono select-none hover:border-[#333] transition-colors">
                    <h3 className="font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-3" style={{ color: mod.color }}>
                      <span className="opacity-80 p-2 bg-black/40 rounded-lg border border-white/5">{mod.icon}</span> 
                      {mod.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {mod.items.map(item => (
                        <span key={item} className="bg-[#0a0a0a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] text-gray-300 text-xs px-4 py-2 rounded-full border border-[#111] hover:border-[#333] transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                 </div>
               ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
