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
import { mockProfilingResultDetail } from './data/profilingResults'

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
 * - 200: success, 400: 잘못된 파라미터, 404: 활성화된 테스트 없음(목에서는 미사용)
 */
export const profilingFormActiveHandler = http.get(
  '/api/v1/profilings/forms/active',
  ({ request }) => {
    const url = new URL(request.url)
    const profilingType = url.searchParams.get('profiling_type')

    if (!profilingType) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: 'profiling_type은 필수입니다.',
            details: { field: 'profiling_type', reason: 'required' },
          },
        },
        { status: 400 }
      )
    }

    if (profilingType !== 'PREFERENCE' && profilingType !== 'HEALTH') {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: 'profiling_type은 PREFERENCE 또는 HEALTH여야 합니다.',
            details: { field: 'profiling_type', reason: 'invalid_value' },
          },
        },
        { status: 400 }
      )
    }

    const form =
      profilingType === 'HEALTH'
        ? mockProfilingFormHEALTH
        : mockProfilingFormPREFERENCE
    return HttpResponse.json({ success: true, data: form })
  }
)

/**
 * 테스트 제출 POST /api/v1/profilings/submit
 */
export const profilingSubmitHandler = http.post(
  '/api/v1/profilings/submit',
  async ({ request }) => {
    const body = (await request.json()) as {
      profiling_type?: string
      product_type?: string
      responses?: unknown[]
    }
    if (!body?.profiling_type || !body?.responses) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: '필수 항목이 누락되었습니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }
    return HttpResponse.json(
      {
        success: true,
        data: {
          result_id: mockProfilingResultDetail.id,
          message: '테스트가 제출되었습니다.',
        },
      },
      { status: 201 }
    )
  }
)

/**
 * 결과 상세 조회 GET /api/v1/profilings/results/:resultId
 */
export const profilingResultDetailHandler = http.get(
  '/api/v1/profilings/results/:resultId',
  ({ params }) => {
    const resultId = params.resultId
    if (!resultId) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: '리소스를 찾을 수 없습니다.',
            details: null,
          },
        },
        { status: 404 }
      )
    }
    return HttpResponse.json({
      success: true,
      data: {
        ...mockProfilingResultDetail,
        id: Number(resultId) || mockProfilingResultDetail.id,
      },
    })
  }
)

export const handlers = [
  elementsHandler,
  blendsHandler,
  elementDetailHandler,
  blendDetailHandler,
  profilingFormActiveHandler,
  profilingSubmitHandler,
  profilingResultDetailHandler,
  adminTestsHandler,
  adminBlendMapsHandlers,
  adminProductPoolsHandlers,
  adminProductMapsHandlers,
]
