/**
 * API 베이스 URL
 * - 목데이터(MSW) 사용 시: 빈 문자열 → 같은 origin으로 요청, MSW가 가로챔
 * - 실제 API 사용 시: .env의 NEXT_PUBLIC_API_BASE_URL
 */
const getBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? ''

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
  const params = new URLSearchParams()
  if (options.page != null) params.set('page', String(options.page))
  if (options.size != null) params.set('size', String(options.size))
  const qs = params.toString()
  const url = `${getBaseUrl()}/api/v1/scents/singles${qs ? `?${qs}` : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Singles API error: ${res.status}`)
  return res.json()
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
  const params = new URLSearchParams()
  if (options.page != null) params.set('page', String(options.page))
  if (options.size != null) params.set('size', String(options.size))
  const qs = params.toString()
  const url = `${getBaseUrl()}/api/v1/scents/combinations${qs ? `?${qs}` : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Combinations API error: ${res.status}`)
  return res.json()
}
