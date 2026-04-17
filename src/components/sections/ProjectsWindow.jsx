import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, LayoutGrid, Wrench } from 'lucide-react';
import DraggableWindow from '../os/DraggableWindow';
import { WINDOW_IDS } from '../../store/useSystemStore';
import { projectsData } from '../../data/projects';

const ProjectsWindow = ({ constraintsRef }) => {
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0]?.id);
  const activeProject = projectsData.find(p => p.id === activeProjectId) || projectsData[0];

  return (
    <DraggableWindow
      id={WINDOW_IDS.PROJECTS}
      title="projects.exe"
      constraintsRef={constraintsRef}
      defaultPosition={{ x: 200, y: 50 }}
      width="900px"
      height="650px"
    >
      <div className="flex flex-col md:flex-row gap-6 items-stretch h-full w-full bg-[#121212] p-4 font-sans text-white">
        
        <div className="w-[260px] flex flex-col p-5 rounded-3xl bg-[#18181a] shadow-neu-out border border-white/5 shrink-0 overflow-y-auto hidden-scrollbar">
           <h3 className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-6 flex items-center gap-2">
             <LayoutGrid size={14} /> Explorador
           </h3>
           
           <div className="flex flex-col gap-4">
              {projectsData.map(project => {
                 const isActive = activeProjectId === project.id;
                 return (
                   <button
                     key={project.id}
                     onClick={() => setActiveProjectId(project.id)}
                     className={`flex flex-col gap-1 px-4 py-3 rounded-2xl text-left transition-all duration-300 outline-none ${
                        isActive 
                          ? "bg-[#18181a] text-software-blue shadow-neu-in" 
                          : "bg-[#18181a] text-zinc-400 shadow-neu-out hover:text-white"
                     }`}
                   >
                      <span className="font-bold text-[13px] truncate w-full">{project.title}</span>
                      <span className={`text-[9px] font-mono tracking-wider ${isActive ? "text-software-blue/70" : "text-zinc-600"}`}>
                        {project.techStack.slice(0, 2).join(' • ')}
                      </span>
                   </button>
                 );
              })}
           </div>
        </div>

        <div className="flex-1 min-w-0 relative h-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeProject.id}
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -10 }}
               transition={{ duration: 0.3 }}
               className="flex flex-col p-6 rounded-3xl bg-[#1a1a1c] shadow-neu-out border border-white/5 h-full overflow-y-auto hidden-scrollbar"
             >
                <div className="w-full h-[180px] rounded-2xl overflow-hidden relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] mb-6 border border-white/5 shrink-0">
                   <img 
                      src={activeProject.imageUrl}
                      alt={activeProject.title}
                      className="w-full h-full object-cover object-top block"
                      onError={(e) => { e.currentTarget.style.display='none'; }}
                   />
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-software-blue text-[9px] font-mono tracking-widest uppercase">{activeProject.role}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {activeProject.title}
                  </h3>
                  
                  <div className="text-zinc-400 text-[12px] leading-relaxed mb-6 space-y-3">
                    <p>{activeProject.simpleDesc}</p>
                    {activeProject.academicChallenge && (
                      <p><span className="text-zinc-300 font-medium font-mono text-[10px] tracking-widest uppercase block mb-1">Challenge Académico</span> {activeProject.academicChallenge}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {activeProject.techStack.map(tech => (
                       <span key={tech} className="px-3 py-1.5 text-[9px] font-mono text-zinc-300 bg-[#161618] rounded-xl shadow-neu-in border border-white/5">
                         {tech}
                       </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {activeProject.inRedesign ? (
                      <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#18181a] text-amber-500/80 text-[11px] font-semibold opacity-80 select-none border border-dashed border-amber-500/20">
                        <Wrench size={14} className="animate-bounce" /> Re-Construcción: Upgrade al Stack 2026
                      </div>
                    ) : (
                      <>
                        {activeProject.deployUrl && (
                          <a href={activeProject.deployUrl} target="_blank" rel="noreferrer" 
                             className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl bg-[#1e1e20] text-white text-[11px] font-semibold shadow-neu-out hover:shadow-neu-in hover:text-software-blue transition-all duration-300">
                            <ExternalLink size={14} /> Ver Despliegue
                          </a>
                        )}
                        {activeProject.repoUrl && (
                          <a href={activeProject.repoUrl} target="_blank" rel="noreferrer" 
                             className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl bg-[#1e1e20] text-zinc-300 text-[11px] font-semibold shadow-neu-out hover:shadow-neu-in hover:text-white transition-all duration-300">
                            <Github size={14} /> Repositorio
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
        
      </div>
    </DraggableWindow>
  );
};

export default ProjectsWindow;
