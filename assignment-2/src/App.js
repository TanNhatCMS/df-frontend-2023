import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Trạng thái cho danh sách sách và trang hiện tại
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Sử dụng useEffect để khởi tạo dữ liệu từ localStorage khi component được tạo
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Sử dụng useEffect để lưu trữ danh sách sách vào localStorage khi có thay đổi
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // Hàm xử lý tìm kiếm sách theo tiêu đề
  const handleSearch = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Cập nhật danh sách sách đã lọc
    // Có thể sử dụng setBooks(filteredBooks);
  };

  // Hàm xử lý thêm bản ghi mới
  const handleAddBook = (newBook) => {
    // Tạo một bản ghi mới với thông tin từ biểu mẫu
    const bookToAdd = {
      id: Date.now(),
      ...newBook,
    };
    // Cập nhật danh sách sách bằng cách thêm bản ghi mới vào đầu danh sách
    setBooks([bookToAdd, ...books]);
  };

  // Hàm xử lý xóa bản ghi
  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    // Cập nhật danh sách sách sau khi xóa
    setBooks(updatedBooks);
  };

  // Logic phân trang
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <h1>CMS Cửa hàng sách</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Tác giả</th>
            <th>Chủ đề</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Dữ liệu sách được hiển thị ở đây */}
        </tbody>
      </table>
      <div className="pagination-container">
        {/* Nút phân trang */}
      </div>
      <div className="add-book-container">
        <h2>Thêm Sách Mới</h2>
        {/* Biểu mẫu thêm sách */}
        <button onClick={handleAddBook}>Thêm Sách</button>
      </div>
    </div>
  );
}

export default App;
