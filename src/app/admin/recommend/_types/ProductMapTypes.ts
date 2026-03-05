export interface ProductMapItemResponse {
  id: number
  product_type: 'DIFFUSER' | 'PERFUME'
  product_count: number
  adoption_status: 'ADOPTED' | 'UNADOPTED'
  created_at: string
  updated_at: string
}

export interface ProductMapListResponse {
  success: boolean
  data: {
    content: ProductMapItemResponse[]
    page: number
    size: number
    total_elements: number
    total_pages: number
  }
}
