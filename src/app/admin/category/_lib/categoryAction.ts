'use server'

import { revalidatePath } from 'next/cache'
import { FetchError } from '@/lib/api'
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
    return { success: true as const }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false as const, message: null, reason: null }
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
    if (error instanceof FetchError) {
      return {
        success: false as const,
        message: error.message,
        reason: error.details?.reason,
      }
    }
    return { success: false as const, message: null, reason: null }
  }
}
