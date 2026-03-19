import { authFetch } from '@/lib/api'

/**
 * 향조합 추천맵 발행 설정 PATCH API
 */
export const patchAdminBlendMapPublish = (
  id: number,
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
) =>
  authFetch.patch(`/api/v1/admin/matches/blend-maps/${id}/publish`, {
    publish_status,
  })
