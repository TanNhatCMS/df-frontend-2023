import React, { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Theme from "../../components/Theme/Theme";
import Account from "../../components/Account/Account";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import MobileNavMenu from "../../components/MobileNavMenu/MobileNavMenu";

import "./Header.css";

const Header = ({ currentLanguage, onLanguageChange }) => {
  const [showMenu, setShowMenu] = useState(false);


  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  const { theme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };


  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="header" className={`header-${theme}`}>
      <a data-i18n="titleSite" href="#" className="logo">Bookstore</a>
      <div className="user-info">
        <Theme />
        <img className="user-avatar" src="./assets/images/user.png" alt="Avatar người dùng" />
        <h1 className="user-name">Tân Nhật CMS</h1>

      </div>



      {/* <div className="header-logo">
        <a href="/">Bookstore</a>
      </div>

      <div className="header-actions">
        <button className="mobile-menu-button" onClick={openMobileMenu}>
          Menu
        </button>
       
        <Theme />
        <Account
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>*/}

      {/* Render MobileNavMenu nếu trạng thái mở Mobile Navigation Menu là true*/}
      {isMobileMenuOpen && (
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      )}
    </header>
  );
};

export default Header;
