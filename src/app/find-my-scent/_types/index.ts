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

/** QuizView에서 쓰는 질문 형태 */
export type QuizQuestion = {
  id: string
  text: string
  required: boolean
  questionType: 'SINGLE' | 'MULTI'
  options: { id: string; text: string }[]
}

/** ProfilingType과 동일 (UI용 alias) */
export type TestType = ProfilingType

/** 결과 페이지 구분 (취향 / 건강 / AI) */
export type ResultPageType = 'PREFERENCE' | 'HEALTH' | 'AI'

/** 질문 유형 - 고정 */
export type QuestionType = 'SINGLE' | 'MULTI'
