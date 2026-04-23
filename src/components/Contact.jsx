import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef    = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const formData = new FormData(formRef.current);

      const templateParams = {
        from_name: formData.get('from_name'),
        name: formData.get('from_name'),
        reply_to: formData.get('reply_to'),
        message: formData.get('message'),
        time: new Date().toLocaleString()
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus('sent');
      setTimeout(() => {
        setStatus('idle');
        formRef.current.reset();
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const isBusy = status === 'sending' || status === 'sent';

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative flex justify-center pb-40">
      
      <div className="max-w-2xl w-full">

        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8 }}
           className="relative bg-[#121212] w-full min-h-[500px] rounded-3xl shadow-neu-out border border-white/5 p-8 md:p-12 flex flex-col"
        >
          {/* Decorativo: efecto de profundidad suave, sin data-URL problemática */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(0,120,255,0.04) 0%, transparent 60%)' }} />

          <div className="border-b-2 border-[#181818] pb-4 mb-8 flex justify-between items-end relative z-10">
             <div>
                <h3 className="font-display font-bold text-lg md:text-2xl uppercase tracking-widest text-white m-0">CONTACTO</h3>
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-software-blue">Escribime y hablemos!</span>
             </div>
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-mechanic-red shadow-[0_0_8px_#D32F2F] mix-blend-screen" />
                <div className="w-3 h-3 rounded-full bg-mechanic-amber shadow-[0_0_8px_#F57C00] mix-blend-screen" />
                <div className="w-3 h-3 rounded-full bg-[#388E3C] shadow-[0_0_8px_#388E3C] mix-blend-screen" />
             </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10 flex-1 flex flex-col">
             
             <div className="flex flex-col">
                <label htmlFor="from_name" className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-400">Nombre</label>
                <div className="bg-[#0a0a0a] rounded-xl shadow-neu-in border border-black p-1">
                  <input 
                    id="from_name" type="text" name="from_name" required disabled={isBusy}
                    className="w-full bg-transparent outline-none p-3 font-mono text-sm text-gray-200 placeholder:text-gray-700 disabled:opacity-50"
                    placeholder="Ej. Juan Pérez / Empresa"
                  />
                </div>
             </div>
             
             <div className="flex flex-col">
                <label htmlFor="reply_to" className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-400">Email</label>
                <div className="bg-[#0a0a0a] rounded-xl shadow-neu-in border border-black p-1">
                  <input 
                    id="reply_to" type="email" name="reply_to" required disabled={isBusy}
                    className="w-full bg-transparent outline-none p-3 font-mono text-sm text-gray-200 placeholder:text-gray-700 disabled:opacity-50"
                    placeholder="contacto@dominio.com"
                  />
                </div>
             </div>

             <div className="flex flex-col flex-1">
                <label htmlFor="message" className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 text-zinc-400">Mensaje</label>
                <div className="bg-[#0a0a0a] rounded-xl shadow-neu-in border border-black p-1 h-32">
                  <textarea 
                    id="message" name="message" required disabled={isBusy}
                    className="w-full h-full bg-transparent outline-none p-3 font-mono text-sm text-gray-200 placeholder:text-gray-700 resize-none disabled:opacity-50"
                    placeholder="Describe un proyecto o saludo..."
                  />
                </div>
             </div>

             <div className="pt-6 relative flex justify-end">

               {(status === 'idle' || status === 'sending') && (
                 <button
                   type="submit"
                   aria-label={status === 'sending' ? 'Enviando mensaje...' : 'Enviar mensaje de contacto'}
                   disabled={status === 'sending'}
                   className="group relative flex items-center justify-center p-4 px-8 font-sans font-bold text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 bg-brushed-metal shadow-neu-out active:shadow-neu-in text-white border border-white/10 select-none cursor-none hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                 >
                   {status === 'sending' ? (
                     <span className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-software-blue animate-ping" />
                       Enviando...
                     </span>
                   ) : (
                     'Enviar mensaje'
                   )}
                 </button>
               )}

               {status === 'sent' && (
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="px-8 py-4 font-mono font-bold text-xs uppercase tracking-widest text-software-blue/90 border border-software-blue/50 bg-software-blue/5 rounded-xl flex items-center gap-3 backdrop-blur-sm shadow-neu-in"
                 >
                    <div className="w-2 h-2 rounded-full bg-software-blue animate-pulse" />
                    Datos enviados con éxito
                 </motion.div>
               )}

               {status === 'error' && (
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="px-8 py-4 font-mono font-bold text-xs uppercase tracking-widest text-mechanic-red/90 border border-mechanic-red/50 bg-mechanic-red/5 rounded-xl flex items-center gap-3 backdrop-blur-sm shadow-neu-in"
                 >
                    <div className="w-2 h-2 rounded-full bg-mechanic-red animate-pulse" />
                    Fallo al enviar — Reintentar
                 </motion.div>
               )}
             </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
