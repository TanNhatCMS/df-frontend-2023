import React, { useCallback, useContext, useEffect } from 'react'
import { ContextModalDelete } from '../../utils/context/ContextModalDelete'
import { ContextDataBooks } from '../../utils/context/ContextDataBooks'
import { ContextViewBooks } from '../../utils/context/ContextViewBooks'
import { ContextTheme } from '../../utils/context/ContextTheme'

function ModalDeleteBook() {
  const modalDeleteContext = React.useContext(ContextModalDelete)
  const { itemBooks, setItemBooks, searchListBooks, setSearchListBooks } =
    useContext(ContextDataBooks)
  const { currentView, currentPage, setCurrentPage, maxView } =
    useContext(ContextViewBooks)
  const { ItemDelete, setItemDelete } = modalDeleteContext
  const { theme } = useContext(ContextTheme)

  const handleCloseByEsc = useCallback(
    (ev) => {
      ev.stopPropagation()
      if (ev.keyCode === 27) {
        setItemDelete(undefined)
      }
    },
    [setItemDelete],
  )
  useEffect(() => {
    document.addEventListener('keydown', (ev) => handleCloseByEsc(ev))
    return () =>
      document.removeEventListener('keydown', (ev) => handleCloseByEsc(ev))
  }, [handleCloseByEsc])

  const handleClose = (ev) => {
    ev.stopPropagation()
    if (ev.currentTarget === ev.target) {
      setItemDelete(undefined)
    }
  }
  const handleDelete = () => {
    const { id } = ItemDelete!
    const newList = itemBooks.filter((item) => item.id !== id)
    setItemBooks(newList)
    setItemDelete(undefined)
    if (newList.length > 0)
      localStorage.setItem('currentData', JSON.stringify(newList))
    if (currentView.length < maxView && searchListBooks!.length > 0) {
      const newCurrentView = searchListBooks!.filter((item) => item.id !== id)
      setSearchListBooks([...newCurrentView])
    }
    if (currentView.length === 1) {
      const cur = currentPage
      setCurrentPage(cur - 1)
    }
  }

  return (
    <div
      className="overlay"
      id="delete-modal-overlay"
      onClick={handleClose}
      role="presentation"
    >
      <aside
        className={`modal ${theme === 'dark' && 'dark'}`}
        id="deleteBookModal"
      >
        <button
          type="button"
          className={`close-button closeable-element ${
            theme === 'dark' && 'dark'
          }`}
          onClick={handleClose}
        >
          &times;
        </button>
        <article>
          <h2>Delete book</h2>
          <p>
            Do you want to delete{' '}
            <mark className={`delete-name ${theme === 'dark' && 'dark'}`}>
              {ItemDelete!.name}
            </mark>
            .
          </p>
          <div id="button-group">
            <button
              type="button"
              id="delete-button"
              className={`standard-height-element ${
                theme === 'dark' && 'dark'
              }`}
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className={`primary standard-height-element closeable-element ${
                theme === 'dark' && 'dark'
              }`}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </article>
      </aside>
    </div>
  )
}

export default ModalDeleteBook
