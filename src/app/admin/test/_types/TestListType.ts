export type PublishStatus = 'PUBLISHED' | 'UNPUBLISHED'

export interface TestListItem {
  id: number
  name: string
  profiling_type: string
  publish_status: PublishStatus
  created_at: string
  updated_at: string
}

export interface TestListResponse {
  success: boolean
  data: {
    results: TestListItem[]
    page: number
    size: number
    count: number
    total_pages: number
  }
}
