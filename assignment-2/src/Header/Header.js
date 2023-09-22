import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import Theme from "../Theme/Theme";
import Account from "../Account/Account";
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import "./Header.module.css";

const Header = ({ currentLanguage, onLanguageChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className={`theme-${theme}`}>
      <div className="header-logo">
        <a href="/">Bookstore</a>
      </div>
      <div className="header-actions">
        <Theme />
        <Account />
        <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />

      </div>
    </header>
  );
};

export default Header;
