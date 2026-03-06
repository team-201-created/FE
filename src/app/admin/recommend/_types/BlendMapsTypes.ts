import { RecommendApiResponse } from './RecommendData'

export interface BlendMapsItemResponse {
  id: number
  input_type: string
  publish_status: 'PUBLISHED' | 'UNPUBLISHED'
  created_at: string
  updated_at: string
}

export type BlendMapsListResponse = RecommendApiResponse<BlendMapsItemResponse>

export interface BlendMapsFormProps {
  value: string
  onChange: (val: string) => void
}
