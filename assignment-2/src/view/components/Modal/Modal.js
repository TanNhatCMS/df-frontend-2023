import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Modal.module.css";

const Modal = ({ handleToggleModal, title, children }) => {
  const { theme } = useContext(ThemeContext);

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
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;
