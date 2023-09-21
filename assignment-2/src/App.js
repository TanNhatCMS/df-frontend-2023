import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import Modal from './Modal';
import ModalAddEdit from './ModalAddEdit';

function App() {
  const [bookList, setBookList] = useState([]); // Quản lý danh sách sách
  const [isAddModalOpen, setAddModalOpen] = useState(false); // Trạng thái hiển thị modal thêm sách
  const [isEditModalOpen, setEditModalOpen] = useState(false); // Trạng thái hiển thị modal sửa sách
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1); // Index sách đang được sửa
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Ngôn ngữ hiện tại
  const [currentTheme, setCurrentTheme] = useState('light-mode'); // Chế độ sáng/tối

  // Hàm thay đổi ngôn ngữ
  const handleLanguageChange = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'vi' : 'en');
  };

  // Hàm thay đổi chế độ sáng/tối
  const handleThemeChange = () => {
    setCurrentTheme(currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode');
  };

  // Hàm thêm sách mới
  const handleAddBook = (e, formData) => {
    e.preventDefault();
    setBookList([...bookList, formData]);
    setAddModalOpen(false);
  };

  // Hàm sửa sách
  const handleEditBook = (e, formData) => {
    e.preventDefault();
    const updatedBookList = [...bookList];
    updatedBookList[selectedBookIndex] = formData;
    setBookList(updatedBookList);
    setEditModalOpen(false);
    setSelectedBookIndex(-1);
  };

  // Hàm xóa sách
  const handleDeleteBook = (index) => {
    const updatedBookList = [...bookList];
    updatedBookList.splice(index, 1);
    setBookList(updatedBookList);
  };

  return (
    <div className={`App ${currentTheme}`}>
      <Header onLanguageChange={handleLanguageChange} onThemeChange={handleThemeChange} />
      <main>
        <button className="add-button" onClick={() => setAddModalOpen(true)}>
          Add Book
        </button>
        <Table
          bookList={bookList}
          onDeleteClick={handleDeleteBook}
          onEditClick={(index) => {
            setSelectedBookIndex(index);
            setEditModalOpen(true);
          }}
        />
      </main>
      <Footer />
      {/* Modal thêm sách */}
      <ModalAddEdit
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddBook}
        book={null}
      />
      {/* Modal sửa sách */}
      <ModalAddEdit
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditBook}
        book={selectedBookIndex !== -1 ? bookList[selectedBookIndex] : null}
      />
    </div>
  );
}

export default App;
