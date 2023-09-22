import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Theme from "../../components/Theme/Theme";
import Account from "../../components/Account/Account";
import "./Header.css";
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
const Header = ({ currentLanguage, onLanguageChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className={`theme-${theme}`}>
      <div className="header-logo">
        <a href="/">Bookstore</a>
      </div>

      <div className="header-actions">
        <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
        <Theme />
        <Account currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
