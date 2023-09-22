import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import styles from "./Account.module.css";

const Account = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles["account"]} ${styles[`theme-${theme}`]}`}>
      <img class="account-avatar" src="./assets/images/user.png" alt="Avatar người dùng" />
      <h1 class="account-name">Tân Nhật CMS</h1>
    </div>
  );
};

export default Account;
