// Định danh các phần tử DOM
const englishButton = document.getElementById("english-button");
const vietnameseButton = document.getElementById("vietnamese-button");
const searchInput = document.getElementById("search-input");
const formAddBook = document.querySelector('.form-add-book');
const inputName = document.querySelector('#name');
const inputAuthor = document.querySelector('#author');
const selectTopic = document.querySelector('#topic');
const deleteModal = document.querySelector('.delete-modal');
const deleteBookButton = document.querySelector('#delete-book-button');
const cancelBookButton = document.querySelector('#cancel-book-button');
const addButton = document.querySelector('.add-button');
const ModalContainer = document.querySelector('.add-modal');
const deleteModalContainer = document.querySelector('.delete-modal');
const closeAddModalButton = document.querySelector('#close-modal-add');
const closeDeleteModalButton = document.querySelector('#close-btn-delete');
const bookNameSpan = document.querySelector('.book-name');
const paginationContainer = document.querySelector(".pagination-container");
const themeSwitch = document.getElementById("theme-switch");
const inputId = document.querySelector('#id');
const inputact = document.querySelector('#act');
const submitButton = document.querySelector('.btn.btn-success[data-i18n="addButton"]');
const body = document.body;

// Dữ liệu sách mẫu
const bookListArr = [
    {
        id: 1,
        name: 'Refactoring',
        author: 'Martin Fowler',
        topic: 'Programming',
    },
    {
        id: 2,
        name: 'Design Data-Intensive Applications',
        author: 'Martin Kleppman',
        topic: 'Database',
    },
    {
        id: 3,
        name: 'The Phoenix Project',
        author: 'Gene Kim',
        topic: 'Devops',
    },
    {
        id: 4,
        name: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        topic: 'Frontend',
    },
    {
        id: 5,
        name: 'Node.js Design Patterns',
        author: 'Mario Casciaro',
        topic: 'Backend',
    },
    {
        id: 6,
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        topic: 'Programming',
    },
    {
        id: 7,
        name: 'Database Systems: The Complete Book',
        author: 'Hector Garcia-Molina',
        topic: 'Database',
    },
    {
        id: 8,
        name: 'Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation',
        author: 'Jez Humble and David Farley',
        topic: 'Devops',
    },
    {
        id: 9,
        name: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        topic: 'Frontend',
    },
    {
        id: 10,
        name: 'Python Crash Course',
        author: 'Eric Matthes',
        topic: 'Programming',
    },
    {
        id: 11,
        name: 'Introduction to the Theory of Computation',
        author: 'Michael Sipser',
        topic: 'Programming',
    },
    {
        id: 12,
        name: 'MongoDB: The Definitive Guide',
        author: 'Kristina Chodorow',
        topic: 'Database',
    },
    {
        id: 13,
        name: 'Kubernetes Up and Running',
        author: 'Kelsey Hightower',
        topic: 'Devops',
    },
    {
        id: 14,
        name: 'React Up and Running',
        author: 'Stoyan Stefanov',
        topic: 'Frontend',
    },
    {
        id: 15,
        name: 'Node.js in Action',
        author: 'Mike Cantelon',
        topic: 'Backend',
    },
    {
        id: 16,
        name: 'Agile Estimating and Planning',
        author: 'Mike Cohn',
        topic: 'Devops',
    },
    {
        id: 17,
        name: 'Head First Java',
        author: 'Kathy Sierra and Bert Bates',
        topic: 'Programming',
    },
    {
        id: 18,
        name: 'Learning SQL',
        author: 'Alan Beaulieu',
        topic: 'Database',
    },
    {
        id: 19,
        name: 'The Pragmatic Programmer',
        author: 'Andrew Hunt and David Thomas',
        topic: 'Programming',
    },
    {
        id: 20,
        name: 'Docker Deep Dive',
        author: 'Nigel Poulton',
        topic: 'Devops',
    },
];

// Dữ liệu đa ngôn ngữ
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
        "deleteBookConfirmation": "Do you want to delete <b>{name}</b> book ?",
        "pleaseselectTopic": "Please select a topic"
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
        "deleteBookConfirmation": "Bạn có muốn xóa <b>{name}</b> Không?",
        "pleaseselectTopic": "Vui lòng chọn chủ đề"
    }
};
// Biến trạng thái
let currentLanguage = "en";
let idItem = 0;

// Lưu trữ và lấy dữ liệu sách
const saveBookStore = (bookList) => {
    localStorage.setItem('bookstore', JSON.stringify(bookList));
};

const getBookStore = () => {
    try {
        let bookLists = JSON.parse(localStorage.getItem('bookstore'));
        if (!Array.isArray(bookLists) || bookLists.length === 0) {
            saveBookStore(bookListArr);
            bookLists = bookListArr;
        }
        return bookLists;
    } catch (error) {
        console.error('Error parsing book list from local storage:', error);
        return [];
    }
};

// Cập nhật ngôn ngữ
englishButton.addEventListener("click", () => {
    currentLanguage = "en";
    updateTextByLanguage();
});

vietnameseButton.addEventListener("click", () => {
    currentLanguage = "vi";
    updateTextByLanguage();
});

function updateTextByLanguage() {
    const elementsToChange = document.querySelectorAll("[data-i18n]");

    if (searchInput.placeholder)
        searchInput.placeholder = translations[currentLanguage]["searchPlaceholder"];

    elementsToChange.forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations && translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Quản lý sách và phân trang
let allBooks = getBookStore();
const itemsPerPage = 5;
let totalPages = Math.ceil(allBooks.length / itemsPerPage);
let currentPage = 1;

function displayPageNumbers() {
    const pageNumbersContainer = document.querySelector("#pagination-numbers");
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.textContent = i;
        pageNumberButton.classList.add("pagination-number");
        if (totalPages === 1) break;
        if (i === currentPage) {
            pageNumberButton.classList.add("active");
        }

        pageNumberButton.addEventListener("click", function () {
            currentPage = i;
            displayBooks(allBooks, currentPage);
            updateURLWithoutReloading();
        });

        pageNumbersContainer.appendChild(pageNumberButton);
    }
}


function createPaginationButton(text, id) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    button.className = "pagination-button";
    return button;
}
document.addEventListener("click", function (event) {
    if (event.target.id === "first-page" && currentPage > 1) {
        currentPage = 1;
        displayBooks(allBooks, currentPage);
        updateURLWithoutReloading();
    } else if (event.target.id === "last-page" && currentPage < totalPages) {
        currentPage = totalPages;
        displayBooks(allBooks, currentPage);
        updateURLWithoutReloading();
    } else if (event.target.id === "prev-page" && currentPage > 1) {
        currentPage--;
        displayBooks(allBooks, currentPage);
        updateURLWithoutReloading();
    } else if (event.target.id === "next-page" && currentPage < totalPages) {
        currentPage++;
        displayBooks(allBooks, currentPage);
        updateURLWithoutReloading();
    }
});
function displayBooks(bookList, page = 1) {
    totalPages = Math.ceil(bookList.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToDisplay = bookList.slice(startIndex, endIndex);
    const tbody = document.querySelector("#table-book tbody");
    tbody.innerHTML = '';
    booksToDisplay.forEach((book, index) => {
        const newRow = createTableRow(startIndex + index + 1, book.name, book.author, book.topic);
        tbody.appendChild(newRow);
    });
    if (totalPages > 1) {
        const prevPageButton = document.getElementById("prev-page");
        if (prevPageButton && prevPageButton.parentNode) {
            prevPageButton.parentNode.removeChild(prevPageButton);
        }
        const nextPageButton = document.getElementById("next-page");
        if (nextPageButton && nextPageButton.parentNode) {
            nextPageButton.parentNode.removeChild(nextPageButton);
        }
        const firstPageButton = document.getElementById("first-page");
        if (firstPageButton && firstPageButton.parentNode) {
            firstPageButton.parentNode.removeChild(firstPageButton);
        }
        const lastPageButton = document.getElementById("last-page");
        if (lastPageButton && lastPageButton.parentNode) {
            lastPageButton.parentNode.removeChild(lastPageButton);
        }
        if (currentPage > 1) {
            const tableContainer = document.querySelector(".pagination-container");
            const newPrevPageButton = createPaginationButton("<", "prev-page");
            tableContainer.insertBefore(newPrevPageButton, tableContainer.firstChild);
        }

        if (currentPage < totalPages) {
            const tableContainer = document.querySelector(".pagination-container");
            const newNextPageButton = createPaginationButton(">", "next-page");
            tableContainer.appendChild(newNextPageButton);
        }

        // Add "First Page" and "Last Page" buttons if necessary

        const tableContainer = document.querySelector(".pagination-container");

        // Add "First Page" button
        if (currentPage > 1) {
            const firstPageButton = createPaginationButton("<<", "first-page");
            tableContainer.insertBefore(firstPageButton, tableContainer.firstChild);
        }

        // Add "Last Page" button
        if (currentPage < totalPages) {
            const lastPageButton = createPaginationButton(">>", "last-page");
            tableContainer.appendChild(lastPageButton);
        }
        displayPageNumbers();
    }
}

function createTableRow(id, name, author, topic) {
    const newRow = document.createElement('tr');
    newRow.classList.add('book-item');
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${author}</td>
        <td>${topic}</td>
        <td>
            <button
                type="button"
                data-i18n="editButton"
                class="edit-book-button"
                onclick="openEditModal(${id})"
            >
                Edit
            </button>
            <button
                type="button"
                data-i18n="deleteButton"
                class="delete-book-button"
                onclick="OpenDeleteModal(${id})"
            >
                Delete
            </button>
        </td>
    `;
    return newRow;
}
function updateURLWithoutReloading() {
    const newURL = window.location.pathname + "?page=" + currentPage;
    // Thay đổi URL mà không tải lại trang
    history.pushState(null, null, newURL);
}
window.addEventListener("beforeunload", function (e) {
    if (currentPage !== undefined) {
        const newURL = window.location.pathname + "?page=" + currentPage;
        history.replaceState(null, null, newURL);
    }
});
// Chạy sau khi trang web đã tải hoàn toàn
document.addEventListener("DOMContentLoaded", function () {
    // Đọc trang hiện tại từ URL nếu có
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    totalPages = Math.ceil(getBookStore().length / itemsPerPage);
    if (pageParam && pageParam <= totalPages) {
        currentPage = parseInt(pageParam);
        displayBooks(allBooks, currentPage);
    } else {
        currentPage = 1;
        updateURLWithoutReloading();
    }

});
// Xác nhận việc xoá sách
let idBookToDelete;
const DeleteBook = (id) => {
    const updatedBookList = getBookStore().filter(item => item.id !== idBookToDelete);
    saveBookStore(updatedBookList);
    allBooks = updatedBookList;
    currentPage = 1;
    displayBooks(updatedBookList);
};

// Mở modal xác nhận xoá sách
const OpenDeleteModal = (id) => {
    deleteModal.classList.add('active-modal');
    idBookToDelete = id;
    const value = getBookStore().filter(item => item.id == id);
    const confirmationMessage = translations[currentLanguage]["deleteBookConfirmation"].replace("{name}", value[0].name);
    bookNameSpan.innerHTML = confirmationMessage;
};

// Đóng modal xác nhận xoá sách
const CloseDeleteModal = () => {
    deleteModal.classList.remove('active-modal');
};

// Xác nhận việc xoá sách
const ConfirmDelete = () => {
    CloseDeleteModal();
    DeleteBook(idBookToDelete);
};

// Tìm kiếm sách
const SearchBook = (event) => {
    const filter = [];
    const searchValue = event.target.value.toLowerCase();
    getBookStore().forEach((book) => {
        const bookName = book.name.toLowerCase();
        if (bookName.includes(searchValue)) {
            filter.push(book);
        }
    });
    currentPage = 1;
    if (searchValue) {
        displayBooks(filter);
    } else {
        displayBooks(getBookStore());
    }
};
function sanitizeInput(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}
function ussanitizeInput(text) {
    var map = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };
    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
        return map[m];
    });
}
const SubmitFormBook = (e) => {
    e.preventDefault();
    const safeName = sanitizeInput(inputName.value);
    const safeAuthor = sanitizeInput(inputAuthor.value);
    const selectedTopic = selectTopic.options[selectTopic.selectedIndex].value;
    if (selectTopic.selectedIndex === 0) {
        alert(translations[currentLanguage]["pleaseselectTopic"]);
        return;
    }
    if (inputact.value === "new") {
        const formValue = {
            id: inputId.value,
            name: safeName,
            author: safeAuthor,
            topic: selectedTopic,
        };
        const newListBook = [...getBookStore(), formValue];
        saveBookStore(newListBook);
    } else {
        const newListBook = getBookStore().map(item => {
            if (item.id === idItem) {
                item.name = inputName.value;
                item.author = inputAuthor.value;
                item.topic = selectTopic.options[selectTopic.selectedIndex].value;
            }
            return item;
        });
        saveBookStore(newListBook);
    }
    allBooks = getBookStore();
    currentPage = 1;
    displayBooks(allBooks);
    inputId.value = '';
    inputName.value = '';
    inputAuthor.value = '';
    ModalContainer.classList.remove('active-modal');
};

// Hiển thị modal thêm sách
const showModalAdd = (e) => {
    e.preventDefault();
    inputact.value = "new";
    selectTopic.selectedIndex = 0;
    inputName.placeholder = translations[currentLanguage]["namePlaceholder"];
    inputAuthor.placeholder = translations[currentLanguage]["authorPlaceholder"];
    inputId.value = getBookStore().reduce((max, book) => (book.id > max ? book.id : max), 0) + 1;
    ModalContainer.classList.add('active-modal');
};

// Hiển thị modal sửa đổi
const openEditModal = (id) => {
    const value = getBookStore().filter(item => item.id == id);
    const name = ussanitizeInput(value[0].name);
    const author = ussanitizeInput(value[0].author);
    const topic = value[0].topic;
    ModalContainer.classList.add('active-modal');
    submitButton.textContent = translations[currentLanguage]["saveBook"];
    inputact.value = "edit";
    if (id && name && author && topic) {
        inputId.value = id;
        inputName.placeholder = translations[currentLanguage]["namePlaceholder"];
        inputAuthor.placeholder = translations[currentLanguage]["authorPlaceholder"];
        inputName.value = name;
        inputAuthor.value = author;
        for (let i = 0; i < selectTopic.options.length; i++) {
            if (selectTopic.options[i].value == topic) {
                selectTopic.selectedIndex = i;
                break;
            }
        }
        idItem = id;
    }
};
// Đóng modal thêm sách
const hideAddModal = (e) => {
    ModalContainer.classList.remove('active-modal');
};

// Đóng modal xác nhận xoá sách
const hideDeleteModal = (e) => {
    deleteModalContainer.classList.remove('active-modal');
};

// Sự kiện xác nhận việc xoá sách
deleteBookButton.addEventListener('click', ConfirmDelete);

// Sự kiện hủy việc xoá sách
cancelBookButton.addEventListener('click', CloseDeleteModal);

// Sự kiện hiển thị modal thêm sách
addButton.addEventListener('click', showModalAdd);

// Sự kiện đóng modal thêm sách
closeAddModalButton.addEventListener('click', hideAddModal);

// Sự kiện đóng modal xác nhận xoá sách
closeDeleteModalButton.addEventListener('click', hideDeleteModal);

// Sự kiện gửi form thêm sách
formAddBook.addEventListener('submit', SubmitFormBook);

// Sự kiện tìm kiếm sách
searchInput.addEventListener('keyup', SearchBook);

// Hiển thị danh sách sách và cập nhật ngôn ngữ
displayBooks(allBooks, currentPage);
updateTextByLanguage();

// Đọc trạng thái giao diện chủ đề
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === "dark-mode") {
        themeSwitch.checked = true;
    }
}

// Sự kiện chuyển đổi chủ đề
themeSwitch.addEventListener("change", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
    }
});
