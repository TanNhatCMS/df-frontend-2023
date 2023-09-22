import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Header from "../Header/Header";
import "./Main.module.css";
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
const Main = ({ currentLanguage, onLanguageChange, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <> <Header currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} ></Header>
      <main id="main" className={`theme-${theme}`}>
        {children}
        <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      </main>
    </>
  );
};

export default Main;
