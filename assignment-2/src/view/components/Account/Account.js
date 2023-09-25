import { useState } from "react";
import { getThemeMode } from '../../../utils/functions'
import styles from "./Account.module.css";
import IMAGES from '../../../assets/images'
const Account = () => {
  const { theme } = useState(getThemeMode);
  return (
    <div className={`${styles["account"]} ${styles[`theme-${theme}`]}`}>
      <div className="account-image">
        <img className="account-avatar" src={IMAGES.user} alt="Avatar người dùng" />
      </div>
      <div className="account-name">
        <span>TânNhậtCMS</span>
      </div>

    </div>
  );
};

export default Account;
