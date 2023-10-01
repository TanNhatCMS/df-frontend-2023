import React, { useEffect, useMemo, useState } from 'react'
import ControlBar from '../components/Search'
import Table from '../components/Table'
import AddBookModal from '../modals/ModalAddBook'
import { ContextModalAdd } from '../../utils/context/ContextModalAdd'
import PaginationWrapper from '../components/Pagination/PaginationWrapper'
import DeleteBookModal from '../modals/ModalDeleteBook'
import { ContextModalDelete } from '../../utils/context/ContextModalDelete'
import { ContextViewBooks } from '../../utils/context/ContextViewBooks'
import { ContextDataBooks } from '../../utils/context/ContextDataBooks'
import { itemBook } from '../../utils/types'
import initialDataBooks from '../../database/allBooks'

function BookShowPage() {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false)
  const [ItemDelete, setItemDelete] = useState<itemBook | undefined>(undefined)
  const [itemBooks, setItemBooks] = useState<itemBook[]>([])
  const [currentView, setCurrentView] = useState<itemBook[]>([])
  const [searchListBooks, setSearchListBooks] = useState<
    itemBook[] | undefined
  >([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [keyWord, setKeyWord] = useState<string>('')

  useEffect(() => {
    const localDataJson = localStorage.getItem('book')
    if (localDataJson !== null) {
      const curBooks = JSON.parse(localDataJson)
      setItemBooks(curBooks)
    } else {
      localStorage.setItem('book', JSON.stringify([...initialDataBooks]))
      setItemBooks([...initialDataBooks])
    }
  }, [])

  const valueAdd = useMemo(
    () => ({
      isOpenModalAdd,
      setIsOpenModalAdd,
    }),
    [isOpenModalAdd],
  )
  const valueDelete = useMemo(
    () => ({ ItemDelete, setItemDelete }),
    [ItemDelete],
  )
  const valueBooks = useMemo(
    () => ({
      itemBooks,
      setItemBooks,
      searchListBooks,
      setSearchListBooks,
      keyWord,
      setKeyWord,
    }),
    [itemBooks, searchListBooks, keyWord],
  )
  const valueCurrentView = useMemo(
    () => ({
      currentView,
      setCurrentView,
      currentPage,
      setCurrentPage,
      maxView: 5,
    }),
    [currentView, currentPage],
  )
  return (
    <ContextDataBooks.Provider value={valueBooks}>
      <ContextViewBooks.Provider value={valueCurrentView}>
        <ContextModalAdd.Provider value={valueAdd}>
          <ContextModalDelete.Provider value={valueDelete}>
            <section>
              <ControlBar />
              <PaginationWrapper data={itemBooks}>
                <Table />
              </PaginationWrapper>
              <footer>
                <div className="copyright">
                  &copy; 2023 || Made with TânNhậtCMS||
                  <a href="https://github.com/TanNhatCMS/df-frontend-2023/tree/main/assignment-3">
                    Source code
                  </a>
                </div>
              </footer>
            </section>
            {isOpenModalAdd && <AddBookModal />}
            {ItemDelete && <DeleteBookModal />}
          </ContextModalDelete.Provider>
        </ContextModalAdd.Provider>
      </ContextViewBooks.Provider>
    </ContextDataBooks.Provider>
  )
}

export default BookShowPage
