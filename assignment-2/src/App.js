import Main from "./Main/Main";
import Search from "./Search/Search";
import Button from "./Button/Button";
import Table from "./Table/Table";
import Modal from "./Modal/Modal";
import Notification from './Notification/Notification';
import initialDataBooks from "./database/book-store";
import { ThemeContext } from "./ThemeContext";
import { currentLanguage, setCurrentLanguage } from "./Language/Language";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isHoverDelete, setIsHoverDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dataTitle = ["#", "Name", "Author", "Topic", "Action"];
  const [dataBooks, setDataBooks] = useState([]);
  const [dataBooksShow, setDataBooksShow] = useState([]);
  const [newBook, setNewBook] = useState({});
  const [currentBookEdit, setCurrentBookEdit] = useState({});
  const [currentBookDelete, setCurrentBookDelete] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const setUp = async () => {
      const storedLanguage = localStorage.getItem("Language");
      if (storedLanguage) {
        setCurrentLanguage(storedLanguage);
      }
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
          "book-store",
          JSON.stringify([...initialDataBooks])
        );
      } else {
        setDataBooks(localDataBooks);
        setDataBooksShow(localDataBooks);
      }
      await new Promise((r) => setTimeout(r, 800));
      setIsLoading(false);
    };
    setUp();

  }, []);
  const handleToggleCreateModal = () => {
    if (!isShowModalCreate) {
      console.log("Open Modal Create Book");
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
      console.log("Open Modal Update Book");
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
      console.log("Open Modal Delete Book");
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

  const handleCreateBook = (book) => {
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
    handleSuccessMessage("create");
    handleToggleCreateModal();
  };

  const handleUpdateBook = (book) => {
    const newDataBook = dataBooks.map((item) => {
      if (item.id === book.id) {
        return book;
      }
      return item;
    });

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book", JSON.stringify(newDataBook));
    handleSuccessMessage("update");
    handleToggleEditModal();
  };

  const handleDeleteBook = (book) => {
    const newDataBook = dataBooks.filter((item) => {
      return item.id !== book.id;
    });

    setDataBooks(newDataBook);
    setDataBooksShow(newDataBook);
    localStorage.setItem("book", JSON.stringify(newDataBook));
    handleSuccessMessage("delete");
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

  const handleSuccessMessage = (action) => {
    const content = action === "create" ? "Create" : action === "delete" ? "Delete" : "";
    Notification.showNotification(`${content} success`);
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Notification />
      <Main>

        <div className={`store-actions row row-end theme-${theme}`}>
          <Search onChangeKeyword={handleSearch} />
          <Button title="Add book" handleClick={handleToggleCreateModal} />
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
        <Modal title="Add Book" handleToggleModal={handleToggleCreateModal}>
          <div className={`modal-content theme-${theme}`}>
            <form action="">
              <label htmlFor="input__name">Name</label>
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
              <label htmlFor="input__author">Author</label>
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
              <label htmlFor="input__topic">Topic</label>
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
                title="Create"
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
              <label htmlFor="input__name">Name</label>
              <input
                id="input__name"
                type="text"
                name="name"
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
              <label htmlFor="input__author">Author</label>
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
                title="Update"
                handleClick={() => handleUpdateBook(currentBookEdit)}
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
