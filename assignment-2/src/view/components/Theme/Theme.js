import { useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Theme.module.css";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSwitchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <div className={`${styles["theme"]}`}>
      <label className={styles["switch"]}>
        <input type="checkbox" onClick={handleSwitchTheme} />
        <span className={styles["slider"]}></span>
      </label>
      <span>{theme === "light" ? "Light" : "Dark"} Mode</span>
    </div>

  );
};

export default Theme;
