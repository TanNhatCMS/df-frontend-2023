import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import Header from "../Header/Header";
import "./Main.css";

const Main = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Header></Header>
      <main id="main" className={`theme-${theme}`}>
        {children}
      </main>
    </>
  );
};

export default Main;
