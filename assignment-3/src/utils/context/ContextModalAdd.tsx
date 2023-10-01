import { createContext } from 'react'
import { TypeContextModalAdd } from '../types'

export const ContextModalAdd = createContext<TypeContextModalAdd>({
  isOpenModalAdd: false,
  setIsOpenModalAdd: () => {},
})
