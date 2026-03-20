'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminRecommend } from '../_api/adminDeleteRecommend'
import {
  patchAdminBlendMapPublish,
  patchAdminProductPoolAdopt,
  patchAdminProductMapPublish,
} from '../_api/adminPatchRecommend'
import {
  createAdminBlendMap,
  createAdminProductPool,
  createAdminProductMap,
} from '../_api/adminCreateRecommend'
import { RECOMMEND_API } from '../_api'
import {
  RecommendTabId,
  ProductPoolCreateBody,
  ProductPoolsListResponse,
} from '../_types'

/**
 * 채택된 제품 후보군 목록 조회 Server Action
 * — 클라이언트에서 authFetch를 직접 호출하면 토큰이 주입되지 않으므로
 *   서버 컨텍스트에서 실행되는 Server Action으로 감쌈
 */
export async function fetchAdoptedPoolsAction(): Promise<ProductPoolsListResponse> {
  return RECOMMEND_API.productPools({ size: 5, adoption_status: 'ADOPTED' })
}

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
    } else if (tabId === 'product-pools') {
      await patchAdminProductPoolAdopt(id, status as 'ADOPTED' | 'UNADOPTED')
    } else if (tabId === 'product-maps') {
      await patchAdminProductMapPublish(
        id,
        status as 'PUBLISHED' | 'UNPUBLISHED'
      )
    }

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
 * 제품 후보군 생성 Server Action
 */
export async function createProductPoolAction(body: ProductPoolCreateBody) {
  try {
    await createAdminProductPool(body)

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
 * 제품 추천맵 생성 Server Action
 */
export async function createProductMapAction(product_pool_id: number) {
  try {
    await createAdminProductMap(product_pool_id)

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
