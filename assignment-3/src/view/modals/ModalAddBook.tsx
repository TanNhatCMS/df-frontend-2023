import React, { useCallback, useContext, useEffect } from 'react'
import { ContextModalAdd } from '../../utils/context/ContextModalAdd'
import { ContextDataBooks } from '../../utils/context/ContextDataBooks'
import { ContextViewBooks } from '../../utils/context/ContextViewBooks'
import { ContextTheme } from '../../utils/context/ContextTheme'
import { removeAccents } from '../../utils/functions'

function AddBookModal() {
  const [name, setName] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [topic, setTopic] = React.useState('Database')
  const modalAddContext = useContext(ContextModalAdd)
  const { itemBooks, setItemBooks, setSearchListBooks, keyWord } =
    useContext(ContextDataBooks)
  const { currentView, maxView } = useContext(ContextViewBooks)
  const { setIsOpenModalAdd } = modalAddContext
  const { theme } = useContext(ContextTheme)

  const handleCloseEsc = useCallback(
    (ev) => {
      ev.stopPropagation()
      if (ev.keyCode === 27) {
        setIsOpenModalAdd(false)
      }
    },
    [setIsOpenModalAdd],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleCloseEsc)
    return () => document.removeEventListener('keydown', handleCloseEsc)
  }, [handleCloseEsc])

  const handleClose = (ev) => {
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) setIsOpenModalAdd(false)
  }
  const handleAdd = (ev) => {
    ev.preventDefault()
    const id = itemBooks.length + 1
    const newList = [
      ...itemBooks,
      { id, name, author, topic, tag: name.toLowerCase() },
    ]
    setItemBooks(newList)
    setIsOpenModalAdd(false)
    localStorage.setItem('currentData', JSON.stringify(newList))
    if (currentView.length < maxView) {
      const item = { id, name, author, topic, tag: name.toLowerCase() }
      if (
        removeAccents(item.tag).includes(removeAccents(keyWord.toLowerCase()))
      )
        setSearchListBooks([
          ...currentView,
          { id, name, author, topic, tag: name.toLowerCase() },
        ])
    }
  }

  return (
    <div
      className="overlay"
      id="add-book-modal-overlay"
      onClick={handleClose}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="addBookModal"
      >
        <button
          type="button"
          className={`close-button closeable-element ${
            theme === 'dark' && 'dark'
          }`}
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => handleClose(ev)}
        >
          &times;
        </button>

        <h2>Add book</h2>
        <form name="addBookModalForm" onSubmit={handleAdd}>
          <label htmlFor="nameBook">
            Name
            <input
              type="text"
              id="nameBook"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>

          <label htmlFor="authorBook">
            Author
            <input
              type="text"
              id="authorBook"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
              required
              value={author}
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </label>

          <label htmlFor="topicBook">
            Topic
            <select
              name="topicBook"
              id="topicBook"
              title="topicBook"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="Programing" className="topicOption">
                Programing
              </option>
              <option value="Database" className="topicOption">
                Database
              </option>
              <option value="Devops" className="topicOption">
                Devops
              </option>
              <option value="Frontend" className="topicOption">
                Frontend
              </option>
              <option value="Backend" className="topicOption">
                Backend
              </option>
            </select>
          </label>

          <button
            type="submit"
            className={`primary standard-height-element ${
              theme === 'dark' && 'dark'
            }`}
          >
            Create
          </button>
        </form>
      </aside>
    </div>
  )
}

export default AddBookModal
