import { authFetch } from '@/lib/api/client'

export interface CreateElementBody {
  name: string
  description?: string
  category_id: number
  image_url?: string
}

export interface CreateBlendBody {
  name: string
  description?: string
  blend_category_ids: number[]
  element_ids: number[]
  image_url?: string
}

export interface PresignedUrlData {
  presigned_url: string
  image_url: string
  key: string
  expires_in: number
}

/**
 * 어드민 향 단품 등록 API
 */
export const createAdminElement = (body: CreateElementBody) =>
  authFetch.post('/api/v1/admin/scents/elements', body)

/**
 * 어드민 향 조합 등록 API
 */
export const createAdminBlend = (body: CreateBlendBody) =>
  authFetch.post('/api/v1/admin/scents/blends', body)

/**
 * 상품 이미지 S3 Presigned URL 발급 API
 */
export const getAdminProductPresignedUrl = (
  file_name: string,
  file_size: number
): Promise<{ success: true; data: PresignedUrlData }> =>
  authFetch.put('/api/v1/admin/scents/images/presigned-url', {
    file_name,
    file_size,
  })
