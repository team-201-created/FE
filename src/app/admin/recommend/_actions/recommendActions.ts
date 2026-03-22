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
import { createAdminPipelineSnapshot } from '../_api/adminCreatePipeline'
import { RECOMMEND_API } from '../_api'
import {
  RecommendTabId,
  ProductPoolCreateBody,
  ProductPoolsListResponse,
  BlendMapsListResponse,
  ProductMapsListResponse,
  PipelineSnapshotBody,
} from '../_types'
import { fetchAdminTests } from '@/app/admin/test/_api/adminFetchTest'
import { TestListResponse } from '@/app/admin/test/_types'
import { extractError } from '@/app/admin/_lib/actionUtils'

const REVALIDATE_DELAY_MS = 100
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 채택된 제품 후보군 목록 조회 Server Action
 * — 클라이언트에서 authFetch를 직접 호출하면 토큰이 주입되지 않으므로
 *   서버 컨텍스트에서 실행되는 Server Action으로 감쌈
 */
export async function fetchAdoptedPoolsAction(): Promise<ProductPoolsListResponse> {
  try {
    return await RECOMMEND_API.productPools({
      size: 5,
      adoption_status: 'ADOPTED',
    })
  } catch {
    return {
      success: false,
      data: { results: [], page: 1, size: 5, count: 0, total_pages: 0 },
    }
  }
}

/**
 * 추천 관련 데이터 삭제 Server Action
 */
export async function deleteRecommendAction(tabId: RecommendTabId, id: number) {
  try {
    await deleteAdminRecommend(tabId, id)
    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')

    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
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

    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 제품 후보군 생성 Server Action
 */
export async function createProductPoolAction(body: ProductPoolCreateBody) {
  try {
    await createAdminProductPool(body)
    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 제품 추천맵 생성 Server Action
 */
export async function createProductMapAction(product_pool_id: number) {
  try {
    await createAdminProductMap(product_pool_id)
    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 향조합 추천맵 생성 Server Action
 */
export async function createBlendMapAction(input_type: string) {
  try {
    await createAdminBlendMap(input_type)
    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 파이프라인 스냅샷 생성 Server Action
 */
export async function createPipelineSnapshotAction(body: PipelineSnapshotBody) {
  try {
    await createAdminPipelineSnapshot(body)
    await delay(REVALIDATE_DELAY_MS)
    revalidatePath('/admin/recommend')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 발행 중인 향조합 추천맵 목록 조회 (파이프라인 폼 드롭다운용)
 */
export async function fetchPublishedBlendMapsAction(): Promise<BlendMapsListResponse> {
  try {
    return await RECOMMEND_API.blendMaps({
      publish_status: 'PUBLISHED',
      size: 4,
    })
  } catch {
    return {
      success: false,
      data: { results: [], page: 1, size: 4, count: 0, total_pages: 0 },
    }
  }
}

/**
 * 발행 중인 제품 추천맵 목록 조회 (파이프라인 폼 드롭다운용)
 */
export async function fetchPublishedProductMapsAction(): Promise<ProductMapsListResponse> {
  try {
    return await RECOMMEND_API.productMaps({
      publish_status: 'PUBLISHED',
      size: 2,
    })
  } catch {
    return {
      success: false,
      data: { results: [], page: 1, size: 2, count: 0, total_pages: 0 },
    }
  }
}

/**
 * 발행 중인 테스트 목록 조회 (파이프라인 폼 드롭다운용)
 */
export async function fetchPublishedTestsAction(): Promise<TestListResponse> {
  try {
    return await fetchAdminTests({ publish_status: 'PUBLISHED', size: 4 })
  } catch {
    return {
      success: false,
      data: { results: [], page: 1, size: 4, count: 0, total_pages: 0 },
    }
  }
}
