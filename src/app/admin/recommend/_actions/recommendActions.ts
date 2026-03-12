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
