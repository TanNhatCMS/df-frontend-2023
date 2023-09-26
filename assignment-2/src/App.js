import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from "./view/context";
import Main from "./view/components/Main";
import Search from "./view/components/Search";
import Button from "./view/components/Button";
import Table from "./view/components/Table";
import Modal from "./view/components/Modal";
import Notification from './view/components/Notification';
import initialDataBooks from "./database/book-store";
import "./style/App.css";

function App() {
  const [theme, setTheme] = useState("");
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isHoverDelete, setIsHoverDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataBooks, setDataBooks] = useState([]);
  const [dataBooksShow, setDataBooksShow] = useState([]);
  const [newBook, setNewBook] = useState({});
  const [currentBookEdit, setCurrentBookEdit] = useState({});
  const [currentBookDelete, setCurrentBookDelete] = useState({});

  function getTranslation(key) {
    return t(key);
  };
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme(localTheme);
    }
  }, [setTheme]);
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, [setCurrentLanguage]);
  useEffect(() => {
    const setUp = async () => {
      const localPage = Number(localStorage.getItem("page"));
      const localDataBooks = JSON.parse(localStorage.getItem("book"));

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
      <Main currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange}>
              <Notification />
        <div className={`store-actions actions row row-end theme-${theme}`}>
          <Search onChangeKeyword={handleSearch} />
          <Button title={getTranslation("addbook")} handleClick={handleToggleCreateModal} />
        </div>
        <div className={`store-data row theme-${theme}`}>
          <Table
            currentPage={currentPage}
            data={dataBooksShow}
            handleActions={[
              setCurrentPage,
              handleToggleEditModal,
              handleToggleDeleteModal,
            ]}
          />
        </div>
    

      {/* Modal Create Book */}
      {isShowModalCreate && (
        <Modal title={t("addbook")} handleToggleModal={handleToggleCreateModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="name">{t("name")}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("namePlaceholder")}
                autoComplete="on"
                value={newBook.name}
                onChange={(event) =>
                  setNewBook({ ...newBook, name: event.target.value })
                }
              />
              <label htmlFor="input__author">{t("author")}</label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder={t("authorPlaceholder")}
                autoComplete="on"
                value={newBook.author}
                onChange={(event) =>
                  setNewBook({ ...newBook, author: event.target.value })
                }
              />
              <label htmlFor="topic">{t("topic")}</label>
              <select
                id="topic"
                name="topic"
                value={newBook.topic}
                onChange={(event) =>
                  setNewBook({ ...newBook, topic: event.target.value })
                }
              >
                <option value="" disabled hidden>
                  {t("selectTopic")}
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
              <label htmlFor="name">{getTranslation("name")}</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("namePlaceholder")}
                autoComplete="on"
                value={currentBookEdit.name}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    name: event.target.value,
                  })
                }
              />
              <label htmlFor="author">{t("author")}</label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder={t("authorPlaceholder")}
                autoComplete="on"
                value={currentBookEdit.author}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    author: event.target.value,
                  })
                }
              />
              <label htmlFor="topic">{t("topic")}</label>
              <select
                id="topic"
                name="topic"
                value={currentBookEdit.topic}
                onChange={(event) =>
                  setCurrentBookEdit({
                    ...currentBookEdit,
                    topic: event.target.value,
                  })
                }
              >
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
        <Modal title={t("deleteBook")} handleToggleModal={handleToggleDeleteModal}>
          <div className={`modal-content content-center  theme-${theme}`}>
            <span>{t("deleteBookConfirmation")}</span>
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
                title={t("delete")}
                handleClick={() => handleDeleteBook(currentBookDelete)}
                handleHover={() => {
                  if (!isHoverDelete) {
                    setIsHoverDelete(!isHoverDelete);
                  }
                }}
              >
                {t("delete")}
              </Button>
              <Button
                option={true}
                selected={!isHoverDelete}
                title={t("cancel")}
                handleClick={handleToggleDeleteModal}
                handleHover={() => {
                  if (isHoverDelete) {
                    setIsHoverDelete(!isHoverDelete);
                  }
                }}
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
      </Main>
      </ThemeContext.Provider>
  );
}
export default App;
