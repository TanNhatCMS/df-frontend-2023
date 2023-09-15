
let books = [
    { title: "Cuốn Sách 1", author: "Tác giả A", topic: "Chủ đề X" },
    { title: "Cuốn Sách 2", author: "Tác giả B", topic: "Chủ đề Y" }
];


const bookList = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");
const searchBookForm = document.getElementById("search-book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const topicInput = document.getElementById("topic");
const searchInput = document.getElementById("search");
const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
let confirmDeleteIndex = null;

function displayBooks() {
    bookList.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${books[i].title}</td>
                <td>${books[i].author}</td>
                <td>${books[i].topic}</td>
                <td><button onclick="showDeleteConfirmation(${i})">Xóa</button></td>
            `;
        bookList.appendChild(row);
    }
}


addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newBook = {
        title: titleInput.value,
        author: authorInput.value,
        topic: topicInput.value
    };
    books.push(newBook);
    displayBooks();
    addBookForm.reset();
});

function showDeleteConfirmation(index) {
    confirmDeleteIndex = index;
    deleteConfirmationModal.style.display = "block";
}

function hideDeleteConfirmation() {
    deleteConfirmationModal.style.display = "none";
    confirmDeleteIndex = null;
}

confirmDeleteButton.addEventListener("click", function () {
    if (confirmDeleteIndex !== null) {
        deleteBook(confirmDeleteIndex);
        hideDeleteConfirmation();
    }
});
cancelDeleteButton.addEventListener("click", function () {
    hideDeleteConfirmation();
});

function deleteBook(index) {

    const isConfirmed = confirm("Bạn có chắc chắn muốn xóa cuốn sách này?");

    if (isConfirmed) {
        books.splice(index, 1);
        displayBooks();
    }
}

function redisplayBooks(booksToDisplay) {
    bookList.innerHTML = "";
    for (let i = 0; i < booksToDisplay.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booksToDisplay[i].title}</td>
            <td>${booksToDisplay[i].author}</td>
            <td>${booksToDisplay[i].topic}</td>
            <td><button onclick="deleteBook(${i})">Xóa</button></td>
        `;
        bookList.appendChild(row);
    }
}


searchBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    searchBooks(query);

});

function searchBooks(query) {
    const results = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    redisplayBooks(results);
}


displayBooks();
