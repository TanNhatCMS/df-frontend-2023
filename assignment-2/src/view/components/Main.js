import { useContext } from "react";
import Header from "./Header";
import "../../style/Main.css";
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeContext } from '../../view/context';
const Main = ({ currentLanguage, onLanguageChange, children }) => {
  const { theme} = useContext(ThemeContext);

  return (
    <> <Header></Header>
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