import { RecommendTabId } from '@/app/admin/recommend/_types'

export type FetchOptions = {
  page?: number
  size?: number
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// 추천 관리 받아오기
async function fetchAdminRecommendData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const params = new URLSearchParams()
    if (options.page != null) params.set('page', String(options.page))
    if (options.size != null) params.set('size', String(options.size))
    const qs = params.toString()
    const url = `${BASE_URL}/api/v1/admin/matches/${endpoint}${qs ? `?${qs}` : ''}`

    const res = await fetch(url)
    if (!res.ok) throw new Error(`실패: ${res.status}`)
    return res.json()
  } catch (err) {
    console.error(`${endpoint}에서 API 에러`, err)
    return createEmptyData()
  }
}

// 빈 값
const createEmptyData = (): any => ({
  success: true,
  data: {
    content: [],
    page: 1,
    size: 10,
    total_elements: 0,
    total_pages: 0,
  },
})

// 탭 ID가 곧 엔드포인트이므로 탭 ID를 주면 알아서 가져오는 함수
export const fetchAdminRecommendList = (
  tabId: RecommendTabId,
  options?: FetchOptions
) => fetchAdminRecommendData<any>(tabId, options)

// 탭별 API 함수 모음
export const RECOMMEND_API = {
  get: (tabId: RecommendTabId, options?: FetchOptions) =>
    fetchAdminRecommendList(tabId, options),

  blendMaps: (options?: FetchOptions) =>
    fetchAdminRecommendList('blend-maps', options),
  productPools: (options?: FetchOptions) =>
    fetchAdminRecommendList('product-pools', options),
  productMaps: (options?: FetchOptions) =>
    fetchAdminRecommendList('product-maps', options),
}
