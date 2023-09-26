import { useContext } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import IMAGES from '../../assets/images'
import "../../style/Header.css";
import { ThemeContext } from '../../view/context';
const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header id="header" className={`theme-${theme}`}>
      <div className="header-logo">
        <a href="/">Bookstore</a>
      </div>

      <div className="header-actions">

        <ThemeSwitcher />
        <div className={`${"account"} ${`theme-${theme}`}`}>
        <div className="account-image">
          <img className="account-avatar" src={IMAGES.user} alt="Avatar người dùng" />
        </div>
        <div className="account-name">
          <span>TânNhậtCMS</span>
        </div>
  
      </div>
      </div>
    </header>
  );
};

export default Header;
