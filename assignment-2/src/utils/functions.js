import { BOOKS_PAGE_ITEM } from './config'

export function splitListIntoPages(list, itemsPerPage = BOOKS_PAGE_ITEM) {
  const pages = Math.ceil(list.length / itemsPerPage)
  const newListWithPagination = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage
    return list.slice(start, start + itemsPerPage)
  })
  return newListWithPagination
}

export function getURLParams(key) {
  if (typeof window === 'undefined') return null
  const query = new URLSearchParams(window.location.search)
  const value = query.get(key)
  return value
}

export function setURLParams(key, value) {
  if (typeof window === 'undefined') return null
  const query = new URLSearchParams(window.location.search)
  query.set(key, value)
  window.history.replaceState(null, null, `?${query.toString()}`)
}

export function removeURLParams(key) {
  if (typeof window === 'undefined') return null
  const query = new URLSearchParams(window.location.search)
  query.delete(key)
  window.history.replaceState(null, null, `?${query.toString()}`)
}

export function generateRandomString() {
  return Math.random().toString(36).substring(2, 15)
}

