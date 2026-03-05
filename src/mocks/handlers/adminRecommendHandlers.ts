import { http, HttpResponse } from 'msw'
import { mockAdminBlendMaps } from '../data/adminRecommend'

export const adminRecommendHandlers = http.get(
  '/api/v1/admin/matches/blend-maps',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)

    const start = (page - 1) * size
    const content = mockAdminBlendMaps.slice(start, start + size)
    const total_elements = mockAdminBlendMaps.length
    const total_pages = Math.ceil(total_elements / size) || 1

    return HttpResponse.json({
      success: true,
      data: {
        content: content.map((item) => ({ ...item })),
        page,
        size,
        total_elements,
        total_pages,
      },
    })
  }
)
