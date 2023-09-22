import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import Theme from "../Theme/Theme";
import Account from "../Account/Account";
import Language from "../Language/Language";
import "./Header.css";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className={`theme-${theme}`}>
      <div className="header-logo">
        <a href="/">Bookstore</a>
      </div>
      <div className="header-actions">
        <Theme />
        <Account />
        <Language />
      </div>
    </header>
  );
};

export default Header;
