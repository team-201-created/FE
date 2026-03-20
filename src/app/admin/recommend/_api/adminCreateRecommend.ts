import { authFetch } from '@/lib/api'
import { ProductPoolCreateBody } from '@/app/admin/recommend/_types'

/**
 * 향조합 추천맵 생성 POST API
 */
export const createAdminBlendMap = (input_type: string) =>
  authFetch.post('/api/v1/admin/matches/blend-maps', { input_type })

/**
 * 제품 후보군 생성 POST API
 */
export const createAdminProductPool = (body: ProductPoolCreateBody) =>
  authFetch.post('/api/v1/admin/matches/product-pools', body)
