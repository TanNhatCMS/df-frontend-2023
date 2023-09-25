import { useState } from "react";
import { getThemeMode } from '../../../utils/functions'
import Theme from "../../components/Theme/Theme";
import Account from "../../components/Account/Account";
import "./Header.css";

const Header = ({ currentLanguage, onLanguageChange }) => {
  const { theme } = useState(getThemeMode)

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
