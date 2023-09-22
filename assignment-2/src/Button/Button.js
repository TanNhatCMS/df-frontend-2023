import styles from "./Button.css";

const Button = ({ option, selected, title, handleClick, handleHover }) => {
  return (
    <div
      className={`${styles["button"]} ${option && styles["button-option"]} ${selected && styles["selected"]
        }`}
    >
      <button onClick={handleClick} onMouseOver={handleHover}>{title}</button>
    </div>
  );
};

export default Button;
