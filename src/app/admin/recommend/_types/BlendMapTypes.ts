export interface BlendMapItemResponse {
  id: number
  input_type: string
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export interface BlendMapListResponse {
  success: boolean
  data: {
    content: BlendMapItemResponse[]
    page: number
    size: number
    total_elements: number
    total_pages: number
  }
}
