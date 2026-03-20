import { apiFetch } from '@/lib/api'
import type {
  AdminElementDetailResponse,
  AdminBlendDetailResponse,
} from '../_types/AdminProductType'

export const fetchAdminElementDetail = (
  id: number
): Promise<AdminElementDetailResponse> =>
  apiFetch.get(`/api/v1/scents/elements/${id}`)

export const fetchAdminBlendDetail = (
  id: number
): Promise<AdminBlendDetailResponse> =>
  apiFetch.get(`/api/v1/scents/blends/${id}`)
