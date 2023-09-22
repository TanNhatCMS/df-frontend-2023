import React, { useState, useEffect } from "react";
import "./LanguageSwitcher.css";

const translations = {
  "en": {
    "language": "English",
    "titleSite": "BookStore",
    "addBook": "Add Book",
    "addButton": "Create",
    "cancelButton": "Cancel",
    "searchPlaceholder": "Search Book",
    "namePlaceholder": "Enter Name Book",
    "authorPlaceholder": "Enter Author Book",
    "modalTitle": "Add New Book",
    "nameLabel": "Name",
    "editButton": "Edit",
    "deleteButton": "Delete",
    "authorLabel": "Author",
    "topicLabel": "Topic",
    "actionLabel": "Action",
    "confirmButton": "Confirm",
    "closeButton": "Close",
    "idLabel": "#",
    "selectTopic": "Select Topic",
    "editBook": "Edit Book",
    "saveBook": "Save Book",
    "deleteBook": "Delete Book",
    "deleteBookConfirmation": "Do you want to delete "
  },
  "vi": {
    "language": "Tiếng Việt",
    "titleSite": "Cửa hàng sách",
    "addBook": "Thêm Sách Mới",
    "addButton": "Thêm Sách",
    "cancelButton": "Hủy",
    "searchPlaceholder": "Tìm Sách",
    "namePlaceholder": "Nhập tên sách",
    "authorPlaceholder": "Nhập tác giả",
    "modalTitle": "Thêm Sách Mới",
    "nameLabel": "Tên Sách",
    "editButton": "Sửa",
    "deleteButton": "Xoá",
    "authorLabel": "Tác giả",
    "topicLabel": "Chủ đề",
    "actionLabel": "Hành động",
    "confirmButton": "Xác nhận",
    "closeButton": "Đóng",
    "idLabel": "STT",
    "selectTopic": "Chọn chủ đề",
    "editBook": "Sửa thông tin sách",
    "saveBook": "Lưu",
    "deleteBook": "Xoá sách",
    "deleteBookConfirmation": "Bạn có muốn xóa "
  }
};

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
        {currentLanguage === "en" ? translations.en.language : translations.vi.language}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
