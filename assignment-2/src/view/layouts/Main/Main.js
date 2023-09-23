import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Header from "../Header/Header";
import "./Main.css";
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
const Main = ({ currentLanguage, onLanguageChange, children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <> <Header currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} ></Header>
      <main id="main" className={`theme-${theme}`}>
        {children}

      </main>
      <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      <footer>

        <div className="copyright">
          &copy; 2023 || Made with TânNhậtCMS||
          <a href="https://github.com/TanNhatCMS/df-frontend-2023/tree/main/assignment-1">Source code</a>
        </div>

      </footer>
    </>
  );
};

export default Main;