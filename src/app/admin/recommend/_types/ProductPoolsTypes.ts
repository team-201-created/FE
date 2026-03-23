import { RecommendApiResponse } from './RecommendData'

export interface ProductPoolCreateBody {
  crawl_source: string
  crawl_count: number
  crawl_sort:
    | 'REVIEW_RATING'
    | 'REVIEW_COUNT'
    | 'SALES_VOLUME'
    | 'PRICE_HIGH'
    | 'PRICE_LOW'
  product_type: 'DIFFUSER' | 'PERFUME'
  crawl_config: {
    min_price: number
    max_price: number
    min_rating: number
    min_review_count: number
  }
}

export interface ProductPoolsItemResponse {
  id: number
  product_type: 'DIFFUSER' | 'PERFUME'
  product_count: number
  adoption_status: 'ADOPTED' | 'UNADOPTED'
  created_at: string
  updated_at: string
}

export type ProductPoolsListResponse =
  RecommendApiResponse<ProductPoolsItemResponse>

export interface ProductPoolsDetailResult {
  id: number
  product_type: string
  name: string
  brand: string
  price: number
  review_rating: number
  review_count: number
  scent_keywords: string[]
  purchase_url: string
}

export interface ProductPoolsDetailResponse {
  id: number
  product_type: 'DIFFUSER' | 'PERFUME'
  crawl_source: string
  crawl_count: number
  crawl_sort: string
  crawl_config: Record<string, unknown>
  adoption_status: 'ADOPTED' | 'UNADOPTED'
  created_at: string
  updated_at: string
  results: ProductPoolsDetailResult[]
  page: number
  size: number
  count: number
  total_pages: number
}

export interface ProductPoolsFormProps {
  formData: {
    crawl_source: string
    crawl_count: number
    crawl_sort: string
    product_type: string
    crawl_config: {
      min_price: number
      max_price: number
      min_rating: number
      min_review_count: number
    }
  }
  onFieldChange: (key: string, value: any) => void
  onConfigChange: (key: string, value: any) => void
}
