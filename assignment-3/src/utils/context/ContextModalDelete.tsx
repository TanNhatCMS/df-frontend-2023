import { createContext } from 'react'
import { TypeContextModalDelete } from '../types'

export const ContextModalDelete = createContext<TypeContextModalDelete>({
  ItemDelete: undefined,
  setItemDelete: () => {},
})
