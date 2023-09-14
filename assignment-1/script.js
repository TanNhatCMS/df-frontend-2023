// Lấy dữ liệu từ localStorage (nếu có) khi trang được nạp
const books = JSON.parse(localStorage.getItem('books')) || [];

// Cập nhật bảng sách
function updateBookList() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const row = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.topic}</td>
                <td><button onclick="deleteBook(${i})">Xóa</button></td>
            </tr>
        `;
        bookList.innerHTML += row;
    }
}

// Thêm sách mới
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;
    const topic = document.getElementById('topic').value;
    const newBook = { title, author, topic };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    updateBookList();
    addBookForm.reset();
});

// Xóa sách
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    updateBookList();
}

// Tìm kiếm sách
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.topic.toLowerCase().includes(searchTerm)
    );
    updateBookList(filteredBooks);
});

// Cập nhật bảng khi trang được nạp
updateBookList();
