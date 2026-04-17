import DraggableWindow from '../os/DraggableWindow';
import { WINDOW_IDS } from '../../store/useSystemStore';
import { Monitor, Cpu, Database, Blocks, CircleDashed } from 'lucide-react';

const skillsData = [  
  { category: 'Lenguajes', icon: <Cpu size={16} />, items: ['HTML', 'CSS', 'JavaScript', 'Python'], color: '#0078D7' },
  { category: 'Frameworks', icon: <Blocks size={16} />, items: ['React', 'Redux', 'Bootstrap', 'Tailwind', 'EJS', 'Express.js', 'Node.js'], color: '#388E3C' },
  { category: 'Bases de Datos', icon: <Database size={16} />, items: ['MySQL', 'PostgreSQL'], color: '#D3B58D' },
  { category: 'Herramientas', icon: <Monitor size={16} />, items: ['Ajax', 'Web Server', 'APIs', 'ORM'], color: '#C586C0' },
  { category: 'Agile', icon: <CircleDashed size={16} />, items: ['Scrum'], color: '#4FC1FF' },
];

const StackWindow = ({ constraintsRef }) => {
  const allSkills = skillsData.flatMap(cat => cat.items.map(item => ({ item, color: cat.color, icon: cat.icon })));

  return (
    <DraggableWindow
      id={WINDOW_IDS.STACK}
      title="stack.sys"
      constraintsRef={constraintsRef}
      defaultPosition={{ x: 500, y: 70 }}
      width="800px"
      height="600px"
    >
      <div className="bg-[#121212] p-6 lg:p-8 relative flex flex-col gap-10 min-h-full rounded-2xl shadow-neu-out border border-[#222]">
        
        <div className="w-full bg-[#050505] border border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] rounded-2xl py-5 overflow-hidden relative">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {skillsData.map((mod) => (
             <div key={mod.category} className="bg-[#1A1A1C] p-5 rounded-2xl shadow-neu-out border border-[#222] font-mono select-none hover:border-[#333] transition-colors">
                <h3 className="font-bold text-[11px] tracking-widest uppercase mb-6 flex items-center gap-3" style={{ color: mod.color }}>
                  <span className="opacity-80 p-2 bg-black/40 rounded-lg border border-white/5">{mod.icon}</span> 
                  {mod.category}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {mod.items.map(item => (
                    <span key={item} className="bg-[#0a0a0a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] text-gray-300 text-[10px] px-3 py-1.5 rounded-full border border-[#111] hover:border-[#333] transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </DraggableWindow>
  );
};

export default StackWindow;
