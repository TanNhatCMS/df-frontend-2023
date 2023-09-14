// Your JS code goes here
const bookList = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");
const bookTable = document.getElementById("book-table");
const searchInput = document.getElementById("search-input");

// Retrieve data from localStorage or initialize it
let books = JSON.parse(localStorage.getItem("books")) || [];

// Function to save data to localStorage
function saveDataToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Display books in the table
function displayBooks(booksToDisplay = books) {
    bookList.innerHTML = "";
    for (let i = 0; i < booksToDisplay.length; i++) {
        const book = booksToDisplay[i];
        const row = bookTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = book.title;
        cell2.innerHTML = book.author;
        cell3.innerHTML = book.topic;
        cell4.innerHTML = `<button onclick="deleteBook(${i})">Delete</button>`;
    }
    saveDataToLocalStorage();
}

// Delete a book
function deleteBook(index) {
    books.splice(index, 1);
    displayBooks();
}

// Add a new book
addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const topic = document.getElementById("topic").value;

    books.push({ title, author, topic });
    displayBooks();
    addBookForm.reset();
});

// Search books
searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
});

// Display the initial list of books
displayBooks();
