import { createContext } from 'react'
import { TypeContextDataBooks } from '../types'

export const ContextDataBooks = createContext<TypeContextDataBooks>({
  itemBooks: [],
  setItemBooks: () => {},
  searchListBooks: [],
  setSearchListBooks: () => {},
  keyWord: '',
  setKeyWord: () => {},
})
