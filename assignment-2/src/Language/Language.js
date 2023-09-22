import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import styles from "./Language.css";
export const [currentLanguage, setCurrentLanguage] = useState("en");
const Language = () => {
  const languageOptions = {
    en: "English",
    vi: "Tiếng Việt",
  };
  const { theme } = useContext(ThemeContext);
  const handleLanguageChange = () => {
    setCurrentLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === "en" ? "vi" : "en";
      localStorage.setItem("currentLanguage", newLanguage);
      return newLanguage;
    });
  };
  return (
    <div className={`${styles["language"]} ${styles[`language-${theme}`]}`}>
      <div
        className={`${styles["language-btn"]}`}
        onClick={handleLanguageChange}
      >
      </div>
      <span> {languageOptions[currentLanguage]}</span>
    </div>
  );
};

export default Language;
