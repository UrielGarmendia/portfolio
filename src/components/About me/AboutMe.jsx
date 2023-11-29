import "aos/dist/aos.css";

const AboutMe = () => {
  return (
    <section
      id="about-me"
      data-aos="fade-top"
      className="text-center mb-20 mx-6"
    >
      <h2 className=" mb-4 inline-block text-4xl border-b-4 border-blue-600 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        About me
      </h2>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-400 dark:text-gray-300">
        I am a self-taught person and I am always looking for new ways to learn.
        I am passionate about web development and I like working on challenging
        projects. I am a good communicator and I work well in a team. I
        completed two web development bootcamps, one at Digital House and one at
        SoyHenry.
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-400 dark:text-gray-300">
        At each bootcamp, I developed a complete ecommerce that demonstrated my
        skills in full stack web development. I have also developed several
        smaller web projects. However, I am available to conduct interviews and
        share my code with potential employers.
      </p>
      <p className="mb-8 mt-4 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-left w-full text-gray-400 dark:text-gray-300">
        My goal is to work as a full stack web developer in a company that
        allows me to continue learning and growing professionally.
      </p>
    </section>
  );
};

export default AboutMe;
