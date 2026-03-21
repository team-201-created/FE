import { authFetch } from '@/lib/api/client'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'

/**
 * 어드민 단품 카테고리 정보 조회 API
 */
export const fetchAdminElementCategories =
  (): Promise<AdminCategoryListResponse> => {
    return authFetch.get<AdminCategoryListResponse>(
      '/api/v1/scents/categories/element',
      {
        cache: 'no-store',
      }
    )
  }

/**
 * 어드민 조합 카테고리 정보 조회 API
 */
export const fetchAdminBlendCategories =
  (): Promise<AdminCategoryListResponse> => {
    return authFetch.get<AdminCategoryListResponse>(
      '/api/v1/scents/categories/blend',
      {
        cache: 'no-store',
      }
    )
  }
