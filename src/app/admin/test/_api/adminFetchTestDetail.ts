import { authFetch } from '@/lib/api'
import { TestDetailResponse } from '@/app/admin/test/_types'

/**
 * 어드민 테스트 상세 조회 API
 */
export const fetchAdminTestDetail = (
  form_id: number
): Promise<TestDetailResponse> => {
  return authFetch.get(`/api/v1/admin/profilings/forms/${form_id}`)
}
