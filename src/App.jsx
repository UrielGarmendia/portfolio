import "./App.css";
import AboutMe from "./components/About me/AboutMe";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import NavBar from "./components/Nav/NavBar";
import Stack from "./components/Stack/Stack";
import Work from "./components/Work/Work";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <AboutMe />
      <Stack />
      <Work />
      <Contact />
    </>
  );
}

export default App;
