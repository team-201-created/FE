import { authFetch } from '@/lib/api'

export interface UpdateTestPayload {
  name: string
  description?: string
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
 * 어드민 테스트 수정 API
 */
export const updateAdminTest = (
  form_id: number,
  payload: UpdateTestPayload
): Promise<{ success: boolean }> => {
  return authFetch.put(`/api/v1/admin/profilings/forms/${form_id}`, payload)
}
