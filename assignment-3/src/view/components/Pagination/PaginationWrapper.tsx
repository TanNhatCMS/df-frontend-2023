import React, { useEffect } from 'react'
import PaginationBar from './PaginationBar'
import { ContextViewBooks } from '../../../utils/context/ContextViewBooks'
import { ContextDataBooks } from '../../../utils/context/ContextDataBooks'

function PaginationWrapper({ children, data }) {
  const bookViewContext = React.useContext(ContextViewBooks)
  const booksContext = React.useContext(ContextDataBooks)
  const { setCurrentView, currentPage, setCurrentPage, maxView } =
    bookViewContext
  const { searchListBooks } = booksContext

  useEffect(() => {
    if (searchListBooks === undefined) {
      setCurrentView([])
    } else if (searchListBooks.length > 0) {
      setCurrentPage(1)
      const dataShow = searchListBooks.slice(
        (currentPage - 1) * maxView,
        currentPage * maxView,
      )

      setCurrentView(dataShow)
    } else {
      const dataShow = data.slice(
        (currentPage - 1) * maxView,
        currentPage * maxView,
      )
      setCurrentView(dataShow)
    }
  }, [
    currentPage,
    data,
    searchListBooks,
    maxView,
    setCurrentView,
    setCurrentPage,
  ])
  let totalPage = 0
  if (searchListBooks === undefined) totalPage = 1
  else
    totalPage =
      searchListBooks.length > 0
        ? Math.ceil(searchListBooks.length / maxView)
        : Math.ceil(data.length / maxView)
  return (
    <>
      {children}
      <PaginationBar
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        siblingCount={1}
      />
    </>
  )
}

export default PaginationWrapper
