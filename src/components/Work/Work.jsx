import ecommerceAutos from "../../assets/projects-img/e-commerce-autos.png";
import taskpro from "../../assets/projects-img/taskpro.png";
import biblioapp from "../../assets/projects-img/biblioapp.png";
import tusuenio from "../../assets/projects-img/tusuenio.png";
import Card from "./Card";

const Work = () => {
  return (
    <section id="work" className="text-center mt-5">
      <h2 className="mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        My Works
      </h2>
      <br />
      <div className="grid xl:grid-cols-3 place-content-center">
        <Card
          image={ecommerceAutos}
          title="E-Commerce Autos"
          linkDeploy={null}
          linkRepo="https://github.com/JuanBogliacino/e-commerce-autos.git"
        />
        <Card
          image={taskpro}
          title="TaskPro"
          linkDeploy="https://task-pro-todo-app.netlify.app/"
          linkRepo="https://github.com/UrielGarmendia/TaskPro.git"
        />
        <Card
          image={biblioapp}
          title="BiblioApp"
          linkDeploy="https://biblioapp.onrender.com"
          linkRepo="https://github.com/UrielGarmendia/BiblioApp.git"
        />
        <Card
          image={tusuenio}
          title="Tu Sueño"
          linkDeploy="https://tu-suenio-front.vercel.app/"
          linkRepo="https://github.com/stars/UrielGarmendia/lists/tu-sue%C3%B1o"
        />
      </div>
    </section>
  );
};

export default Work;
