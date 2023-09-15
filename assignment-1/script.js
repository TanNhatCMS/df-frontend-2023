const searchInput = document.querySelector("#search-input");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");
const addBookModal = document.getElementById("addBookModal");
const addBookButton = document.getElementById("addBookButton");
const closeAddBookModal = document.getElementById("closeAddBookModal");
const topicSelect = document.getElementById("topic");
const modalAdd = document.querySelector('.modal-add-book');
const closeModalAdd = document.querySelector('#close-modal-add');
const overlayAdd = document.querySelector('.overlay-add');
const modalDelete = document.querySelector('.modal-confirm-delete');
const overlayDelete = document.querySelector('.overlay-delete');
const closeModalDelete = document.querySelector('#close-modal-delete');
const btnCancel = document.querySelector('#btn-cancel');
const titleModal = document.getElementById("title-modal");
const btnSubmit = document.getElementById("submit-btn");
const deleteName = document.getElementById("delete-name");

let currentAction = "";
let idItem = 0;
let currentUrl = window.location.href;
let topics = [];
let books = [];

const getAllBook = async () => {
    const resBook = await fetch(`${currentUrl}database/books.json`);
    books = await resBook.json();
    console.log("Books", books);
    const resTopics = await fetch(`${currentUrl}database/topics.json`);
    topics = await resTopics.json();
    await getAllTopic(topics);
    console.log("topic", topics);
    if (books && topics) {
        setDataTable(books);
    }
}
getAllBook();
const getAllTopic = async (topics) => {
    if (topics) {
        const selectTopic = document.getElementById("select-topic");
        topics.forEach(topic => {
            const option = document.createElement("option");
            option.textContent = topic.title;
            option.value = topic.id;
            selectTopic.appendChild(option);
        });
    }
}
const setDataTable = (data) => {
    const tbody = document.querySelector("#table-book tbody");
    const topicById = {};
    topics.forEach(topic => {
        topicById[topic.id] = topic.title;
    });
    tbody.innerHTML = "";
    data.forEach((item, index) => {
        const topicTitle = topicById[item.topic_id];
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.author}</td>
                <td>${topicTitle}</td>
                 <td>
                   <a data-i18n="editButton" id="edit-book" onclick="ModalEdit(${item.id}, '${item.name}', '${item.author}', ${item.topic_id})" class="edit-book">Edit</a>
                   <a data-i18n="deleteButton" id="delete-book" onclick="ModalDelete(${item.id}, '${item.name}')" class="delete-book">Delete</a>
               </td>
            `;
        tbody.appendChild(row);
    });
}
books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.topic;
    option.text = book.topic;
    topicSelect.appendChild(option);
});

const ModalAdd = () => {
    FormClear();
    currentAction = 'Add';
    setTitleModal();
    toggleModalAdd();
}
const ModalEdit = (id, name, author, topic_id) => {
    currentAction = 'Edit';
    setTitleModal();
    toggleModalAdd();
    console.log(id, name, author, topic_id);
    if (id && name && author && author) {
        document.getElementById("name").value = name;
        document.getElementById("author").value = author;
        document.getElementById("select-topic").value = topic_id;
        idItem = id;

    }
}
const FormClear = () => {
    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("select-topic").value = "null";
}
function setTitleModal() {
    if (currentAction === "Edit") {
        titleModal.textContent = getLanguage("editBook");
        btnSubmit.textContent = getLanguage("saveBook");
    } else {
        titleModal.textContent = getLanguage("addBook");
        btnSubmit.textContent = getLanguage("addButton");
    }
}
const toggleModalAdd = () => {
    modalAdd.classList.toggle('hidden');
    overlayAdd.classList.toggle('hidden');
}
const toggleModalDelete = () => {
    modalDelete.classList.toggle('hidden');
    overlayDelete.classList.toggle('hidden');
}

const ModalDelete = (id, name) => {
    idItem = id;
    deleteName.innerHTML = getDelete(name);
    toggleModalDelete();
}
const validateForm = (name, author, topic) => {
    var nameError = document.getElementById("name-error");
    var authorError = document.getElementById("author-error");
    var topicError = document.getElementById("topic-error");
    nameError.style.display = "none";
    authorError.style.display = "none";
    topicError.style.display = "none";
    var hasError = false;
    if (name === "") {
        nameError.style.display = "block";
        hasError = true;
    }
    if (author === "") {
        authorError.style.display = "block";
        hasError = true;
    }
    if (topic === "null") {
        topicError.style.display = "block";
        hasError = true;
    }
    return hasError;
}

const SubmitForm = () => {
    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const topicId = document.getElementById("select-topic").value;

    if (validateForm(name.trim(), author.trim(), topicId)) {
        return;
    }
    if (currentAction === 'Add') {
        const newBook = {
            id: Math.floor(Math.random() * (1000 - 6 + 1) + 6),
            name: name,
            author: author,
            topic_id: parseInt(topicId)
        };
        books.push(newBook);
        console.log(books);

        const tbody = document.querySelector("#table-book tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${books.length}</td>
            <td>${newBook.name}</td>
            <td>${newBook.author}</td>
            <td>${getTopic(newBook.topic_id)}</td>
            <td>
                <a id="edit-book" onclick="ModalEdit(${newBook.id}, '${newBook.name}', '${newBook.author}', ${newBook.topic_id})" class="edit-book">Edit</a>
                <a id="delete-book" onclick="ModalDelete(${newBook.id}, '${newBook.name}')" class="delete-book">Delete</a>
            </td>
        `;
        tbody.appendChild(newRow);
        toggleModalAdd();
        FormClear();
    } else {
        books = books.map(item => {
            if (item.id === idItem) {
                item.name = name;
                item.author = author;
                item.topic_id = topicId;
            }
            return item;
        });
        console.log(books);
        setDataTable(books);
        toggleModalAdd();
        FormClear();
    }
}
const Delete = () => {
    books = books.filter(item => item.id !== idItem);
    console.log(books);
    setDataTable(books);
    toggleModalDelete();
}
const getTopic = (topicId) => {
    const topic = topics.find(topic => topic.id === topicId);
    return topic ? topic.title : "";
}

closeModalDelete.addEventListener('click', toggleModalDelete);
btnCancel.addEventListener('click', toggleModalDelete);
overlayDelete.addEventListener('click', toggleModalDelete);
closeModalAdd.addEventListener('click', toggleModalAdd);
overlayAdd.addEventListener('click', toggleModalAdd);

console.log(searchInput);
searchInput.addEventListener('change', (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    const filteredBooks = books.filter(book => {
        const bookName = book.name.toLowerCase();
        return bookName.includes(searchValue);
    });
    setDataTable(filteredBooks);
})
