export type itemBook = {
  id: number
  name: string
  author: string
  topic: string
  tag: string
}
export type TypeContextTheme = {
  theme: string
  setTheme: (theme: string) => void
}
export type TypeContextModalDelete = {
  ItemDelete?: itemBook
  setItemDelete: (item: itemBook | undefined) => void
}
export type TypeContextModalAdd = {
  isOpenModalAdd: boolean
  setIsOpenModalAdd: (isOpen: boolean) => void
}
export type TypeContextViewBooks = {
  currentView: itemBook[]
  setCurrentView: (view: itemBook[]) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  maxView: number
}
export type TypeContextDataBooks = {
  itemBooks: itemBook[]
  setItemBooks: (itemBooks: itemBook[]) => void
  searchListBooks?: itemBook[]
  setSearchListBooks: (books: itemBook[] | undefined) => void
  keyWord: string
  setKeyWord: (value: string) => void
}

export type TypePagination = {
  totalPage: number
  siblingCount: number
  currentPage: number
  setCurrentPage: number
}
export type TypeButtonSwitch = {
  isOn: boolean
  handleToggle: () => void
  colorOne: string
  colorBtnOne: string
  colorTwo: string
  colorBtnTwo: string
  label: string
}
