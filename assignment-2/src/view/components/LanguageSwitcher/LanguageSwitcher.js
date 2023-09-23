import React, { useEffect } from "react";
import "./LanguageSwitcher.module.css";



const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    onLanguageChange(newLanguage);
    localStorage.setItem("currentLanguage", newLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("currentLanguage");
    if (storedLanguage) {
      onLanguageChange(storedLanguage);
    }
  }, [onLanguageChange]);

  return (
    <div className="language-switcher">
      <button onClick={handleLanguageChange} className="language-button">
        {currentLanguage === "en" ? "English" : "Tiếng Việt"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
