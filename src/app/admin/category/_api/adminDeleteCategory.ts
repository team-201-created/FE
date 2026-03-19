import { authFetch } from '@/lib/api/client'
import type { RootCategory } from '../_types/AdminCategoryType'

/**
 * 어드민 카테고리 삭제 API
 */
export const deleteAdminCategory = (
  rootCategory: RootCategory,
  categoryId: number
): Promise<{ success: boolean; data: null }> => {
  return authFetch.delete(
    `/api/v1/admin/scents/categories/${rootCategory}/${categoryId}`
  )
}
