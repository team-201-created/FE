import { apiFetch } from '@/lib/api/client'
import type {
  AdminElementListResponse,
  AdminBlendListResponse,
  ProductTabId,
} from '../_types/AdminProductType'

type FetchProductOptions = {
  q?: string
  scent_category_id?: number
  theme_category_id?: number
  sort?: string
  page?: number
  size?: number
}

// 응답 타입 매핑
interface ProductResponseMap {
  ELEMENT: AdminElementListResponse
  BLEND: AdminBlendListResponse
}

const PRODUCT_ENDPOINTS: Record<ProductTabId, string> = {
  ELEMENT: '/api/v1/scents/elements',
  BLEND: '/api/v1/scents/blends',
}

/**
 * 상품 목록 조회 API
 * @param tabId 'ELEMENT' | 'BLEND'
 * @param options 필터 및 페이지네이션
 */
export const fetchAdminProductList = <T extends ProductTabId>(
  tabId: T,
  options?: FetchProductOptions
): Promise<ProductResponseMap[T]> => {
  return apiFetch.get<ProductResponseMap[T]>(PRODUCT_ENDPOINTS[tabId], {
    params: options,
  })
}
