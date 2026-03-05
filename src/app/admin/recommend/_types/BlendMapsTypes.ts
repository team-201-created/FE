import { PaginatedApiResponse } from './RecommendData'

export interface BlendMapsItemResponse {
  id: number
  input_type: string
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export type BlendMapsListResponse = PaginatedApiResponse<BlendMapsItemResponse>
