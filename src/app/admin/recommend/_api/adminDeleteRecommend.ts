import { authFetch } from '@/lib/api'
import { RecommendTabId } from '../_types'

/**
 * 어드민 추천 데이터 삭제 API
 */
export const deleteAdminRecommend = (
  tabId: RecommendTabId,
  id: number
): Promise<{ success: boolean }> => {
  return authFetch.delete(`/api/v1/admin/matches/${tabId}/${id}`)
}
