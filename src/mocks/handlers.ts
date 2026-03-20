import { http, HttpResponse } from 'msw'
import { mockElementsResults } from './data/singles'
import { mockBlendsResults } from './data/combo'
import { mockElementDetails } from './data/singlesDetails'
import { mockBlendDetails } from './data/comboDetails'
import { adminTestHandlers } from './handlers/adminTestHandlers'
import {
  adminBlendMapsHandlers,
  adminProductPoolsHandlers,
  adminProductMapsHandlers,
} from './handlers/adminRecommendHandlers'
import {
  mockProfilingFormPREFERENCE,
  mockProfilingFormHEALTH,
} from './data/profilingForms'
import { MOCK_PIPELINE_SNAPSHOT_ID } from './data/profilingConstants'
import { mockProfilingResultDetail } from './data/profilingResults'
import { adminCategoryHandlers } from './handlers/adminCategoryHandlers'
import {
  IMAGE_FORMATS,
  IMAGE_TYPES,
  PRODUCT_TYPES,
  PROFILING_TYPES,
  type ImageFormat,
  type ImageType,
  type ProductType,
  type ProfilingType,
} from './constants'
import type { ProfilingForm } from '@/app/find-my-scent/_types'
import { storageHandlers } from './handlers/storageHandlers'

/** profiling_type → 목데이터 폼 매핑 (PROFILING_TYPES 추가 시 맵에도 필수 추가) */
const PROFILING_FORM_MAP: Record<ProfilingType, ProfilingForm> = {
  PREFERENCE: mockProfilingFormPREFERENCE,
  HEALTH: mockProfilingFormHEALTH,
}

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
 * - Query: profiling_type (PREFERENCE | HEALTH), product_type (PERFUME | DIFFUSER)
 * - Header: Authorization Bearer (MSW 직접 호출 시 profilingClient 가 mock-dev-token 부착)
 * - 실패 스키마: { success: false, error: { code, message, details } }, details 는 null 또는 { field, reason }
 */
export const profilingFormActiveHandler = http.get(
  '/api/v1/profilings/forms/active',
  ({ request }) => {
    const auth = request.headers.get('Authorization')
    if (!auth || !/^Bearer\s+\S+/.test(auth)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authorization Bearer 토큰이 필요합니다.',
            details: null,
          },
        },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const profilingType = url.searchParams.get('profiling_type')
    const productType = url.searchParams.get('product_type')

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

    if (!PROFILING_TYPES.includes(profilingType as ProfilingType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: `profiling_type은 ${PROFILING_TYPES.join(' 또는 ')}여야 합니다.`,
            details: { field: 'profiling_type', reason: 'invalid_value' },
          },
        },
        { status: 400 }
      )
    }

    if (!productType) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: 'product_type은 필수입니다.',
            details: { field: 'product_type', reason: 'required' },
          },
        },
        { status: 400 }
      )
    }

    if (!PRODUCT_TYPES.includes(productType as ProductType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_PARAMETER',
            message: `product_type은 ${PRODUCT_TYPES.join(' 또는 ')}이어야 합니다.`,
            details: { field: 'product_type', reason: 'invalid_value' },
          },
        },
        { status: 400 }
      )
    }

    const form = PROFILING_FORM_MAP[profilingType as ProfilingType]
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
      pipeline_snapshot_id?: number
      profiling_type?: string
      product_type?: string
      responses?: unknown[]
    }
    if (
      body?.pipeline_snapshot_id == null ||
      typeof body.pipeline_snapshot_id !== 'number' ||
      !body?.profiling_type ||
      !body?.product_type ||
      !Array.isArray(body?.responses)
    ) {
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
    if (!PRODUCT_TYPES.includes(body.product_type as ProductType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: `product_type은 ${PRODUCT_TYPES.join(' 또는 ')}이어야 합니다.`,
            details: { field: 'product_type', reason: 'invalid' },
          },
        },
        { status: 400 }
      )
    }
    if (!PROFILING_TYPES.includes(body.profiling_type as ProfilingType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: `profiling_type은 ${PROFILING_TYPES.join(' 또는 ')}여야 합니다.`,
            details: { field: 'profiling_type', reason: 'invalid' },
          },
        },
        { status: 400 }
      )
    }
    const expectedSnapshot =
      body.profiling_type === 'HEALTH'
        ? MOCK_PIPELINE_SNAPSHOT_ID.HEALTH
        : MOCK_PIPELINE_SNAPSHOT_ID.PREFERENCE
    if (body.pipeline_snapshot_id !== expectedSnapshot) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message:
              'pipeline_snapshot_id가 활성 폼과 일치하지 않습니다. 최신 폼을 다시 불러오세요.',
            details: { field: 'pipeline_snapshot_id', reason: 'invalid' },
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
 * - 200: 성공 스키마
 * - 401: Authorization Bearer 없음/무효 (profilingFetchJson 이 MSW 모드에서 mock 토큰 부착)
 * - 404: result_id 가 양의 정수가 아니거나 리소스 없음
 */
export const profilingResultDetailHandler = http.get(
  '/api/v1/profilings/results/:resultId',
  ({ request, params }) => {
    const auth = request.headers.get('Authorization')
    if (!auth || !/^Bearer\s+\S+/.test(auth)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authorization Bearer 토큰이 필요합니다.',
            details: null,
          },
        },
        { status: 401 }
      )
    }

    const rawId = params.resultId
    const id = Number(rawId)
    if (!rawId || !Number.isInteger(id) || id < 1) {
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
        id,
      },
    })
  }
)

// --- AI 비주얼 분석 (이미지 업로드 → 분석 제출 → 결과 조회) ---

const MOCK_AI_IMAGE_URL = 'https://cdn.example.com/images/ai-visual-mock.jpg'
const MOCK_AI_IMAGE_KEY = 'images/ai-visual-mock.jpg'

/**
 * 1. 이미지 업로드용 presigned URL 발급
 * PUT /api/v1/profilings/images/presigned-url
 * Body: { file_name, image_format (jpeg|jpg|png|webp), file_size }
 */
export const presignedUrlHandler = http.put(
  '/api/v1/profilings/images/presigned-url',
  async ({ request }) => {
    const auth = request.headers.get('Authorization')
    if (!auth?.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '인증이 필요합니다.',
            details: null,
          },
        },
        { status: 401 }
      )
    }

    let body: { file_name?: string; image_format?: string; file_size?: number }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: '요청 본문이 올바르지 않습니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }

    const { file_name, image_format, file_size } = body ?? {}
    if (!file_name || !image_format || file_size == null) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'file_name, image_format, file_size는 필수입니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }
    const formatLower = image_format.toLowerCase()
    if (!IMAGE_FORMATS.includes(formatLower as ImageFormat)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: '허용되지 않는 파일 형식입니다.',
            details: { field: 'image_format', reason: 'invalid' },
          },
        },
        { status: 400 }
      )
    }

    // 클라이언트가 같은 출처로 PUT 할 수 있도록 mock 업로드 경로 반환 (상대 URL)
    const presigned_url = '/api/v1/profilings/images/mock-upload'

    return HttpResponse.json(
      {
        success: true,
        data: {
          presigned_url,
          image_url: MOCK_AI_IMAGE_URL,
          key: MOCK_AI_IMAGE_KEY,
          expires_in: 300,
        },
      },
      { status: 201 }
    )
  }
)

/**
 * 1-2. Mock 업로드 수신 (presigned_url로 PUT 시)
 * PUT /api/v1/profilings/images/mock-upload
 */
export const mockUploadHandler = http.put(
  '/api/v1/profilings/images/mock-upload',
  () => {
    return new HttpResponse(null, { status: 200 })
  }
)

/**
 * 2. AI 분석 테스트 제출
 * POST /api/v1/profilings/images/analyze
 * Body: { image_url, image_type (OOTD|INTERIOR), product_type (DIFFUSER|PERFUME) }
 */
export const imagesAnalyzeHandler = http.post(
  '/api/v1/profilings/images/analyze',
  async ({ request }) => {
    const auth = request.headers.get('Authorization')
    if (!auth?.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '인증이 필요합니다.',
            details: null,
          },
        },
        { status: 401 }
      )
    }

    let body: {
      image_url?: string
      image_type?: string
      product_type?: string
    }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: '요청 본문이 올바르지 않습니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }

    const { image_url, image_type, product_type } = body ?? {}
    if (!image_url || !image_type || !product_type) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'image_url, image_type, product_type은 필수입니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }
    if (!IMAGE_TYPES.includes(image_type as ImageType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: `image_type은 ${IMAGE_TYPES.join(' 또는 ')}여야 합니다.`,
            details: { field: 'image_type', reason: 'invalid' },
          },
        },
        { status: 400 }
      )
    }
    if (!PRODUCT_TYPES.includes(product_type as ProductType)) {
      return HttpResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: `product_type은 ${PRODUCT_TYPES.join(' 또는 ')}이어야 합니다.`,
            details: { field: 'product_type', reason: 'invalid' },
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
          message: '사진 분석이 완료되었습니다.',
        },
      },
      { status: 201 }
    )
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
  presignedUrlHandler,
  mockUploadHandler,
  imagesAnalyzeHandler,
  ...adminTestHandlers,
  ...adminBlendMapsHandlers,
  ...adminProductPoolsHandlers,
  ...adminProductMapsHandlers,
  ...adminCategoryHandlers,
  ...storageHandlers,
]
