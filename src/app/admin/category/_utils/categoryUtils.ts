import { CategoryChild } from '../_types/AdminCategoryType'

interface CategoryProcessOptions {
  q?: string
  page?: string | number
  pageSize: number
}

export function processCategoryItems(
  items: CategoryChild[],
  options: CategoryProcessOptions
) {
  const { q, page, pageSize } = options
  const currentPage = Math.max(1, Number(page) || 1)

  // 검색
  const filtered = q
    ? items.filter((item) => {
        const query = q.toLowerCase()
        return (
          item.name.kr.toLowerCase().includes(query) ||
          item.name.en.toLowerCase().includes(query)
        )
      })
    : items

  // 정렬
  const sorted = [...filtered].sort((a, b) => a.category_id - b.category_id)

  // 페이징
  const totalElements = sorted.length
  const totalPages = Math.ceil(totalElements / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginatedItems = sorted.slice(startIndex, startIndex + pageSize)

  return {
    items: paginatedItems,
    totalPages,
    currentPage,
    totalElements,
  }
}
