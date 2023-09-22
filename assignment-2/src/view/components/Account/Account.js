import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Account.module.css";
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
const Account = ({ currentLanguage, onLanguageChange }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles["account"]} ${styles[`theme-${theme}`]}`}>
      <img className="account-avatar" src="./assets/images/user.png" alt="Avatar người dùng" />
      <h1 className="account-name">Tân Nhật CMS</h1>
      <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
    </div>
  );
};

export default Account;
