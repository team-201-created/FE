/**
 * 향기 성향 테스트 API
 * - 목데이터(MSW): NEXT_PUBLIC_USE_MOCK_API=true 시 같은 origin 요청 → MSW가 가로챔
 * - 실제 API: NEXT_PUBLIC_API_BASE_URL 사용
 */
const getBaseUrl = () => process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? ''

export type ProfilingOption = {
  id: number
  answer_option_key: string
  answer_option_text: string
}

export type ProfilingQuestion = {
  id: number
  question_key: string
  question_text: string
  selection_type: 'SINGLE' | 'MULTI'
  is_required: boolean
  options: ProfilingOption[]
}

export type ProfilingFormResponse = {
  success: boolean
  data: {
    form_id: number
    name: string
    profiling_type: 'PREFERENCE' | 'HEALTH'
    questions: ProfilingQuestion[]
  }
}

/** QuizView에서 쓰는 질문 형태 */
export type QuizQuestion = {
  id: string
  text: string
  required: boolean
  questionType: 'SINGLE' | 'MULTI'
  options: { id: string; text: string }[]
}

function toQuizQuestion(q: ProfilingQuestion): QuizQuestion {
  return {
    id: String(q.id),
    text: q.question_text,
    required: q.is_required,
    questionType: q.selection_type,
    options: q.options.map((opt) => ({
      id: String(opt.id),
      text: opt.answer_option_text,
    })),
  }
}

export function toQuizQuestions(
  data: ProfilingFormResponse['data']
): QuizQuestion[] {
  return data.questions.map(toQuizQuestion)
}

export type ProfilingType = 'PREFERENCE' | 'HEALTH'

/**
 * 향기 성향 테스트 항목 조회
 * GET /api/v1/profilings/forms/active?profiling_type={PREFERENCE|HEALTH}
 */
export async function fetchProfilingFormActive(
  profilingType: ProfilingType
): Promise<ProfilingFormResponse> {
  const base = getBaseUrl()
  const url = `${base}/api/v1/profilings/forms/active?profiling_type=${profilingType}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Profiling form fetch failed: ${res.status}`)
  return res.json()
}
