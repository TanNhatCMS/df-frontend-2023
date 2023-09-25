import { useState } from "react";
import { getThemeMode } from '../../../utils/functions'
import styles from "./Modal.module.css";

const Modal = ({ handleToggleModal, title, children }) => {
  const { theme } = useState(getThemeMode);

  return (
    <div
      className={`${styles["modal-container"]}  ${styles[`theme-${theme}`]}`}
      onClick={handleToggleModal}
    >
      <div onClick={(event) => event.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-title"]}>
            <span>{title}</span>
          </div>
          <div className={styles["header-btn"]} onClick={handleToggleModal}>
            X
          </div>
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;
