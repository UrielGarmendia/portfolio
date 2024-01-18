import "aos/dist/aos.css";

const AboutMe = () => {
  return (
    <section
      id="about-me"
      data-aos="fade-top"
      className="text-center mb-20 mx-6 mt-6"
    >
      <h2 className=" mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white">
        Sobre Mi
      </h2>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-300">
        Me encanta aprender cosas nuevas, y el desarrollo web es una de mis
        pasiones. Siempre estoy buscando nuevos retos, y me considero una
        persona comunicativa y que trabaja bien en equipo.
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-300">
        He completado dos bootcamps de desarrollo web, uno en Digital House y
        otro en SoyHenry. En ambos, desarrollé un ecommerce completo que
        demostró mis habilidades en desarrollo web full stack. También he
        desarrollado varios proyectos web más pequeños, y estoy disponible para
        mostrar mi código a posibles empleadores.
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-300">
        Mi objetivo es trabajar como desarrollador web full stack en una empresa
        que me permita seguir aprendiendo y creciendo profesionalmente.
      </p>
    </section>
  );
};

export default AboutMe;
