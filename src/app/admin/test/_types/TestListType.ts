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
    content: TestListItem[]
    page: number
    size: number
    total_elements: number
    total_pages: number
  }
}
