import { authFetch } from '@/lib/api'

export interface CreateTestPayload {
  name: string
  description?: string
  profiling_type: string
  questions: {
    question_key: string
    question_text: string
    selection_type: string
    is_required: boolean
    sort_order: number
    options: {
      answer_option_key: string
      answer_option_text: string
      sort_order: number
    }[]
  }[]
}

/**
 * 어드민 테스트 생성 API
 */
export const createAdminTest = (
  payload: CreateTestPayload
): Promise<{
  success: boolean
  data: {
    id: number
    name: string
    profiling_type: string
    publish_status: string
    created_at: string
  }
}> => {
  return authFetch.post('/api/v1/admin/profilings/forms', payload)
}
