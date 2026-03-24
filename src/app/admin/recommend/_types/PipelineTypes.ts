export interface PipelineSnapshotBody {
  input_type: 'PREFERENCE' | 'HEALTH' | 'OOTD' | 'INTERIOR'
  product_type: 'DIFFUSER' | 'PERFUME'
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
