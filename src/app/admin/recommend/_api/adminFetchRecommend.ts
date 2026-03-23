import {
  BlendMapsDetailResponse,
  BlendMapsListResponse,
  ProductMapsDetailResponse,
  ProductMapsListResponse,
  ProductPoolsDetailResponse,
  ProductPoolsListResponse,
  RecommendTabId,
} from '@/app/admin/recommend/_types'
import { authFetch } from '@/lib/api'

export type BlendMapsFetchOptions = {
  input_type?: string
  publish_status?: string
  sort?: string
  page?: number
  size?: number
}

export type ProductPoolsFetchOptions = {
  adoption_status?: string
  sort?: string
  page?: number
  size?: number
}

export type ProductMapsFetchOptions = {
  publish_status?: string
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

// 탭별 목록 응답 타입 매핑
interface RecommendResponseMap {
  'blend-maps': BlendMapsListResponse
  'product-pools': ProductPoolsListResponse
  'product-maps': ProductMapsListResponse
}

// 탭별 상세 응답 타입 매핑
interface RecommendDetailResponseMap {
  'blend-maps': { success: boolean; data: BlendMapsDetailResponse }
  'product-pools': { success: boolean; data: ProductPoolsDetailResponse }
  'product-maps': { success: boolean; data: ProductMapsDetailResponse }
}

// 탭 ID를 넣으면 매핑된 타입을 자동으로 추론하여 반환
export const fetchAdminRecommendList = <T extends RecommendTabId>(
  tabId: T,
  options?: RecommendOptionsMap[T]
): Promise<RecommendResponseMap[T]> =>
  authFetch.get<RecommendResponseMap[T]>(`/api/v1/admin/matches/${tabId}`, {
    params: options,
    cache: 'no-store',
  })

// 단건 조회 (삭제와 동일 엔드포인트, GET)
export const fetchAdminRecommendDetail = <T extends RecommendTabId>(
  tabId: T,
  id: number
): Promise<RecommendDetailResponseMap[T]> =>
  authFetch.get<RecommendDetailResponseMap[T]>(
    `/api/v1/admin/matches/${tabId}/${id}`
  )

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
