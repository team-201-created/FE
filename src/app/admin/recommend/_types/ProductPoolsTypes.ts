import { PaginatedApiResponse } from './RecommendData'

export interface ProductPoolsItemResponse {
  id: number
  product_type: 'DIFFUSER' | 'PERFUME'
  product_count: number
  adoption_status: 'ADOPTED' | 'UNADOPTED'
  created_at: string
  updated_at: string
}

export type ProductPoolsListResponse =
  PaginatedApiResponse<ProductPoolsItemResponse>
