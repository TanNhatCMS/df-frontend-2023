import { createContext } from 'react'
import { TypeContextViewBooks } from '../types'

export const ContextViewBooks = createContext<TypeContextViewBooks>({
  currentView: [],
  setCurrentView: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  maxView: 5,
})
