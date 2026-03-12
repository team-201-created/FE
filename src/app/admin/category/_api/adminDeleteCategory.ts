import { authFetch } from '@/lib/api/client'

/**
 * 어드민 카테고리 삭제 API
 */
export const deleteAdminCategory = (
  categoryId: number
): Promise<{ success: boolean }> => {
  return authFetch.delete(`/api/v1/admin/scents/categories/${categoryId}`)
}
