import { createContext } from 'react'
import { TypeContextTheme } from '../types'

export const ContextTheme = createContext<TypeContextTheme>({
  theme: 'light',
  setTheme: () => {},
})
