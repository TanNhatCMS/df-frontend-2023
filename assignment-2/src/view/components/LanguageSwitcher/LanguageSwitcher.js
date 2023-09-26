import React, { useEffect } from "react";
import "./LanguageSwitcher.module.css";
import { useTranslation } from 'react-i18next';
import '../../../utils/i18n';


const LanguageSwitcher = ({ currentLanguage, onLanguageChange }) => {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === "en" ? "vi" : "en";
    onLanguageChange(newLanguage);
    changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
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
