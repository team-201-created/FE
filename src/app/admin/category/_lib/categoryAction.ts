'use server'

import { revalidatePath } from 'next/cache'
import { createAdminCategory } from '../_api/adminCreateCategory'
import { deleteAdminCategory } from '../_api/adminDeleteCategory'
import { CreateCategoryRequest } from '../_types/AdminCategoryType'

/**
 * 카테고리 생성 Server Action
 */
export async function postCategoryAction(payload: CreateCategoryRequest) {
  try {
    await createAdminCategory(payload)
    revalidatePath('/admin/category')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * 카테고리 삭제 Server Action
 */
export async function deleteCategoryAction(categoryId: number) {
  try {
    await deleteAdminCategory(categoryId)
    revalidatePath('/admin/category')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
