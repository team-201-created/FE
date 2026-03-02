import { http, HttpResponse } from 'msw'
import { mockSinglesItems, mockSinglesPageMeta } from './data/singles'
import {
  mockCombinationsItems,
  mockCombinationsPageMeta,
} from './data/combinations'

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

export const handlers = [singlesHandler, combinationsHandler]
