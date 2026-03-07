import { RecommendApiResponse } from './RecommendData'
import { ProductPoolsListResponse } from './ProductPoolsTypes'

export interface ProductMapsItemResponse {
  id: number
  product_pool_id: number
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export type ProductMapsListResponse =
  RecommendApiResponse<ProductMapsItemResponse>

export interface ProductMapsFormProps {
  value: number
  onChange: (val: number) => void
  poolsPromise: Promise<ProductPoolsListResponse>
}
