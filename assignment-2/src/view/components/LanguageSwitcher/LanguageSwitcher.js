import React, { useEffect } from "react";
import "./LanguageSwitcher.module.css";

export const translations = {
  "en": {
    "language": "English",
    "titleSite": "BookStore",
    "addbook": "Add Book",
    "create": "Create",
    "cancel": "Cancel",
    "searchbook": "Search Book",
    "namePlaceholder": "Enter Name Book",
    "authorPlaceholder": "Enter Author Book",
    "modalTitle": "Add New Book",
    "name": "Name",
    "edit": "Edit",
    "delete": "Delete",
    "author": "Author",
    "topic": "Topic",
    "action": "Action",
    "confirm": "Confirm",
    "close": "Close",
    "id": "#",
    "selectTopic": "Select Topic",
    "editBook": "Edit Book",
    "saveBook": "Save Book",
    "deleteBook": "Delete Book",
    "deleteBookConfirmation": "Do you want to delete "
  },
  "vi": {
    "language": "Tiếng Việt",
    "titleSite": "Cửa hàng sách",
    "addbook": "Thêm Sách",
    "create": "Thêm Sách",
    "cancel": "Hủy",
    "searchPlaceholder": "Tìm Sách",
    "namePlaceholder": "Nhập tên sách",
    "authorPlaceholder": "Nhập tác giả",
    "modalTitle": "Thêm Sách Mới",
    "name": "Tên Sách",
    "edit": "Sửa",
    "delete": "Xoá",
    "authorl": "Tác giả",
    "topic": "Chủ đề",
    "action": "Hành động",
    "confirm": "Xác nhận",
    "close": "Đóng",
    "id": "STT",
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
