'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminTest } from '../_api/adminDeleteTest'
import { patchAdminTestPublish } from '../_api/adminPatchTest'
import { createAdminTest, CreateTestPayload } from '../_api/adminCreateTest'
import { fetchAdminTestDetail } from '../_api/adminFetchTestDetail'
import { extractError } from '@/app/admin/_lib/actionUtils'

export async function deleteTestAction(form_id: number) {
  try {
    await deleteAdminTest(form_id)
    revalidatePath('/admin/test')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 테스트 발행 상태 토글 Server Action
 */
export async function toggleTestPublishAction(
  form_id: number,
  status: 'PUBLISHED' | 'UNPUBLISHED'
) {
  try {
    await patchAdminTestPublish(form_id, status)
    revalidatePath('/admin/test')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}

/**
 * 테스트 상세 조회 Server Action
 */
export async function getTestDetailAction(form_id: number) {
  try {
    const result = await fetchAdminTestDetail(form_id)
    return { success: true as const, data: result.data }
  } catch (error) {
    return { success: false as const, ...extractError(error), data: null }
  }
}

/**
 * 테스트 생성 Server Action
 */
export async function createTestAction(payload: CreateTestPayload) {
  try {
    await createAdminTest(payload)
    revalidatePath('/admin/test')
    return { success: true as const }
  } catch (error) {
    return { success: false as const, ...extractError(error) }
  }
}
