import { BlendMapListResponse } from '@/app/admin/recommend/_types'

export type FetchOptions = {
  page?: number
  size?: number
}

const DEFAULT_EMPTY_BLEND_MAPS_DATA: BlendMapListResponse = {
  success: true,
  data: {
    content: [],
    page: 1,
    size: 10,
    total_elements: 0,
    total_pages: 0,
  },
}

export async function fetchAdminBlendMaps(
  options: FetchOptions = {}
): Promise<BlendMapListResponse> {
  try {
    const params = new URLSearchParams()
    if (options.page != null) params.set('page', String(options.page))
    if (options.size != null) params.set('size', String(options.size))
    const qs = params.toString()
    const url = `/api/v1/admin/matches/blend-maps${qs ? `?${qs}` : ''}`

    const res = await fetch(url)
    if (!res.ok) throw new Error(`API 호출 실패 ${res.status}`)
    return res.json()
  } catch (err) {
    console.error('API 호출 실패', err)
    return DEFAULT_EMPTY_BLEND_MAPS_DATA
  }
}
