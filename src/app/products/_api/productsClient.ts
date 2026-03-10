/**
 * 향(단품/조합) API — 명세 최종본 기준
 * - 목데이터(MSW): NEXT_PUBLIC_USE_MOCK_API=true 시 같은 origin 요청 → MSW가 가로챔
 * - 실제 API: NEXT_PUBLIC_API_BASE_URL 사용
 */
import { apiFetch } from '@/lib/api'

// ─── 공통: API 한글 이름 → 프론트 id/라벨 매핑 ─────────────────────────────

/** element_category.name.kr / contained_elements[].category.kr → scentFamilyId */
export const scentCategoryKrToId: Record<string, string> = {
  베이스: 'base',
  시트러스: 'citrus',
  아로마틱: 'aromatic',
  우디: 'woody',
  플로럴: 'floral',
  오리엔탈: 'oriental',
  애니멀릭: 'animalic',
  머스크: 'animalic',
}

/** blend_categories[].name.kr → 노트 라벨 (#포함) */
export const blendCategoryKrToNoteLabel: Record<string, string> = {
  포근: '#포근',
  숙면: '#숙면',
  기분전환: '#기분전환',
  휴식: '#휴식',
  로맨틱: '#로맨틱',
  로멘틱: '#로맨틱',
  운동: '#운동',
  집중: '#집중',
}

// ─── 단품 목록 GET /api/v1/scents/elements ─────────────────────────────────

export type ElementsListResponse = {
  success: boolean
  data: {
    results: Array<{
      id: number
      name: string
      thumbnail_image_url: string
      element_category: {
        name: { kr: string; en: string }
      }
    }>
    page: number
    size: number
    count: number
    total_pages: number
  }
}

export type ElementsListParams = {
  q?: string
  scent_category_id?: number
  sort?: string
  page?: number
  size?: number
}

export async function fetchElements(
  params: ElementsListParams = {}
): Promise<ElementsListResponse> {
  const query: Record<string, string> = {}
  if (params.q != null) query.q = params.q
  if (params.scent_category_id != null)
    query.scent_category_id = String(params.scent_category_id)
  if (params.sort != null) query.sort = params.sort
  if (params.page != null) query.page = String(params.page)
  if (params.size != null) query.size = String(params.size)
  const hasParams = Object.keys(query).length > 0
  return apiFetch.get<ElementsListResponse>(
    '/api/v1/scents/elements',
    hasParams ? { params: query as Record<string, string | number> } : undefined
  )
}

// ─── 단품 상세 GET /api/v1/scents/elements/{element_id} ────────────────────

export type ElementDetailResponse = {
  success: boolean
  data: {
    id: number
    name: string
    image_url: string | string[]
    description: string | null
    element_category: {
      id: number
      name: { kr: string; en: string }
    }
  }
}

export async function fetchElementDetail(
  elementId: number
): Promise<ElementDetailResponse> {
  return apiFetch.get<ElementDetailResponse>(
    `/api/v1/scents/elements/${elementId}`
  )
}

// ─── 조합 목록 GET /api/v1/scents/blends ───────────────────────────────────

export type BlendsListResponse = {
  success: boolean
  data: {
    results: Array<{
      id: number
      name: string
      thumbnail_image_url: string
      blend_categories: Array<{ name: { kr: string; en: string } }>
    }>
    page: number
    size: number
    count: number
    total_pages: number
  }
}

export type BlendsListParams = {
  q?: string
  blend_category_id?: number
  scent_category_id?: number
  sort?: string
  page?: number
  size?: number
}

export async function fetchBlends(
  params: BlendsListParams = {}
): Promise<BlendsListResponse> {
  const query: Record<string, string> = {}
  if (params.q != null) query.q = params.q
  if (params.blend_category_id != null)
    query.blend_category_id = String(params.blend_category_id)
  if (params.scent_category_id != null)
    query.scent_category_id = String(params.scent_category_id)
  if (params.sort != null) query.sort = params.sort
  if (params.page != null) query.page = String(params.page)
  if (params.size != null) query.size = String(params.size)
  const hasParams = Object.keys(query).length > 0
  return apiFetch.get<BlendsListResponse>(
    '/api/v1/scents/blends',
    hasParams ? { params: query as Record<string, string | number> } : undefined
  )
}

// ─── 조합 상세 GET /api/v1/scents/blends/{blend_id} ────────────────────────

export type BlendDetailResponse = {
  success: boolean
  data: {
    id: number
    name: string
    image_url: string
    description: string | null
    blend_categories: Array<{
      id: number
      name: { kr: string; en: string }
    }>
    contained_elements: Array<{
      name: string
      category: { kr: string; en: string }
    }>
    purchase_url: string | null
  }
}

export async function fetchBlendDetail(
  blendId: number
): Promise<BlendDetailResponse> {
  return apiFetch.get<BlendDetailResponse>(`/api/v1/scents/blends/${blendId}`)
}
