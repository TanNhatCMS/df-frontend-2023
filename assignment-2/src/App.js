// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
import Pagination from './Pagination';

function App() {
  const [books, setBooks] = useState([]); // Danh sách 
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [booksPerPage] = useState(5); // Số sách trên mỗi trang
  const [isDarkMode, setIsDarkMode] = useState(false); // Chế độ sáng/tối

  useEffect(() => {
    // Load dữ liệu từ localStorage khi ứng dụng được tải lần đầu
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    // Lưu trữ danh sách sách vào localStorage khi có thay đổi
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Hàm thêm sách mới
  const addBook = (book) => {
    setBooks([...books, book]);
  };

  // Hàm xóa sách
  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  // Hàm tìm kiếm sách theo tiêu đề
  const searchBooks = (title) => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  // Hàm chuyển đổi giữa chế độ sáng và tối
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Tính toán sách được hiển thị trên trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
        </button>
      </div>
      <h1>Quản lý Sách</h1>
      <Table books={currentBooks} deleteBook={deleteBook} />
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
