import { http, HttpResponse } from 'msw'
import { mockAdminTests } from '@/mocks/data/adminTests'

export const adminTestsHandler = http.get(
  '*/api/v1/admin/profilings/forms',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 20)
    const start = (page - 1) * size
    const content = mockAdminTests.slice(start, start + size)
    const total_elements = mockAdminTests.length
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
