'use server'

import { revalidatePath } from 'next/cache'
import { createAdminCategory } from '../_api/adminCreateCategory'
import { deleteAdminCategory } from '../_api/adminDeleteCategory'
import type {
  CreateCategoryRequest,
  RootCategory,
} from '../_types/AdminCategoryType'

/**
 * 카테고리 생성 Server Action
 */
export async function postCategoryAction(
  rootCategory: RootCategory,
  payload: CreateCategoryRequest
) {
  try {
    await createAdminCategory(rootCategory, payload)
    revalidatePath('/admin/category')
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : null
    return { success: false, message }
  }
}

/**
 * 카테고리 삭제 Server Action
 */
export async function deleteCategoryAction(
  rootCategory: RootCategory,
  categoryId: number
) {
  try {
    await deleteAdminCategory(rootCategory, categoryId)
    revalidatePath('/admin/category')
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : null
    return { success: false, message }
  }
}
