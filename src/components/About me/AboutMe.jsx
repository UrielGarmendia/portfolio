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
        Desarrollador Full Stack apasionado con formación en bootcamps
        intensivos (Digital House y SoyHenry) y actualmente cursando la
        Licenciatura en Sistemas en la UADE. Me especializo en crear soluciones
        web completas, desde el frontend hasta la infraestructura backend.
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-300">
        Lo que me define:
        <ul>
          <li>
            🧠 Aprendizaje continuo: Siempre explorando nuevas tecnologías y
            mejores prácticas
          </li>
          <li>
            💡 Enfoque práctico: He desarrollado un e-commerce full stack y
            múltiples proyectos personales
          </li>
          <li>
            🤝 Trabajo en equipo: Excelentes habilidades comunicativas y
            experiencia colaborativa
          </li>
        </ul>
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-300">
        Tecnologías principales: Frontend: React, JavaScript, HTML5/CSS3
        Backend: Node.js, Express Bases de datos: MongoDB, PostgreSQL Mi
        objetivo: Busco oportunidades como Desarrollador Full Stack Junior donde
        pueda aplicar mis conocimientos mientras sigo creciendo profesionalmente
        en un entorno colaborativo. <br />
        <br />
        <b className="refran">
          Creo que el código bien escrito puede transformar ideas en realidades
          impactantes. Cada proyecto es una nueva oportunidad para superarme.
        </b>
      </p>
    </section>
  );
};

export default AboutMe;
