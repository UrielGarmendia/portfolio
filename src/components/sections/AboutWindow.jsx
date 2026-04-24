import DraggableWindow from '../os/DraggableWindow';
import { WINDOW_IDS } from '../../store/useSystemStore';

const AboutWindow = ({ constraintsRef }) => (
  <DraggableWindow
    id={WINDOW_IDS.ABOUT}
    title="about.exe"
    constraintsRef={constraintsRef}
    defaultPosition={{ x: 60, y: 40 }}
    width="860px"
    height="500px"
  >
    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start justify-center p-4">
      
      <div className="relative flex-shrink-0">
        <div className="bg-[#121212] p-4 shadow-neu-out rounded-3xl border border-white/5 relative w-56 md:w-[240px] aspect-[3/4] flex flex-col items-center justify-center">
          <div className="relative w-full h-full rounded-2xl bg-[#0a0a0a]">
            <img
              src="/foto-mia.webp"
              alt="Fotografía de Uriel Garmendia, desarrollador Full Stack"
              width={240}
              height={320}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
              style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-neu-in border border-black/50" />
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="bg-brushed-metal p-8 rounded-3xl shadow-neu-out border border-[#333] relative flex flex-col gap-6">
           
           <div className="border-b-2 border-[#181818] pb-4 mb-2">
              <h2 className="font-display font-bold text-3xl uppercase tracking-widest text-[#dcdcdc] mb-1">
                Sobre Mí
              </h2>
              <span className="font-mono font-black text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                Perfil Profesional
              </span>
           </div>

           <div className="flex flex-col gap-4 font-mono">
             <div className="bg-[#0a0a0a] shadow-neu-in rounded-xl p-5 border border-black/50 text-sm tracking-wide text-software-blue/80 flex flex-col gap-3">
                <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
                  <span className="opacity-50 text-[11px] text-zinc-400">Nombre:</span>
                  <span className="font-bold text-white text-right text-[13px]">Uriel Garmendia</span>
                </div>
                <div className="flex justify-between items-center whitespace-nowrap overflow-hidden">
                  <span className="opacity-50 text-[11px] text-zinc-400">Rol:</span>
                  <span className="font-bold text-white text-right text-[13px]">Desarrollador Full Stack</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-50 text-[11px] text-zinc-400">Experiencia:</span>
                  <span className="font-bold text-white text-right text-[13px]">+2 Años</span>
                </div>
             </div>
           </div>

           <div className="pt-2">
              <p className="font-sans text-[13px] font-medium leading-relaxed text-zinc-400 text-justify relative z-10">
                Me especializo en el Desarrollo Web Full Stack, con un fuerte interés en estructurar plataformas y sistemas de gestión integrales. Disfruto enfrentarme a nuevos problemas lógicos e investigar cómo resolverlos paso a paso, garantizando siempre que el código y la interfaz cumplan con los más altos estándares de calidad.
              </p>
           </div>
        </div>

        <div className="mt-6 flex justify-center">
           <a
             href="/Uriel-Garmendia-CV.pdf"
             download="Uriel_Garmendia_CV.pdf"
             className="bg-[#121212] hover:brightness-110 text-white font-sans font-bold text-[10px] uppercase tracking-[0.2em] py-4 px-8 rounded-2xl transition-all shadow-neu-out active:shadow-neu-in border border-white/5 flex items-center gap-3 select-none"
           >
             <span>Descargar Curriculum Vitae</span>
           </a>
        </div>
      </div>
    </div>
  </DraggableWindow>
);

export default AboutWindow;

