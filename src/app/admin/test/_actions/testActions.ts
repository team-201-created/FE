'use server'

import { revalidatePath } from 'next/cache'
import { deleteAdminTest } from '../_api/adminDeleteTest'

/**
 * 테스트 삭제 Server Action
 */
export async function deleteTestAction(form_id: number) {
  try {
    await deleteAdminTest(form_id)
    revalidatePath('/admin/test')
    return { success: true }
  } catch (error) {
    return { success: false, error }
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
    // TODO: 실제 API 연동 (authFetch.patch 등)
    // 현재는 revalidatePath만 수행하여 서버 컴포넌트를 갱신하도록 함
    revalidatePath('/admin/test')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
