/**
 * 향기 성향 테스트 API
 * - GET forms/active, POST submit, GET results/:id
 * - 목데이터(MSW): NEXT_PUBLIC_USE_MOCK_API=true 시 같은 origin 요청 → MSW가 가로챔
 */
import { apiFetch } from '@/lib/api'
import type {
  AnswersState,
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

/**
 * 향기 성향 테스트 항목 조회
 * GET /api/v1/profilings/forms/active?profiling_type={PREFERENCE|HEALTH}
 */
export async function fetchProfilingFormActive(
  profilingType: ProfilingType
): Promise<ProfilingFormResponse> {
  return apiFetch.get<ProfilingFormResponse>(
    '/api/v1/profilings/forms/active',
    {
      params: { profiling_type: profilingType },
    }
  )
}

/**
 * 퀴즈 답변(questions + answers)을 API 제출용 payload로 변환
 */
export function buildSubmitPayload(
  questions: QuizQuestion[],
  answers: AnswersState,
  profilingType: ProfilingType,
  productType: 'DIFFUSER' | 'PERFUME' = 'DIFFUSER'
): ProfilingSubmitRequest {
  const responses = questions.map((q) => {
    const selectedIds = answers[q.id] ?? []
    const answer_option_keys = selectedIds
      .map((optId) => q.options.find((o) => o.id === optId)?.answerOptionKey)
      .filter((k): k is string => Boolean(k))
    return { question_key: q.questionKey ?? q.id, answer_option_keys }
  })
  return { profiling_type: profilingType, product_type: productType, responses }
}

/**
 * 테스트 제출
 * POST /api/v1/profilings/submit
 */
export async function submitProfiling(
  body: ProfilingSubmitRequest
): Promise<ProfilingSubmitResponse> {
  return apiFetch.post<ProfilingSubmitResponse>(
    '/api/v1/profilings/submit',
    body
  )
}

/**
 * 결과 상세 조회
 * GET /api/v1/profilings/results/{result_id}
 */
export async function fetchProfilingResult(
  resultId: number
): Promise<ProfilingResultDetailResponse> {
  return apiFetch.get<ProfilingResultDetailResponse>(
    `/api/v1/profilings/results/${resultId}`
  )
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
  const { recommended_blend, recommended_products } = detail
  const scentTypeTags =
    recommended_blend.contained_elements?.map(
      (e) => e.category?.en ?? e.category?.kr ?? ''
    ) ?? []
  const scentTypeLabel =
    recommended_blend.contained_elements?.[0]?.category?.en ??
    recommended_blend.contained_elements?.[0]?.category?.kr
  const primaryButtonHref = recommended_products[0].purchase_url
  const noteTags =
    recommended_blend.contained_elements?.map(
      (e) => `#${e.category?.en ?? e.name}`
    ) ?? []
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
