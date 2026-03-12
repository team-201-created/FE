export interface StorageItem {
  id: number
  input_data_type: string
  product_type: string
  recommended_blend: {
    id: number
    name: string
    image_url: string
    element_category: string
    blend_category: string[]
  }
  created_at: string
}

export interface StorageApiResponse {
  success: boolean
  data?: StorageItem[]
}
