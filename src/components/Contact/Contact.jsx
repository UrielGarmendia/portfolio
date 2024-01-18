import Form from "./Form";
import "aos/dist/aos.css";

const Contact = () => {
  return (
    <section id="contact" data-aos="fade-top" className="mb-20 mx-6">
      <div className="text-center mb-6">
        <h2 className="mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
          Contáctame
        </h2>
      </div>
      <Form />
    </section>
  );
};

export default Contact;
