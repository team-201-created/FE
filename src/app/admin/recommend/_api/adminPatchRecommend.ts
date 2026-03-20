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

/**
 * 제품 후보군 채택 설정 PATCH API
 */
export const patchAdminProductPoolAdopt = (
  id: number,
  adoption_status: 'ADOPTED' | 'UNADOPTED'
) =>
  authFetch.patch(`/api/v1/admin/matches/product-pools/${id}/adopt`, {
    adoption_status,
  })

/**
 * 제품 추천맵 발행 설정 PATCH API
 */
export const patchAdminProductMapPublish = (
  id: number,
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
) =>
  authFetch.patch(`/api/v1/admin/matches/product-maps/${id}/publish`, {
    publish_status,
  })
