import { apiFetch } from '@/lib/api/client'
import type {
  AdminCategoryListResponse,
  CategoryTabId,
} from '../_types/AdminCategoryType'

type FetchCategoryOptions = {
  root_category: CategoryTabId
}

/**
 * 어드민 카테고리 정보 조회 API (계층 구조)
 * @param rootCategory 'Element' | 'Blend'
 */
export const fetchAdminCategories = (
  options: FetchCategoryOptions
): Promise<AdminCategoryListResponse> => {
  return apiFetch.get<AdminCategoryListResponse>('/api/v1/scents/categories', {
    params: options,
    cache: 'force-cache',
  })
}
