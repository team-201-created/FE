import {
  BlendMapsListResponse,
  ProductMapsListResponse,
  ProductPoolsListResponse,
  RecommendTabId,
} from '@/app/admin/recommend/_types'

export type FetchOptions = {
  page?: number
  size?: number
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

interface RecommendResponseMap {
  'blend-maps': BlendMapsListResponse
  'product-pools': ProductPoolsListResponse
  'product-maps': ProductMapsListResponse
}

// 추천 관리 받아오기
async function fetchAdminRecommendData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const params = new URLSearchParams()
  if (options.page != null) params.set('page', String(options.page))
  if (options.size != null) params.set('size', String(options.size))
  const qs = params.toString()
  const url = `${BASE_URL}/api/v1/admin/matches/${endpoint}${qs ? `?${qs}` : ''}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`실패: ${res.status}`)
  return res.json()
}

// 빈 값
const createEmptyData = <T extends RecommendTabId>(
  _tabId: T
): RecommendResponseMap[T] =>
  ({
    success: true,
    data: {
      content: [],
      page: 1,
      size: 10,
      total_elements: 0,
      total_pages: 0,
    },
  }) as RecommendResponseMap[T]

// 탭 ID를 넣으면 매핑된 타입을 자동으로 추론하여 반환
export const fetchAdminRecommendList = async <T extends RecommendTabId>(
  tabId: T,
  options?: FetchOptions
): Promise<RecommendResponseMap[T]> => {
  try {
    return await fetchAdminRecommendData<RecommendResponseMap[T]>(
      tabId,
      options
    )
  } catch (err) {
    console.error(`${tabId}에서 API 에러`, err)
    return createEmptyData(tabId)
  }
}

// 탭별 API 함수 모음
export const RECOMMEND_API = {
  get: <T extends RecommendTabId>(tabId: T, options?: FetchOptions) =>
    fetchAdminRecommendList(tabId, options),

  blendMaps: (options?: FetchOptions) =>
    fetchAdminRecommendList('blend-maps', options),
  productPools: (options?: FetchOptions) =>
    fetchAdminRecommendList('product-pools', options),
  productMaps: (options?: FetchOptions) =>
    fetchAdminRecommendList('product-maps', options),
}
