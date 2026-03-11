import { http, HttpResponse } from 'msw'
import {
  mockAdminBlendMaps,
  mockAdminProductPools,
  mockAdminProductMaps,
} from '@/mocks/data/adminRecommend'

export const adminBlendMapsHandlers = http.get(
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

export const adminProductPoolsHandlers = http.get(
  '/api/v1/admin/matches/product-pools',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const adoptionStatus = url.searchParams.get('adoption_status')

    // 상태 필터링 적용
    let filteredData = mockAdminProductPools
    if (adoptionStatus) {
      filteredData = mockAdminProductPools.filter(
        (item) => item.adoption_status === adoptionStatus
      )
    }

    const start = (page - 1) * size
    const content = filteredData.slice(start, start + size)
    const total_elements = filteredData.length
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

export const adminProductMapsHandlers = http.get(
  '/api/v1/admin/matches/product-maps',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)

    const start = (page - 1) * size
    const content = mockAdminProductMaps.slice(start, start + size)
    const total_elements = mockAdminProductMaps.length
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
