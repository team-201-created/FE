'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminRecommend } from '../_api/adminDeleteRecommend'
import { RecommendTabId } from '../_types'

/**
 * 추천 관련 데이터 삭제 Server Action
 */
export async function deleteRecommendAction(tabId: RecommendTabId, id: number) {
  try {
    await deleteAdminRecommend(tabId, id)

    // 추천 관리 페이지 데이터 갱신
    revalidatePath('/admin/recommend')

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * 추천 상태 토글 Server Action (발행/채택 공용)
 */
export async function toggleRecommendStatusAction(
  tabId: RecommendTabId,
  id: number,
  status: string
) {
  try {
    // TODO: 실제 API 연동 시 tabId에 따라 endpoint 분기
    // 1. await authFetch.patch(`/api/v1/admin/matches/${tabId}/${id}`, { [statusKey]: status })

    // 현재는 revalidatePath만 수행하여 서버 컴포넌트를 갱신하도록 함
    revalidatePath('/admin/recommend')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
