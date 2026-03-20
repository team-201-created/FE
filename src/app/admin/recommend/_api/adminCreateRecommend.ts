import { authFetch } from '@/lib/api'

/**
 * 향조합 추천맵 생성 POST API
 */
export const createAdminBlendMap = (input_type: string) =>
  authFetch.post('/api/v1/admin/matches/blend-maps', { input_type })
