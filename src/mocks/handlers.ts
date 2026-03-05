import { http, HttpResponse } from 'msw'
import { mockSinglesItems, mockSinglesPageMeta } from './data/singles'
import { mockCombinationsItems, mockCombinationsPageMeta } from './data/combo'
import { mockElementDetails } from './data/singlesDetails'
import { mockBlendDetails } from './data/comboDetails'
import { adminTestsHandler } from './handlers/adminTestHandlers'
import {
  adminScentMapHandlers,
  adminProductMapHandlers,
} from './handlers/adminRecommendHandlers'

/**
 * 단품 목록 조회 GET /api/v1/scents/singles
 * Query: page?, size?
 */
export const singlesHandler = http.get(
  '/api/v1/scents/singles',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 20)
    const start = (page - 1) * size
    const items = mockSinglesItems.slice(start, start + size)
    const total_count = mockSinglesItems.length
    const total_pages = Math.ceil(total_count / size) || 1

    return HttpResponse.json({
      success: true,
      data: {
        items: items.map((item) => ({ ...item })),
        page,
        size,
        total_count,
        total_pages,
        has_next: page < total_pages,
        has_prev: page > 1,
      },
    })
  }
)

/**
 * 조합 목록 조회 GET /api/v1/scents/combinations
 * Query: page?, size?
 */
export const combinationsHandler = http.get(
  '/api/v1/scents/combinations',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 20)
    const start = (page - 1) * size
    const items = mockCombinationsItems.slice(start, start + size)
    const total_count = mockCombinationsItems.length
    const total_pages = Math.ceil(total_count / size) || 1

    return HttpResponse.json({
      success: true,
      data: {
        items: items.map((item) => ({ ...item })),
        page,
        size,
        total_count,
        total_pages,
        has_next: page < total_pages,
        has_prev: page > 1,
      },
    })
  }
)

/**
 * 단품 상세 조회 GET /api/v1/scents/elements/:elementId
 */
export const elementDetailHandler = http.get(
  '/api/v1/scents/elements/:elementId',
  ({ params }) => {
    const id = Number(params.elementId)
    const found = mockElementDetails.find((item) => item.id === id)
    if (!found)
      return HttpResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    return HttpResponse.json({ success: true, data: found })
  }
)

/**
 * 조합 상세 조회 GET /api/v1/scents/blends/:blendId
 */
export const blendDetailHandler = http.get(
  '/api/v1/scents/blends/:blendId',
  ({ params }) => {
    const id = Number(params.blendId)
    const found = mockBlendDetails.find((item) => item.id === id)
    if (!found)
      return HttpResponse.json(
        { success: false, message: 'Not found' },
        { status: 404 }
      )
    return HttpResponse.json({ success: true, data: found })
  }
)

export const handlers = [
  singlesHandler,
  combinationsHandler,
  elementDetailHandler,
  blendDetailHandler,
  adminTestsHandler,
  adminScentMapHandlers,
  adminProductMapHandlers,
]
