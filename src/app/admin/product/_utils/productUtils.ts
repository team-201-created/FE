import {
  AdminElementProduct,
  AdminBlendProduct,
} from '../_types/AdminProductType'

interface ProductProcessOptions {
  q?: string
  page?: string | number
  pageSize: number
}

export function processProductItems(
  items: (AdminElementProduct | AdminBlendProduct)[],
  options: ProductProcessOptions
) {
  const { q, page, pageSize } = options
  const currentPage = Math.max(1, Number(page) || 1)

  // 1. 검색 (Product는 name이 string임)
  const filtered = q
    ? items.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()))
    : items

  // 2. 정렬 (Product는 id 기반)
  const sorted = [...filtered].sort((a, b) => a.id - b.id)

  // 3. 페이징
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
