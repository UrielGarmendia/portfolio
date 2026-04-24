import { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ExternalLink, Github, ChevronLeft, ChevronRight, LayoutGrid, Wrench } from 'lucide-react';

const Projects = forwardRef((props, ref) => {
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0]?.id);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4; // Max 4 projects per page in the sidebar

  // Ensure active project syncs safely
  const activeProject = projectsData.find(p => p.id === activeProjectId) || projectsData[0];

  // Pagination Logic purely for the Sidebar Menu
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentSidebarProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="projects" ref={ref} className="py-12 md:py-20 px-6 relative w-full flex flex-col items-center">
      
      <div className="mb-8 text-center w-full max-w-4xl">
         <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-widest mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Proyectos</h2>
         <div className="w-24 h-1 bg-software-blue mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
      </div>

      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        
        <div className="w-full lg:w-[300px] flex flex-col p-5 md:p-5 rounded-[2rem] bg-[#18181a] shadow-[12px_12px_24px_#0d0d0f,-12px_-12px_24px_#232325] border border-white/5 shrink-0">
           <h3 className="text-zinc-400 text-xs font-mono tracking-widest uppercase mb-6 px-2 flex items-center gap-2">
             <LayoutGrid size={14} /> Explorador
           </h3>
           
           <div className="flex flex-col gap-4 flex-1">
              {currentSidebarProjects.map(project => {
                 const isActive = activeProjectId === project.id;
                 return (
                   <button
                     key={project.id}
                     onClick={() => setActiveProjectId(project.id)}
                     className={`flex flex-col gap-1 px-5 py-4 rounded-[1.25rem] text-left transition-all duration-300 outline-none ${
                        isActive 
                          ? "bg-[#18181a] text-software-blue shadow-[inset_6px_6px_12px_#0d0d0f,_inset_-6px_-6px_12px_#232325]" 
                          : "bg-[#18181a] text-zinc-400 shadow-[6px_6px_12px_#0d0d0f,-6px_-6px_12px_#232325] hover:text-white"
                     }`}
                   >
                      <span className="font-bold text-[15px] truncate w-full">{project.title.split('//')[0]}</span>
                      <span className={`text-[10px] font-mono tracking-wider ${isActive ? "text-software-blue" : "text-zinc-400"}`}>
                        {project.techStack.slice(0, 2).join(' • ')}
                      </span>
                   </button>
                 );
              })}
           </div>

           {totalPages > 1 && (
             <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                  aria-label="Página anterior de proyectos"
                  className="p-3 rounded-xl bg-[#18181a] shadow-[4px_4px_8px_#0d0d0f,-4px_-4px_8px_#232325] hover:shadow-[inset_2px_2px_4px_#0d0d0f,_inset_-2px_-2px_4px_#232325] text-zinc-300 disabled:opacity-30 disabled:shadow-none disabled:bg-transparent transition-all duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${currentPage === i + 1 ? 'bg-software-blue shadow-[0_0_8px_#3b82f6]' : 'bg-zinc-700'}`} />
                  ))}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  aria-label="Página siguiente de proyectos"
                  className="p-3 rounded-xl bg-[#18181a] shadow-[4px_4px_8px_#0d0d0f,-4px_-4px_8px_#232325] hover:shadow-[inset_2px_2px_4px_#0d0d0f,_inset_-2px_-2px_4px_#232325] text-zinc-300 disabled:opacity-30 disabled:shadow-none disabled:bg-transparent transition-all duration-300"
                >
                  <ChevronRight size={16} />
                </button>
             </div>
           )}
        </div>

        <div className="flex-1 w-full min-w-0">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeProject.id}
               initial={{ opacity: 0, scale: 0.98, y: 15 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: -15 }}
               transition={{ duration: 0.4 }}
               className="flex flex-col p-5 md:p-6 rounded-[2rem] bg-[#1a1a1c] shadow-[12px_12px_24px_#0d0d0f,-12px_-12px_24px_#232325] border border-white/5 w-full"
             >
                <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] mb-6 border border-white/5">
                   <img 
                      src={activeProject.imageUrl}
                      alt={`Captura del proyecto ${activeProject.title}`}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={395}
                      className="w-full h-full object-cover object-top block"
                   />
                </div>
                
                <div className="flex flex-col">
                  
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-software-blue text-[10px] font-mono tracking-widest uppercase">{activeProject.role}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 line-clamp-2 md:line-clamp-none">
                    {activeProject.title}
                  </h3>
                  
                  <div className="text-zinc-400 text-[13px] md:text-sm leading-relaxed mb-6 space-y-3">
                    <p>{activeProject.simpleDesc}</p>
                    {activeProject.academicChallenge && (
                      <p><span className="text-zinc-300 font-medium font-mono text-[10px] tracking-widest uppercase block mb-1">Challenge Académico</span> {activeProject.academicChallenge}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeProject.techStack.map(tech => (
                       <span key={tech} className="px-4 py-2 text-[10px] md:text-xs font-mono text-zinc-300 bg-[#161618] rounded-xl shadow-[inset_3px_3px_6px_#0a0a0b,_inset_-3px_-3px_6px_#222225] border border-white/5">
                         {tech}
                       </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {activeProject.inRedesign ? (
                      <div className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#1e1e20] text-amber-500/80 text-[13px] font-semibold opacity-80 select-none border border-dashed border-amber-500/20 shadow-[inset_4px_4px_8px_#0c0c0e,_inset_-4px_-4px_8px_#303032]">
                        <Wrench size={16} className="animate-pulse" /> Re-Construcción: Upgrade al Stack 2026
                      </div>
                    ) : (
                      <>
                        {activeProject.deployUrl && (
                          <a href={activeProject.deployUrl} target="_blank" rel="noreferrer" 
                             className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#1e1e20] text-white text-[13px] font-semibold shadow-[6px_6px_12px_#0c0c0e,-6px_-6px_12px_#303032] hover:shadow-[inset_4px_4px_8px_#0c0c0e,_inset_-4px_-4px_8px_#303032] hover:text-software-blue transition-all duration-300">
                            <ExternalLink size={14} /> Ver Despliegue
                          </a>
                        )}
                        {activeProject.repoUrl && (
                          <a href={activeProject.repoUrl} target="_blank" rel="noreferrer" 
                             className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#1e1e20] text-zinc-300 text-[13px] font-semibold shadow-[6px_6px_12px_#0c0c0e,-6px_-6px_12px_#303032] hover:shadow-[inset_4px_4px_8px_#0c0c0e,_inset_-4px_-4px_8px_#303032] hover:text-white transition-all duration-300">
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
    </section>
  );
});

Projects.displayName = 'Projects';
export default Projects;

