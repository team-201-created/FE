import { http, HttpResponse } from 'msw'
import { mockAdminTests } from '@/mocks/data/adminTests'

export const adminTestHandlers = [
  // 테스트 목록 조회 (검색/필터/페이지네이션 통합)
  http.get('*/api/v1/admin/profilings/forms', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const q = url.searchParams.get('q')?.toLowerCase()
    const publishStatus = url.searchParams.get('publish_status')
    const profilingType = url.searchParams.get('profiling_type')

    // 전체 데이터에서 필터링 먼저 수행
    let filtered = [...mockAdminTests]
    if (q) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(q))
    }
    if (publishStatus) {
      filtered = filtered.filter(
        (item) => item.publish_status === publishStatus
      )
    }
    if (profilingType) {
      filtered = filtered.filter(
        (item) => item.profiling_type === profilingType
      )
    }

    const total_elements = filtered.length
    const total_pages = Math.ceil(total_elements / size) || 1
    const start = (page - 1) * size
    const content = filtered.slice(start, start + size)

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
  }),

  // 테스트 상태 토글 (PATCH)
  // http.patch('*/api/v1/admin/profilings/forms/:form_id', async ({ params, request }) => {
  //   const { form_id } = params
  //   const body = (await request.json()) as { status: string }
  //   const index = mockAdminTests.findIndex((item) => item.id === Number(form_id))
  //   if (index !== -1) {
  //     mockAdminTests[index].publish_status = body.status as any
  //     mockAdminTests[index].updated_at = new Date().toISOString()
  //     return HttpResponse.json({ success: true, data: mockAdminTests[index] })
  //   }
  //   return HttpResponse.json({ success: false }, { status: 404 })
  // }),
]
