// import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Theme.module.css";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSwitchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme-store", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme-store", "light");
    }
  };

  return (
    <div className={`${styles["theme"]}`}>
      <div
        className={`${styles["theme-btn"]}`}
        onClick={handleSwitchTheme}
      >
        {theme === "dark" && <i className="fa-solid fa-toggle-off"></i>}
        {!(theme === "dark") && <i className="fa-solid fa-toggle-on"></i>}
      </div>
      <span>{theme === "light" ? "Light" : "Dark"} Mode</span>
    </div>
  );
};

export default Theme;
