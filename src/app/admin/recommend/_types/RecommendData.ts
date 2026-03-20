export interface RecommendPaginationData<T> {
  results: T[]
  page: number
  size: number
  count: number
  total_pages: number
}

export interface RecommendApiResponse<T> {
  success: boolean
  data: RecommendPaginationData<T>
}

export const RECOMMEND_TABS = [
  { id: 'blend-maps', label: '향조합 추천맵' },
  { id: 'product-pools', label: '제품 후보군' },
  { id: 'product-maps', label: '제품 추천맵' },
] as const

export type RecommendTabId = (typeof RECOMMEND_TABS)[number]['id']
