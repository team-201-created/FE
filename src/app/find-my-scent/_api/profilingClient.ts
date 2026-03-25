/**
 * 향기 성향 테스트 API
 *
 * 활성 폼 조회 GET `/api/v1/profilings/forms/active`
 * - Query: `profiling_type` (PREFERENCE | HEALTH), `product_type` (PERFUME | DIFFUSER)
 * - Header: `Authorization: Bearer <token>` — 실서버는 Next Route 프록시가 쿠키의 access_token 으로 부착,
 *   MSW 모드(`NEXT_PUBLIC_USE_MOCK_API`)에서는 브라우저가 `Bearer mock-dev-token` 전달
 * - 브라우저: 같은 오리진 + `credentials: 'include'` / RSC: 내부 URL + `Cookie` 헤더
 */
import { handleResponse } from '@/lib/api/client'
import { mapBlendCategoryKrLabels } from '@/lib/mapBlendCategoryKrLabels'
import { scentCategoryKrToId } from '@/app/products/_api/productsClient'
import type {
  AnswersState,
  ProductTypeChoice,
  ProfilingFormResponse,
  ProfilingQuestion,
  ProfilingResultDetail,
  ProfilingResultDetailResponse,
  ProfilingSubmitRequest,
  ProfilingSubmitResponse,
  ProfilingType,
  QuizQuestion,
} from '../_types'

function toQuizQuestion(q: ProfilingQuestion): QuizQuestion {
  return {
    id: String(q.id),
    questionKey: q.question_key,
    text: q.question_text,
    required: q.is_required,
    questionType: q.selection_type,
    options: q.options.map((opt) => ({
      id: String(opt.id),
      text: opt.answer_option_text,
      answerOptionKey: opt.answer_option_key,
    })),
  }
}

export function toQuizQuestions(
  data: ProfilingFormResponse['data']
): QuizQuestion[] {
  return data.questions.map(toQuizQuestion)
}

async function profilingFetchJson<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const isBrowser = typeof window !== 'undefined'

  const hasBody =
    init.body != null && init.method !== 'GET' && init.method !== undefined

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
  }
  if (
    init.headers &&
    typeof init.headers === 'object' &&
    !Array.isArray(init.headers)
  ) {
    const h = init.headers as Record<string, string>
    for (const [k, v] of Object.entries(h)) {
      if (v != null) headers[k] = v
    }
  }

  let url: string
  const fetchInit: RequestInit = {
    ...init,
    headers,
    ...(isBrowser
      ? { credentials: 'include' as RequestCredentials }
      : { cache: 'no-store' }),
  }

  if (isBrowser && process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
    // MSW/브라우저 직접 호출 시 스펙상 Bearer 필요 — Route 프록시 경로는 쿠키 사용
    headers.Authorization = 'Bearer mock-dev-token'
  }

  if (isBrowser) {
    url = path.startsWith('/') ? path : `/${path}`
  } else {
    const { headers: nextHeaders } = await import('next/headers')
    const h = await nextHeaders()
    const host = h.get('host') ?? 'localhost:3000'
    const proto = h.get('x-forwarded-proto') ?? 'http'
    const rel = path.startsWith('/') ? path : `/${path}`
    url = `${proto}://${host}${rel}`
    const cookie = h.get('cookie')
    if (cookie) {
      headers.cookie = cookie
    }
  }

  const response = await fetch(url, fetchInit)
  const finalRes = await handleResponse(response)
  return finalRes.json() as Promise<T>
}

/**
 * 향기 성향 테스트 항목 조회
 * GET /api/v1/profilings/forms/active?profiling_type=&product_type=
 * 헤더: 실서버는 Route 프록시가 Bearer 부착 / MSW는 클라이언트에서 mock Bearer
 */
export async function fetchProfilingFormActive(
  profilingType: ProfilingType,
  productType: ProductTypeChoice
): Promise<ProfilingFormResponse> {
  const q = new URLSearchParams({
    profiling_type: profilingType,
    product_type: productType,
  })
  return profilingFetchJson<ProfilingFormResponse>(
    `/api/v1/profilings/forms/active?${q.toString()}`,
    { method: 'GET' }
  )
}

/**
 * 퀴즈 답변(questions + answers)을 API 제출용 payload로 변환
 * pipeline_snapshot_id는 활성 폼 조회 응답의 data.pipeline_snapshot_id와 동일해야 함
 */
export function buildSubmitPayload(
  questions: QuizQuestion[],
  answers: AnswersState,
  pipelineSnapshotId: number,
  profilingType: ProfilingType,
  productType: ProductTypeChoice
): ProfilingSubmitRequest {
  const responses = questions.map((q) => {
    const selectedIds = answers[q.id] ?? []
    const answer_option_keys = selectedIds
      .map((optId) => q.options.find((o) => o.id === optId)?.answerOptionKey)
      .filter((k): k is string => Boolean(k))
    return { question_key: q.questionKey ?? q.id, answer_option_keys }
  })
  return {
    pipeline_snapshot_id: pipelineSnapshotId,
    profiling_type: profilingType,
    product_type: productType,
    responses,
  }
}

/**
 * 테스트 제출
 * POST /api/v1/profilings/submit
 */
export async function submitProfiling(
  body: ProfilingSubmitRequest
): Promise<ProfilingSubmitResponse> {
  return profilingFetchJson<ProfilingSubmitResponse>(
    '/api/v1/profilings/submit',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  )
}

/**
 * 결과 상세 조회 GET `/api/v1/profilings/results/{result_id}`
 * - 200 / 401 / 404 — 실패 시 `error.details` 는 null 또는 `{ field, reason }`
 * - MSW·프록시 경로는 활성 폼 조회와 동일 (Bearer: 목은 mock-dev-token / 실서버는 쿠키 프록시)
 */
export async function fetchProfilingResult(
  resultId: number
): Promise<ProfilingResultDetailResponse> {
  return profilingFetchJson<ProfilingResultDetailResponse>(
    `/api/v1/profilings/results/${resultId}`,
    { method: 'GET' }
  )
}

/** 향기 노트용 카테고리 행 — categories / blend_categories 우선순위 */
function pickBlendCategoryRows(
  blend: ProfilingResultBlend | null | undefined
): { name: { kr: string; en: string } }[] {
  if (!blend) return []
  const rows = blend.categories ?? blend.blend_categories
  return Array.isArray(rows) ? rows : []
}

/**
 * 상세 응답에서 향기 노트 라벨용 categories 해석
 * - recommended_blend.categories / blend_categories
 * - 누락 시 목록과 동일 필드인 data.matched_blend 쪽 보조 (스키마 불일치 대응)
 */
function pickNoteCategoryRowsForDetail(
  detail: ProfilingResultDetail
): { name: { kr: string; en: string } }[] {
  const fromRecommended = pickBlendCategoryRows(detail.recommended_blend)
  if (fromRecommended.length > 0) return fromRecommended
  return pickBlendCategoryRows(detail.matched_blend ?? null)
}

/** 결과 상세 API 응답 → ResultContentBox props (primaryButtonHref = 추천 상품 링크) */
export function resultDetailToContentBoxProps(detail: ProfilingResultDetail): {
  productImageUrl: string
  productName: string
  description: string
  scentTypeLabel?: string
  showRecommendLabel: boolean
  scentTypeTags: string[]
  noteTags: string[]
  /** 추천한 향기와 어울리는 연관 추천 상품 보러가기 버튼 링크 */
  primaryButtonHref: string
} {
  const { recommended_blend, recommended_products, input_data_summary } = detail

  if (recommended_blend == null) {
    const summary = input_data_summary?.trim() ?? ''
    return {
      productImageUrl: '',
      productName: '추천 블렌드 준비 중',
      description:
        summary ||
        '아직 추천 블렌드 정보가 없습니다. 잠시 후 새로고침하거나 테스트를 다시 진행해 주세요.',
      scentTypeLabel: undefined,
      showRecommendLabel: false,
      scentTypeTags: [],
      noteTags: [],
      primaryButtonHref: recommended_products[0]?.purchase_url ?? '',
    }
  }

  const scentTypeTags =
    recommended_blend.contained_elements?.map((e) => {
      const kr = e.category?.kr?.trim()
      if (kr && scentCategoryKrToId[kr]) return scentCategoryKrToId[kr]
      const en = e.category?.en?.trim().toLowerCase()
      return en ?? ''
    }) ?? []
  const scentTypeLabel =
    recommended_blend.contained_elements?.[0]?.category?.kr ??
    recommended_blend.contained_elements?.[0]?.category?.en
  const primaryButtonHref = recommended_products[0]?.purchase_url ?? ''
  const noteRows = pickNoteCategoryRowsForDetail(detail)
  /** 저장소 목록 카드 blendCategory 와 동일 문자열·순서(중복 제거 규칙 동일) */
  const noteTags = mapBlendCategoryKrLabels(noteRows)
  return {
    productImageUrl: recommended_blend.image_url ?? '',
    productName: recommended_blend.name ?? '',
    description: recommended_blend.description ?? '',
    scentTypeLabel: scentTypeLabel ?? undefined,
    showRecommendLabel: true,
    scentTypeTags: scentTypeTags.filter(Boolean),
    noteTags,
    primaryButtonHref,
  }
}
