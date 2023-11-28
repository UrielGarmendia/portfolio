import Form from "./Form";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Contact = () => {
  return (
    <section id="contact" data-aos="fade-top" className="mb-20">
      <div className="text-center mb-6">
        <h2 className="mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Contact me
        </h2>
      </div>
      <Form />
    </section>
  );
};

export default Contact;
