import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context';
import styles from "../../style/ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
      const localTheme = localStorage.getItem("theme");
      if (!localTheme) {
        setTheme("light");
        localStorage.setItem("theme", "light");
      } else {
        setTheme(localTheme);
      }
  });

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
export default ThemeSwitcher;
