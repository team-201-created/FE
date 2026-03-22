import { authFetch } from '@/lib/api'
import { PipelineSnapshotBody, PipelineSnapshotResponse } from '../_types'

/**
 * 파이프라인 스냅샷 생성 API
 * POST /api/v1/admin/matches/pipeline/snapshot
 */
export const createAdminPipelineSnapshot = (
  body: PipelineSnapshotBody
): Promise<PipelineSnapshotResponse> =>
  authFetch.post('/api/v1/admin/matches/pipeline/snapshot', body)
