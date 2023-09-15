const bookList = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");
const searchBookForm = document.getElementById("search-book-form");
const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");
const topicInput = document.getElementById("topic");
const searchInput = document.getElementById("search");
const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const addBookModal = document.getElementById("addBookModal");
const addBookButton = document.getElementById("addBookButton");
const closeAddBookModal = document.getElementById("closeAddBookModal");
const topicSelect = document.getElementById("topic");

const languageText = {
    english: {
        addBook: "Add New Book",
        confirmDelete: "Are you sure you want to delete this book?",
        addButton: "Add",
        cancelDeleteButton: "Cancel",
        searchPlaceholder: "Search by name",
        modalname: "Add New Book",
        nameLabel: "name",
        authorLabel: "Author",
        topicLabel: "Topic",
        actionLabel: "Action",
        confirmButton: "Confirm",
        closeButton: "Close",
    },
    vietnamese: {
        addBook: "Thêm Sách Mới",
        confirmDelete: "Bạn có chắc chắn muốn xóa cuốn sách này?",
        addButton: "Thêm",
        cancelDeleteButton: "Hủy",
        searchPlaceholder: "Tìm theo Tiêu đề",
        modalname: "Thêm Sách Mới",
        nameLabel: "Tiêu đề",
        authorLabel: "Tác giả",
        topicLabel: "Chủ đề",
        actionLabel: "Thao tác",
        confirmButton: "Xác nhận",
        closeButton: "Đóng",
    },
};

let currentLanguage = "english";
let confirmDeleteIndex = null;
let books = [
    { name: "Refactoring", author: "Martin Fowler", topic: "Programming" },
    { name: "Designing Data-intene Applications", author: "Martin Kleppmann", topic: "Database" },
    { name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" }

];

books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.topic;
    option.text = book.topic;
    topicSelect.appendChild(option);
});

function updateTextByLanguage() {
    const elementsToChange = document.querySelectorAll("[data-i18n]");
    elementsToChange.forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = languageText[currentLanguage][key];
    });
}

updateTextByLanguage();

document.getElementById("english-button").addEventListener("click", function () {
    currentLanguage = "english";
    updateTextByLanguage();
});

document.getElementById("vietnamese-button").addEventListener("click", function () {
    currentLanguage = "vietnamese";
    updateTextByLanguage();
});

addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newBook = {
        name: nameInput.value,
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
    books.splice(index, 1);
    displayBooks();
}

function displayBooks(booksToDisplay) {
    bookList.innerHTML = "";
    for (let i = 0; i < booksToDisplay.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booksToDisplay[i].name}</td>
            <td>${booksToDisplay[i].author}</td>
            <td>${booksToDisplay[i].topic}</td>
            <td><button onclick="showDeleteConfirmation(${i})">Xóa</button></td>
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
    const results = books.filter(book => book.name.toLowerCase().includes(query.toLowerCase()));
    redisplayBooks(results);
}


displayBooks(books);
