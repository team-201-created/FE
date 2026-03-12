'use server'

import { revalidatePath } from 'next/cache'
import { createAdminCategory } from '../_api/adminCreateCategory'
import { CreateCategoryRequest } from '../_types/AdminCategoryType'

/**
 * 카테고리 생성 Server Action
 */
export async function postCategoryAction(payload: CreateCategoryRequest) {
  try {
    await createAdminCategory(payload)

    // 카테고리 관리 페이지의 서버 데이터를 최신화
    revalidatePath('/admin/category')

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
