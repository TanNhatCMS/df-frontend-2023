import React, { useState } from 'react'
import { ContextModalAdd } from '../../../utils/context/ContextModalAdd'
import { ContextDataBooks } from '../../../utils/context/ContextDataBooks'
import { ContextTheme } from '../../../utils/context/ContextTheme'
import { removeAccents } from '../../../utils/functions'

function Search() {
  const contextModalAdd = React.useContext(ContextModalAdd)
  const { setIsOpenModalAdd } = contextModalAdd
  const contextBooks = React.useContext(ContextDataBooks)
  const { itemBooks, setSearchListBooks, keyWord, setKeyWord } = contextBooks
  const { theme } = React.useContext(ContextTheme)
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout | undefined>(
    undefined,
  )

  const handleSearch = (value: string) => {
    clearTimeout(timeOutId)
    if (value === '') {
      setSearchListBooks([])
    } else {
      const newTimeOutId = setTimeout(() => {
        const dataShow = itemBooks.filter((item) =>
          removeAccents(item.tag).includes(removeAccents(value.toLowerCase())),
        )
        setSearchListBooks(dataShow.length > 0 ? dataShow : undefined)
      }, 500)
      setTimeOutId(newTimeOutId)
    }
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      clearTimeout(timeOutId)
      handleSearch(keyWord)
    }
  }

  return (
    <div id="handle-data-bar">
      <input
        type="text"
        placeholder="Search book"
        title="search"
        id="searchBar"
        className={`standard-height-element ${theme === 'dark' ? 'dark' : ''}`}
        onChange={(e) => setKeyWord(e.target.value)}
        onKeyDown={handleKeydown}
        value={keyWord}
      />
      <button
        id="add"
        type="button"
        className={`primary standard-height-element ${
          theme === 'dark' ? 'dark' : ''
        }`}
        onClick={() => setIsOpenModalAdd(true)}
      >
        Add book
      </button>
    </div>
  )
}

export default Search
