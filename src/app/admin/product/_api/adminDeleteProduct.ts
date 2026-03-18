import { authFetch } from '@/lib/api/client'
import { ProductTabId } from '@/app/admin/product/_types/AdminProductType'

/**
 * 어드민 상품 삭제 API
 */
export const deleteAdminProduct = (
  type: ProductTabId,
  id: number
): Promise<{ success: boolean }> => {
  const endpoint =
    type === 'ELEMENT'
      ? `/api/v1/admin/scents/elements/${id}`
      : `/api/v1/admin/scents/blends/${id}`
  return authFetch.delete(endpoint)
}
