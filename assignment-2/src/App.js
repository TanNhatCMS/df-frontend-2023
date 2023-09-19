// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
import Pagination from './Pagination';
import AddBookForm from './AddBookForm';
function App() {
  const [books, setBooks] = useState([]); // Danh sách 
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [booksPerPage] = useState(5); // Số sách trên mỗi trang
  const [isDarkMode, setIsDarkMode] = useState(false); // Chế độ sáng/tối
  const [isAddingBook, setIsAddingBook] = useState(false);

  useEffect(() => {
    // Load dữ liệu từ localStorage khi ứng dụng được tải lần đầu
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);
  // Hàm mở hoặc đóng biểu mẫu thêm sách
  const toggleAddBookForm = () => {
    setIsAddingBook(!isAddingBook);
  };
  // Dữ liệu sách mẫu
  const sampleBooks = [
    {
      id: 1,
      title: 'Refactoring',
      author: 'Martin Fowler',
    },
    {
      id: 2,
      title: 'Design Data-Intensive Applications',
      author: 'Martin Kleppman',
    },
    {
      id: 3,
      title: 'The Phoenix Project',
      author: 'Gene Kim',
    },
  ];

  useEffect(() => {
    // Load dữ liệu từ localStorage khi ứng dụng được tải lần đầu
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    // Nếu danh sách sách rỗng (lần đầu chạy), thêm dữ liệu sách mẫu
    if (savedBooks.length === 0) {
      setBooks(sampleBooks);
    } else {
      setBooks(savedBooks);
    }
  }, [sampleBooks]);

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
      <button onClick={toggleAddBookForm}>Thêm Sách</button>
      {isAddingBook && <AddBookForm addBook={addBook} />}
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
