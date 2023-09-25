import { useState } from "react";
import styles from "./Theme.module.css";
import { useTheme } from '../../contexts/ThemeContext'
const Theme = () => {
  const { theme, setTheme } = useTheme()

  if (!theme) {
    return null
  }

  const handleSwitchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

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
