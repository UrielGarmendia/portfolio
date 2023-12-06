import { useState } from "react";
import "../../index.css";
import useReadingProgress from "../../hooks/useReadingProgress";

export default function NavBar() {
  const [display, setDisplay] = useState(false);
  const handleDisplay = () => setDisplay(!display);
  const completion = useReadingProgress();

  return (
    <nav
      data-aos="fade-top"
      className="border-gray-200 bg-zinc-900 xl:fixed w-full z-50"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Portfolio
          </span>
        </a>
        {display ? (
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 "
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
            onClick={handleDisplay}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        ) : (
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
            onClick={handleDisplay}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        )}

        <div
          className={`${
            display ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
            <li>
              <a
                href="#home"
                className="block py-2 px-3 md:p-0  rounded  md:border-0  text-white md:hover:text-blue-500 hover:bg-gray-700 hover:font-extrabold md:hover:bg-transparent"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#work"
                className="block py-2 px-3 md:p-0  rounded md:border-0  text-white md:hover:text-blue-500 hover:bg-gray-700 hover:font-extrabold  md:hover:bg-transparent"
              >
                Works
              </a>
            </li>
            <li>
              <a
                href="#stack"
                className="block py-2 px-3 md:p-0  rounded md:border-0  text-white md:hover:text-blue-500 hover:bg-gray-700 hover:font-extrabold  md:hover:bg-transparent"
              >
                Stack
              </a>
            </li>
            <li>
              <a
                href="#about-me"
                className="block py-2 px-3 md:p-0  rounded md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:font-extrabold  md:hover:bg-transparent"
              >
                About Me
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-3 md:p-0  rounded  md:border-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:font-extrabold  md:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <span
        style={{ transform: `translateX(${completion - 104}%)` }}
        className="absolute bg-yellow-400 h-1 w-full bottom-0 xl:block hidden"
      />
    </nav>
  );
}
