import { authFetch } from '@/lib/api'
import { TestListResponse } from '@/app/admin/test/_types'

export type FormsFetchOptions = {
  page?: number
  size?: number
  publish_status?: string
  profiling_type?: string
  q?: string
}

export async function fetchAdminTests(
  options: FormsFetchOptions = {}
): Promise<TestListResponse> {
  return authFetch.get<TestListResponse>('/api/v1/admin/profilings/forms', {
    params: options,
  })
}
