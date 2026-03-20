import { authFetch } from '@/lib/api'
import type { CreateElementBody, CreateBlendBody } from './adminCreateProduct'

export const patchAdminElement = (id: number, body: CreateElementBody) =>
  authFetch.patch(`/api/v1/admin/scents/elements/${id}`, body)

export const patchAdminBlend = (id: number, body: CreateBlendBody) =>
  authFetch.patch(`/api/v1/admin/scents/blends/${id}`, body)
