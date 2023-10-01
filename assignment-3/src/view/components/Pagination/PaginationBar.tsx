import React, { useContext } from 'react'
import './style.css'
import { ContextTheme } from '../../../utils/context/ContextTheme'

function rangePagi(current: number, sibling: number, totalPage: number) {
  const range: Array<number | string> = [1]
  const lastPageInCurrentInteractRange = current + sibling

  if (sibling * 2 + 3 > totalPage) {
    const temp = Array.from({ length: totalPage }).map((_, index) => index + 1)
    return temp
  }

  if (current <= 1 + sibling + 1) {
    const temp = Array.from({ length: sibling * 2 + 2 }).map(
      (_, index) => 1 + index + 1,
    )
    range.push(...temp)
    range.push('...')
    range.push(totalPage)
    return range
  }
  if (lastPageInCurrentInteractRange >= totalPage - 1) {
    const temp = Array.from({ length: sibling * 2 + 2 })
      .map((_, index) => totalPage - index - 1)
      .reverse()
    range.push('...')
    range.push(...temp)
    range.push(totalPage)
    return range
  }
  range.push('...')
  const temp = Array.from({ length: sibling + 1 }).map(
    (_, index) => current - sibling + index,
  )
  range.push(...temp)
  if (lastPageInCurrentInteractRange < totalPage - 1) {
    const temp = Array.from({ length: sibling }).map(
      (_, index) => current + index + 1,
    )
    range.push(...temp)
    range.push('...')
    range.push(totalPage)
  } else {
    const pageLeft = totalPage - current
    const temp = Array.from({ length: pageLeft })
      .map((_, index) => totalPage - index)
      .reverse()
    range.push(...temp)
  }
  return range
}

function PaginationBar({
  totalPage,
  siblingCount = 1,
  currentPage,
  setCurrentPage,
}) {
  const DOTS = '...'
  const visiblePage = rangePagi(currentPage, siblingCount, totalPage)
  const { theme } = useContext(ContextTheme)

  return (
    <div className={`pagination-wrapper ${theme === 'dark' ? 'dark' : ''}`}>
      <button
        disabled={currentPage === 1}
        className={`pagination-button ${theme === 'dark' ? 'dark' : ''}`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {visiblePage.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            disabled={page === DOTS}
            className={`pagination-button ${
              page === currentPage ? 'activePage' : ''
            } ${theme === 'dark' ? 'dark' : ''}`}
          >
            {page}
          </button>
        )
      })}
      <button
        disabled={currentPage === totalPage}
        className={`pagination-button ${theme === 'dark' ? 'dark' : ''}`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationBar
