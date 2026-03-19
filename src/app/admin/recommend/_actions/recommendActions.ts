'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminRecommend } from '../_api/adminDeleteRecommend'
import { patchAdminBlendMapPublish } from '../_api/adminPatchRecommend'
import { createAdminBlendMap } from '../_api/adminCreateRecommend'
import { RecommendTabId } from '../_types'

/**
 * 추천 관련 데이터 삭제 Server Action
 */
export async function deleteRecommendAction(tabId: RecommendTabId, id: number) {
  try {
    await deleteAdminRecommend(tabId, id)

    revalidatePath('/admin/recommend')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : null,
    }
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
    if (tabId === 'blend-maps') {
      await patchAdminBlendMapPublish(id, status as 'PUBLISHED' | 'UNPUBLISHED')
    }
    // TODO: product-pools, product-maps PATCH 연동 시 추가

    revalidatePath('/admin/recommend')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : null,
    }
  }
}

/**
 * 향조합 추천맵 생성 Server Action
 */
export async function createBlendMapAction(input_type: string) {
  try {
    await createAdminBlendMap(input_type)

    revalidatePath('/admin/recommend')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : null,
    }
  }
}
