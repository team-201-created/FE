import { http, HttpResponse } from 'msw'
import { mockCategoryElement, mockCategoryBlend } from '../data/categories'

export const adminCategoryHandlers = [
  // 카테고리 목록 조회
  http.get('*/api/v1/scents/categories', ({ request }) => {
    const url = new URL(request.url)
    const rootCategory = url.searchParams.get('root_category')

    if (rootCategory === 'Blend') {
      return HttpResponse.json({
        success: true,
        data: {
          categories: [mockCategoryBlend],
        },
      })
    }

    return HttpResponse.json({
      success: true,
      data: {
        categories: [mockCategoryElement],
      },
    })
  }),

  // 카테고리 등록
  http.post('*/api/v1/scents/categories', async ({ request }) => {
    const payload = (await request.json()) as any
    return HttpResponse.json({
      success: true,
      data: {
        category_id: Math.floor(Math.random() * 1000) + 100,
        name: payload.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    })
  }),
]
