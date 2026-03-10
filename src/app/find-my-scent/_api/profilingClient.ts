/**
 * 향기 성향 테스트 API
 * - 목데이터(MSW): NEXT_PUBLIC_USE_MOCK_API=true 시 같은 origin 요청 → MSW가 가로챔
 * - 실제 API: NEXT_PUBLIC_API_BASE_URL 사용
 */
import { apiFetch } from '@/lib/api'
import type {
  ProfilingFormResponse,
  ProfilingQuestion,
  ProfilingType,
  QuizQuestion,
} from '../_types'

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
