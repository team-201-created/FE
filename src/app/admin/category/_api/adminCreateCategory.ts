import { authFetch } from '@/lib/api/client'
import type {
  CreateCategoryRequest,
  AdminCreateCategoryResponse,
  RootCategory,
} from '../_types/AdminCategoryType'

/**
 * 어드민 카테고리 등록 API
 */
export const createAdminCategory = (
  rootCategory: RootCategory,
  payload: CreateCategoryRequest
): Promise<AdminCreateCategoryResponse> => {
  return authFetch.post<AdminCreateCategoryResponse>(
    `/api/v1/admin/scents/categories/${rootCategory}`,
    payload
  )
}
