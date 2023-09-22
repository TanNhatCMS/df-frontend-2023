import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import Header from "../Header/Header";
import "./Main.css";

const Main = ({ currentLanguage, onLanguageChange, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <> <Header currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} ></Header>
      <main id="main" className={`theme-${theme}`}>
        {children}
      </main>
    </>
  );
};

export default Main;
