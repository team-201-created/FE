export interface ScentMapItemResponse {
  id: number
  input_type: string
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export interface ScentMapListResponse {
  success: boolean
  data: {
    content: ScentMapItemResponse[]
    page: number
    size: number
    total_elements: number
    total_pages: number
  }
}
