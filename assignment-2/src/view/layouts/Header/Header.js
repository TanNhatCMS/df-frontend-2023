import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Theme from "../../components/Theme/Theme";
import Account from "../../components/Account/Account";
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
        <Account currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
};

export default Header;
