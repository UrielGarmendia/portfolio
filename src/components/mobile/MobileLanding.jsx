import Hero from '../Hero';
import Specs from '../Specs';
import Skills from '../Skills';
import Projects from '../Projects';
import Contact from '../Contact';

const BaseLanding = () => {
  return (
    <div className="text-white min-h-screen font-sans selection:bg-software-blue/30 selection:text-white relative z-10 pb-20">
      <Hero />
      <Specs />
      <Skills />
      <Projects />
      <Contact />
      
      <div className="py-8 text-center border-t border-white/5 opacity-50 font-mono text-xs tracking-widest uppercase">
         Uriel Garmendia · Portfolio 
      </div>
    </div>
  );
};

export default BaseLanding;
