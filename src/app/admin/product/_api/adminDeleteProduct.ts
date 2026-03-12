import { authFetch } from '@/lib/api/client'
import { ProductTabId } from '../_types/AdminProductType'

/**
 * 어드민 상품 삭제 API
 */
export const deleteAdminProduct = (
  type: ProductTabId,
  id: number
): Promise<{ success: boolean }> => {
  const endpoint =
    type === 'ELEMENT'
      ? `/api/v1/scents/elements/${id}`
      : `/api/v1/scents/blends/${id}`
  return authFetch.delete(endpoint)
}
