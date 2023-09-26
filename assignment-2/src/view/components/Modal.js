import { useContext } from "react";
import styles from "../../style/Modal.module.css";
import { ThemeContext } from '../../view/context';
const Modal = ({ handleToggleModal, title, children }) => {
  const { theme} = useContext(ThemeContext);

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
