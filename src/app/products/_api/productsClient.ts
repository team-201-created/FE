/**
 * 향(단품/조합) API
 * - 목데이터(MSW): NEXT_PUBLIC_USE_MOCK_API=true 시 같은 origin 요청 → MSW가 가로챔
 * - 실제 API: NEXT_PUBLIC_API_BASE_URL 사용
 */
import { apiFetch } from '@/lib/api'

export type SinglesResponse = {
  success: boolean
  data: {
    items: Array<{
      id: number
      name: string
      image_url: string
      accord_option: { id: number; name: string }
    }>
    page: number
    size: number
    total_count: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

export type CombinationsResponse = {
  success: boolean
  data: {
    items: Array<{
      id: number
      name: string
      image_url: string
      theme_option: { id: number; name: string }
      accord_options: Array<{ id: number; name: string }>
    }>
    page: number
    size: number
    total_count: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
  }
}

type FetchOptions = { page?: number; size?: number }

export async function fetchSingles(
  options: FetchOptions = {}
): Promise<SinglesResponse> {
  const params: Record<string, string> = {}
  if (options.page != null) params.page = String(options.page)
  if (options.size != null) params.size = String(options.size)
  const hasParams = Object.keys(params).length > 0
  return apiFetch.get<SinglesResponse>(
    '/api/v1/scents/singles',
    hasParams
      ? { params: params as Record<string, string | number> }
      : undefined
  )
}

/** API accord_option.name(한글) → 프론트 scentFamilyId */
export const accordNameToScentFamilyId: Record<string, string> = {
  베이스: 'base',
  시트러스: 'citrus',
  아로마틱: 'aromatic',
  우디: 'woody',
  플로럴: 'floral',
  오리엔탈: 'oriental',
  애니멀릭: 'animalic',
  머스크: 'animalic',
}

/** API theme_option.name(한글) → 프론트 노트 라벨 (#포함) */
export const themeNameToNoteLabel: Record<string, string> = {
  포근: '#포근',
  숙면: '#숙면',
  기분전환: '#기분전환',
  휴식: '#휴식',
  로맨틱: '#로맨틱',
  운동: '#운동',
  집중: '#집중',
}

export async function fetchCombinations(
  options: FetchOptions = {}
): Promise<CombinationsResponse> {
  const params: Record<string, string> = {}
  if (options.page != null) params.page = String(options.page)
  if (options.size != null) params.size = String(options.size)
  const hasParams = Object.keys(params).length > 0
  return apiFetch.get<CombinationsResponse>(
    '/api/v1/scents/combinations',
    hasParams
      ? { params: params as Record<string, string | number> }
      : undefined
  )
}

// ─── 상세 조회 (단품 / 조합) ─────────────────────────────────────────────

export type ElementDetailResponse = {
  success: boolean
  data: {
    id: number
    name: string
    image_url: string
    description: string
    accord_option: { id: number; name: string }
    product_link: string
  }
}

export type BlendDetailResponse = {
  success: boolean
  data: {
    id: number
    name: string
    image_url: string
    description: string
    theme_option: { id: number; name: string }
    accord_options: Array<{ id: number; name: string }>
    product_link: string
  }
}

export async function fetchElementDetail(
  elementId: number
): Promise<ElementDetailResponse> {
  return apiFetch.get<ElementDetailResponse>(
    `/api/v1/scents/elements/${elementId}`
  )
}

export async function fetchBlendDetail(
  blendId: number
): Promise<BlendDetailResponse> {
  return apiFetch.get<BlendDetailResponse>(`/api/v1/scents/blends/${blendId}`)
}
