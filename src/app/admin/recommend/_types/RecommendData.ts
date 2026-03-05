export interface PaginationData<T> {
  content: T[]
  page: number
  size: number
  total_elements: number
  total_pages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

export type PaginatedApiResponse<T> = ApiResponse<PaginationData<T>>

export const RECOMMEND_TABS = [
  { id: 'blend-maps', label: '향조합 추천맵' },
  { id: 'product-pools', label: '제품 후보군' },
  { id: 'product-maps', label: '제품 추천맵' },
] as const

export type RecommendTabId = (typeof RECOMMEND_TABS)[number]['id']
