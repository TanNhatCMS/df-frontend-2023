import Main from "./view/layouts/Main/Main";
import Search from "./view/components/Search/Search";
import Button from "./view/components/Button/Button";
import Table from "./view/components/Table/Table";
import Modal from "./view/components/Modal/Modal";
import Notification from './view/components/Notification/Notification';
import initialDataBooks from "./database/book-store";
import { ThemeContext } from "./view/contexts/ThemeContext";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [theme, setTheme] = useState("");
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isHoverDelete, setIsHoverDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataTitle, setTitle] = useState([]);
  const [dataBooks, setDataBooks] = useState([]);
  const [dataBooksShow, setDataBooksShow] = useState([]);
  const [newBook, setNewBook] = useState({});
  const [currentBookEdit, setCurrentBookEdit] = useState({});
  const [currentBookDelete, setCurrentBookDelete] = useState({});

  const english = {
    language: "English",
    titleSite: "BookStore",
    addbook: "Add Book",
    create: "Create",
    cancel: "Cancel",
    searchbook: "Search Book",
    namePlaceholder: "Enter Name Book",
    authorPlaceholder: "Enter Author Book",
    modalTitle: "Add New Book",
    name: "Name",
    edit: "Edit",
    delete: "Delete",
    author: "Author",
    topic: "Topic",
    action: "Action",
    confirm: "Confirm",
    close: "Close",
    id: "#",
    selectTopic: "Select Topic",
    editBook: "Edit Book",
    saveBook: "Save Book",
    deleteBook: "Delete Book",
    deleteBookConfirmation: "Do you want to delete ",
  };
  const vietnamese = {
    language: "Tiếng Việt",
    titleSite: "Cửa hàng sách",
    addbook: "Thêm Sách",
    create: "Thêm Sách",
    cancel: "Hủy",
    searchbook: "Tìm Sách",
    namePlaceholder: "Nhập tên sách",
    authorPlaceholder: "Nhập tác giả",
    modalTitle: "Thêm Sách Mới",
    name: "Tên Sách",
    edit: "Sửa",
    delete: "Xoá",
    author: "Tác giả",
    topic: "Chủ đề",
    action: "Hành động",
    confirm: "Xác nhận",
    close: "Đóng",
    id: "STT",
    selectTopic: "Chọn chủ đề",
    editBook: "Sửa thông tin sách",
    saveBook: "Lưu",
    deleteBook: "Xoá sách",
    deleteBookConfirmation: "Bạn có muốn xóa ",
  };
  function getTranslation(key) {
    if (currentLanguage === "en") {
      return english[key] || key;
    } else {
      return vietnamese[key] || key;
    }
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("currentLanguage");
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
    setTitle([getTranslation("id"), getTranslation("name"), getTranslation("author"), getTranslation("topic"), getTranslation("action")]);

    const setUp = async () => {

      const localTheme = localStorage.getItem("theme");
      const localPage = Number(localStorage.getItem("page"));
      const localDataBooks = JSON.parse(localStorage.getItem("book"));

      if (!localTheme) {
        setTheme("light");
        localStorage.setItem("theme", "light");
      } else {
        setTheme(localTheme);
      }

      if (!localPage) {
        setCurrentPage(1);
        localStorage.setItem("page", "1");
      } else {
        setCurrentPage(localPage);
      }
      if (!localDataBooks) {
        setDataBooks([...initialDataBooks]);
        setDataBooksShow([...initialDataBooks]);
        localStorage.setItem(
          "book",
          JSON.stringify([...initialDataBooks])
        );
      } else {
        setDataBooks(localDataBooks);
        setDataBooksShow(localDataBooks);
      }
      await new Promise((r) => setTimeout(r, 800));
    };
    setUp();

  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  const handleToggleCreateModal = () => {
    if (!isShowModalCreate) {
      setNewBook({
        name: "",
        author: "",
        topic: "",
      });
    }
    setIsShowModalCreate(!isShowModalCreate);
  };

  const handleToggleEditModal = (id) => {
    if (!isShowModalEdit) {
      const currentBook = dataBooks.find((item) => item.id === id);
      if (currentBook) {
        setCurrentBookEdit(currentBook);
      } else {
        setCurrentBookEdit({
          name: "",
          author: "",
          topic: "",
        });
      }
    }

    setIsShowModalEdit(!isShowModalEdit);
  };

  const handleToggleDeleteModal = (id) => {
    if (!isShowModalDelete) {
      const currentBook = dataBooks.find((item) => item.id === id);
      if (currentBook) {
        setCurrentBookDelete(currentBook);
      } else {
        setCurrentBookDelete({
          name: "",
          author: "",
          topic: "",
        });
      }
    }
    setIsShowModalDelete(!isShowModalDelete);
  };
  const CheckInput = (book) => {
    if (!book.name) {
      Notification.showErrorNotification("Please enter book name");
      return true;
    }
    if (!book.author) {
      Notification.showErrorNotification("Please enter book author");
      return true;
    }
    if (!book.topic) {
      Notification.showErrorNotification("Please enter book topic");
      return true;
    }
    return false;
  }
  const handleCreateBook = (book) => {
    if (CheckInput(book)) {
      return;
    }
    const newDataBook = [
      ...dataBooks,
      {
        id: dataBooks.slice(-1)[0].id + 1,
        ...book,
      },
    ];

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book", JSON.stringify(newDataBook));
    Notification.showSuccessNotification("Create success");
    handleToggleCreateModal();
  };

  const handleEditBook = (book) => {
    if (CheckInput(book)) {
      return;
    }
    const newDataBook = dataBooks.map((item) => {
      if (item.id === book.id) {
        return book;
      }
      return item;
    });
    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book", JSON.stringify(newDataBook));
    Notification.showSuccessNotification("Edit success");
    handleToggleEditModal();
  };

  const handleDeleteBook = (book) => {
    const newDataBook = dataBooks.filter((item) => {
      return item.id !== book.id;
    });
    setCurrentPage(1);
    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book", JSON.stringify(newDataBook));
    Notification.showSuccessNotification("Delete success");
    handleToggleDeleteModal();
  };

  const handleSearch = (keyword) => {
    keyword = keyword.toLowerCase();
    const newDataBook = dataBooks.filter((book) => {
      return book.name.toLowerCase().includes(keyword);
    });

    setDataBooksShow(newDataBook);
    setCurrentPage(1);
    localStorage.setItem("page", "1");
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Notification />

      <Main currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange}>
        <div className={`store-actions actions row row-end theme-${theme}`}>
          <Search onChangeKeyword={handleSearch} />
          <Button title={getTranslation("addbook")} handleClick={handleToggleCreateModal} />
        </div>
        <div className={`store-data row theme-${theme}`}>
          <Table
            currentPage={currentPage}
            dataTitle={dataTitle}
            data={dataBooksShow}
            handleActions={[
              setCurrentPage,
              handleToggleEditModal,
              handleToggleDeleteModal,
            ]}
          />
        </div>
      </Main>

      {/* Modal Create Book */}
      {isShowModalCreate && (
        <Modal title={getTranslation("addbook")} handleToggleModal={handleToggleCreateModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="input__name">{getTranslation("name")}</label>
              <input
                id="input__name"
                type="text"
                name="name"
                placeholder="Enter book's name ..."
                autoComplete="on"
                value={newBook.name}
                onChange={(event) =>
                  setNewBook({ ...newBook, name: event.target.value })
                }
              />
              <label htmlFor="input__author">{getTranslation("author")}</label>
              <input
                id="input__author"
                type="text"
                name="author"
                placeholder="Enter book's author ..."
                autoComplete="on"
                value={newBook.author}
                onChange={(event) =>
                  setNewBook({ ...newBook, author: event.target.value })
                }
              />
              <label htmlFor="input__topic">{getTranslation("topic")}</label>
              <select
                id="input__topic"
                name="topic"
                value={newBook.topic}
                onChange={(event) =>
                  setNewBook({ ...newBook, topic: event.target.value })
                }
              >
                <option value="" disabled hidden>
                  Select book's topic
                </option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Devops">Devops</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <div className="footer__action">
              <Button
                title={getTranslation("create")}
                handleClick={() => handleCreateBook(newBook)}
              ></Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Edit Book */}
      {isShowModalEdit && (
        <Modal title="Edit Book" handleToggleModal={handleToggleEditModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="input__name">{getTranslation("name")}</label>
              <input
                id="input__name"
                type="text"
                name="name"
                title="Please enter book name"
                placeholder="Enter book's name ..."
                autoComplete="on"
                value={currentBookEdit.name}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    name: event.target.value,
                  })
                }
              />
              <label htmlFor="input__author">{getTranslation("author")}</label>
              <input
                id="input__author"
                type="text"
                name="author"
                placeholder="Enter book's author ..."
                autoComplete="on"
                value={currentBookEdit.author}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    author: event.target.value,
                  })
                }
              />
              <label htmlFor="input__topic">Topic</label>
              <select
                id="input__topic"
                name="topic"
                value={currentBookEdit.topic}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    topic: event.target.value,
                  })
                }
              >
                <option value="" disabled hidden>
                  Select book's topic
                </option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Devops">Devops</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </form>
          </div>
          <div className="modal-footer">
            <div className="footer__action">
              <Button
                title="Save"
                handleClick={() => handleEditBook(currentBookEdit)}
              ></Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Delete Book */}
      {isShowModalDelete && (
        <Modal title="Delete Book" handleToggleModal={handleToggleDeleteModal}>
          <div className={`modal-content content-center  theme-${theme}`}>
            <span>Do you want to delete the book named</span>
            <br />
            <span>
              <b>{currentBookDelete.name}</b> ?
            </span>
          </div>
          <div className="modal-footer">
            <div className="footer__action footer-around">
              <Button
                option={true}
                selected={isHoverDelete}
                title="Delete"
                handleClick={() => handleDeleteBook(currentBookDelete)}
                handleHover={() => {
                  if (!isHoverDelete) {
                    setIsHoverDelete(!isHoverDelete);
                  }
                }}
              >
                Delete
              </Button>
              <Button
                option={true}
                selected={!isHoverDelete}
                title="Cancel"
                handleClick={handleToggleDeleteModal}
                handleHover={() => {
                  if (isHoverDelete) {
                    setIsHoverDelete(!isHoverDelete);
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </ThemeContext.Provider>
  );
}
export default App;
