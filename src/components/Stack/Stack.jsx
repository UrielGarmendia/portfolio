import CardStack from "./CardStack";
import html from "../../assets/languages-images/html.svg";
import css from "../../assets/languages-images/css.svg";
import bootstrap from "../../assets/languages-images/bootstrap.png";
import express from "../../assets/languages-images/express.png";
import javascript from "../../assets/languages-images/javascript.svg";
import mysql from "../../assets/languages-images/mysql.png";
import node from "../../assets/languages-images/node.svg";
import postgresql from "../../assets/languages-images/postgresql.svg";
import react from "../../assets/languages-images/react.png";
import redux from "../../assets/languages-images/redux.png";
import sequelize from "../../assets/languages-images/sequelize.webp";
import tailwind from "../../assets/languages-images/tailwind.svg";
import python from "../../assets/languages-images/python.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Stack = () => {
  useEffect(() => {
    AOS.init({ duration: "1500" });
  }, []);
  return (
    <section data-aos="fade-top" id="stack" className="text-center mb-20">
      <h2 className=" mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white">
        Mi Stack
      </h2>
      <br />
      <div className="relative mt-5 mb-5 m-auto w-max-screen overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:content-['']">
        <div className="animate-infinite-slider flex w-[calc(250px*10)]">
          <CardStack image={html} title="HTML" />
          <CardStack image={css} title="CSS" />
          <CardStack image={javascript} title="Javascript" />
          <CardStack image={node} title="Node.js" />
          <CardStack image={react} title="React" />
          <CardStack image={redux} title="Redux" />
          <CardStack image={express} title="Express.js" />
          <CardStack image={sequelize} title="Sequelize" />
          <CardStack image={mysql} title="MySQL" />
          <CardStack image={postgresql} title="PostgreSQL" />
          <CardStack image={bootstrap} title="Bootstrap" />
          <CardStack image={tailwind} title="Tailwind" />
          <CardStack image={python} title="Tailwind" />

          <CardStack image={html} title="HTML" />
          <CardStack image={css} title="CSS" />
          <CardStack image={javascript} title="Javascript" />
          <CardStack image={node} title="Node.js" />
          <CardStack image={react} title="React" />
          <CardStack image={redux} title="Redux" />
          <CardStack image={express} title="Express.js" />
          <CardStack image={sequelize} title="Sequelize" />
          <CardStack image={mysql} title="MySQL" />
          <CardStack image={postgresql} title="PostgreSQL" />
          <CardStack image={bootstrap} title="Bootstrap" />
          <CardStack image={tailwind} title="Tailwind" />
        </div>
      </div>
    </section>
  );
};

export default Stack;
