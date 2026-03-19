import { authFetch } from '@/lib/api'

/**
 * 어드민 테스트 발행 상태 변경 API
 */
export const patchAdminTestPublish = (
  form_id: number,
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
): Promise<{
  success: boolean
  data: { id: number; publish_status: string }
}> => {
  return authFetch.patch(`/api/v1/admin/profilings/forms/${form_id}/publish`, {
    publish_status,
  })
}
