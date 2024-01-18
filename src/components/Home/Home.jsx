/* eslint-disable react/no-unescaped-entities */
import CV from "../../assets/CV-Uriel-Garmendia.pdf";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: "1500", delay: "5" });
  }, []);
  return (
    <section
      id="home"
      data-aos="fade-top"
      className="bg-center bg-no-repeat bg-cover bg-[url('https://imgs.search.brave.com/gefZhCLYpdrR5MHh_EOabCRUco4FNRrra6cNBwS2KYM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MTg3NzM1NTMzOTgt/NjUwYzE4NGUwYmIz/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TVRs/OGZHTnZaR2xuYnlV/eU1HUmxKVEl3Y0hK/dlozSmhiV0ZqYVc5/dWZHVnVmREI4ZkRC/OGZId3cmdz0xMDAw/JnE9ODA')] bg-gray-700 bg-blend-multiply h-[45rem]"
    >
      <div className="px-4 text-center mx-auto max-w-screen-xl py-24 lg:py-56">
        <div className="w-4/5 md:w-3/6 xl:w-5/12 m-auto text-left">
          <span className="ml-2 md:ml-1 xl:ml-8 text-sky-400">
            Hola 🖐🏼, Soy
          </span>
          <h1 className="nombre mb-4 text-4xl text-center font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Uriel Garmendia
          </h1>
        </div>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Soy un desarrollador web full stack con un fuerte deseo de aprender y
          crecer.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href={CV}
            download="CV Uriel Garmendia"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-900"
          >
            Descargar CV
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 ml-3 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>
          <a
            href="#about-me"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Más sobre mi
          </a>
          <a
            href="https://github.com/UrielGarmendia"
            className="inline-flex justify-center text-2xl hover:text-gray-900 items-center p-3  sm:ms-4 font-medium text-center text-white rounded-lg sm:rounded-full border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/uriel-garmendia/"
            className="inline-flex justify-center text-2xl hover:text-gray-900 items-center p-3  sm:ms-4 font-medium text-center text-white rounded-lg sm:rounded-full border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            <SiLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
