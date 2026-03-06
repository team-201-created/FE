import { RecommendApiResponse } from './RecommendData'

export interface ProductMapsItemResponse {
  id: number
  product_pool_id: number
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export type ProductMapsListResponse =
  RecommendApiResponse<ProductMapsItemResponse>
