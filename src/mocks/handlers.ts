import { http, HttpResponse } from 'msw'
import { mockElementsResults } from './data/singles'
import { mockBlendsResults } from './data/combo'
import { mockElementDetails } from './data/singlesDetails'
import { mockBlendDetails } from './data/comboDetails'
import { adminTestsHandler } from './handlers/adminTestHandlers'
import {
  adminBlendMapsHandlers,
  adminProductPoolsHandlers,
  adminProductMapsHandlers,
} from './handlers/adminRecommendHandlers'
import {
  mockProfilingFormPREFERENCE,
  mockProfilingFormHEALTH,
} from './data/profilingForms'

/**
 * 단품 목록 조회 GET /api/v1/scents/elements
 * Query: q?, scent_category_id?, sort?, page?, size?
 */
export const elementsHandler = http.get(
  '/api/v1/scents/elements',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const start = (page - 1) * size
    const results = [...mockElementsResults].slice(start, start + size)
    const count = mockElementsResults.length
    const total_pages = Math.ceil(count / size) || 1

    return HttpResponse.json({
      success: true,
      data: {
        results: results.map((item) => ({ ...item })),
        page,
        size,
        count,
        total_pages,
      },
    })
  }
)

/**
 * 조합 목록 조회 GET /api/v1/scents/blends
 * Query: q?, blend_category_id?, scent_category_id?, sort?, page?, size?
 */
export const blendsHandler = http.get(
  '/api/v1/scents/blends',
  ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const size = Number(url.searchParams.get('size') ?? 10)
    const start = (page - 1) * size
    const results = [...mockBlendsResults].slice(start, start + size)
    const count = mockBlendsResults.length
    const total_pages = Math.ceil(count / size) || 1

    return HttpResponse.json({
      success: true,
      data: {
        results: results.map((item) => ({ ...item })),
        page,
        size,
        count,
        total_pages,
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
        {
          success: false,
          error: {
            code: 'INVALID_PATH_PARAMETER',
            message: '경로 파라미터가 올바르지 않습니다.',
            details: { field: 'element_id', reason: 'not_found' },
          },
        },
        { status: 404 }
      )
    return HttpResponse.json({ success: true, data: { ...found } })
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
        {
          success: false,
          error: {
            code: 'SCENT_COMBINATION_NOT_FOUND',
            message: '조합 향 정보를 찾을 수 없습니다.',
            details: { combination_id: id },
          },
        },
        { status: 404 }
      )
    return HttpResponse.json({ success: true, data: { ...found } })
  }
)

/**
 * 향기 성향 테스트 항목 조회 GET /api/v1/profilings/forms/active
 * Query: profiling_type (required) PREFERENCE | HEALTH
 */
export const profilingFormActiveHandler = http.get(
  '/api/v1/profilings/forms/active',
  ({ request }) => {
    const url = new URL(request.url)
    const profilingType = url.searchParams.get('profiling_type')
    const form =
      profilingType === 'HEALTH'
        ? mockProfilingFormHEALTH
        : mockProfilingFormPREFERENCE
    return HttpResponse.json({ success: true, data: form })
  }
)

export const handlers = [
  elementsHandler,
  blendsHandler,
  elementDetailHandler,
  blendDetailHandler,
  profilingFormActiveHandler,
  adminTestsHandler,
  adminBlendMapsHandlers,
  adminProductPoolsHandlers,
  adminProductMapsHandlers,
]
