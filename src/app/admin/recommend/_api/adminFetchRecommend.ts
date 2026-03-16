import {
  BlendMapsListResponse,
  ProductMapsListResponse,
  ProductPoolsListResponse,
  RecommendTabId,
} from '@/app/admin/recommend/_types'
import { authFetch } from '@/lib/api'

export type BlendMapsFetchOptions = {
  input_type?: string
  publish_status?: string
  q?: string
  sort?: string
  page?: number
  size?: number
}

export type ProductPoolsFetchOptions = {
  adoption_status?: string
  q?: string
  sort?: string
  page?: number
  size?: number
}

export type ProductMapsFetchOptions = {
  publish_status?: string
  q?: string
  sort?: string
  page?: number
  size?: number
}

// 탭별 쿼리 파라미터 옵션 매핑
interface RecommendOptionsMap {
  'blend-maps': BlendMapsFetchOptions
  'product-pools': ProductPoolsFetchOptions
  'product-maps': ProductMapsFetchOptions
}

// 탭별 응답 타입 매핑
interface RecommendResponseMap {
  'blend-maps': BlendMapsListResponse
  'product-pools': ProductPoolsListResponse
  'product-maps': ProductMapsListResponse
}

// 탭 ID를 넣으면 매핑된 타입을 자동으로 추론하여 반환
export const fetchAdminRecommendList = <T extends RecommendTabId>(
  tabId: T,
  options?: RecommendOptionsMap[T]
): Promise<RecommendResponseMap[T]> =>
  authFetch.get<RecommendResponseMap[T]>(`/api/v1/admin/matches/${tabId}`, {
    params: options,
    cache: 'force-cache',
    next: { tags: [`${tabId}`] },
  })

// 탭별 API 함수 모음
export const RECOMMEND_API = {
  get: <T extends RecommendTabId>(tabId: T, options?: RecommendOptionsMap[T]) =>
    fetchAdminRecommendList(tabId, options),

  blendMaps: (options?: BlendMapsFetchOptions) =>
    fetchAdminRecommendList('blend-maps', options),
  productPools: (options?: ProductPoolsFetchOptions) =>
    fetchAdminRecommendList('product-pools', options),
  productMaps: (options?: ProductMapsFetchOptions) =>
    fetchAdminRecommendList('product-maps', options),
}
