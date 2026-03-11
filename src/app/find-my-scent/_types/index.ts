/**
 * find-my-scent 도메인 공통 타입
 * - API 응답/요청 타입, 퀴즈 UI용 타입 정의
 */

/** 취향/건강 테스트 구분 */
export type ProfilingType = 'PREFERENCE' | 'HEALTH'

/** API 응답 - 옵션 */
export type ProfilingOption = {
  id: number
  answer_option_key: string
  answer_option_text: string
}

/** API 응답 - 질문 */
export type ProfilingQuestion = {
  id: number
  question_key: string
  question_text: string
  selection_type: 'SINGLE' | 'MULTI'
  is_required: boolean
  options: ProfilingOption[]
}

/** API 응답 - 질문 폼 구조 (활성 폼 조회 응답의 data) */
export type ProfilingForm = {
  form_id: number
  name: string
  profiling_type: ProfilingType
  questions: ProfilingQuestion[]
}

/** API 응답 - 활성 폼 조회 */
export type ProfilingFormResponse = {
  success: boolean
  data: ProfilingForm
}

/** QuizView에서 쓰는 질문 형태 (제출 시 question_key, answer_option_keys 매핑용) */
export type QuizQuestion = {
  id: string
  /** API 제출용 (POST submit) */
  questionKey?: string
  text: string
  required: boolean
  questionType: 'SINGLE' | 'MULTI'
  options: {
    id: string
    text: string
    /** API 제출용 */ answerOptionKey?: string
  }[]
}

/** POST /api/v1/profilings/submit 요청 */
export type ProfilingSubmitRequest = {
  profiling_type: ProfilingType
  product_type: 'DIFFUSER' | 'PERFUME'
  responses: { question_key: string; answer_option_keys: string[] }[]
}

/** POST /api/v1/profilings/submit 응답 */
export type ProfilingSubmitResponse = {
  success: boolean
  data?: { result_id: number; message: string }
  error?: { code: string; message: string; details?: Record<string, unknown> }
}

/** GET /api/v1/profilings/results/{result_id} 응답 - recommended_blend 등 */
export type ProfilingResultBlend = {
  name: string
  image_url: string
  description: string
  contained_elements: {
    name: string
    category: { kr: string; en: string }
  }[]
}

export type ProfilingResultDetail = {
  id: number
  input_data_type: string
  product_type: string
  input_data_summary: string
  recommended_blend: ProfilingResultBlend
  recommended_products: { purchase_url: string }[]
  created_at: string
}

export type ProfilingResultDetailResponse = {
  success: boolean
  data?: ProfilingResultDetail
  error?: { code: string; message: string; details?: Record<string, unknown> }
}

/** ProfilingType과 동일 (UI용 alias) */
export type TestType = ProfilingType

/** 결과 페이지 구분 (취향 / 건강 / AI) */
export type ResultPageType = 'PREFERENCE' | 'HEALTH' | 'AI'

/** 질문 유형 - 고정 */
export type QuestionType = 'SINGLE' | 'MULTI'

/** 퀴즈 답변 상태 (question id → 선택된 option id[]) */
export type AnswersState = Record<string, string[]>
