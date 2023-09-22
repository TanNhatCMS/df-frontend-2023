import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Account.module.css";
const Account = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles["account"]} ${styles[`theme-${theme}`]}`}>
      <div className="account-image">
        <img className="account-avatar" src="./assets/images/user.png" alt="Avatar người dùng" />
      </div>
      <div className="account-name">
        <span>TânNhậtCMS</span>
      </div>

    </div>
  );
};

export default Account;
