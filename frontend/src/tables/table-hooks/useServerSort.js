import { useState } from 'react'

const useServerSort = (initialSortBy, initialOrder, initialPageSize) => {
  const [sortOrder, setSortOrder] = useState(initialOrder || null)
  const [sortBy, setSortBy] = useState(initialSortBy || null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize || 10)

  const setSortColumn = (label) => {
    if (sortBy && label !== sortBy) {
      setSortOrder(1)
      setSortBy(label)
      return
    }
    if (sortOrder === null) {
      setSortOrder(1)
      setSortBy(label)
    } else if (sortOrder === 1) {
      setSortOrder(-1)
      setSortBy(label)
    } else if (sortOrder === -1) {
      setSortOrder(null)
      setSortBy(null)
    }
  }

  return {
    sortOrder,
    sortBy,
    setSortColumn,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber
  }
}

export default useServerSort
