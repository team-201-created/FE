import { authFetch } from '@/lib/api'

/**
 * 어드민 테스트 삭제 API
 */
export const deleteAdminTest = (
  form_id: number
): Promise<{ success: boolean }> => {
  return authFetch.delete(`/api/v1/admin/profilings/forms/${form_id}`)
}
