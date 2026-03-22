export interface PipelineSnapshotBody {
  input_type: string
  product_type: string
  profiling_form_id?: number
  blend_match_map_id: number
  product_match_map_id: number
}

export interface PipelineSnapshotItem {
  id: number
  input_type: string
  product_type: string
  is_active: boolean
  created_at: string
}

export interface PipelineSnapshotResponse {
  success: boolean
  data: PipelineSnapshotItem
}
