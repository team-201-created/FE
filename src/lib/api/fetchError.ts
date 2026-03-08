import { ApiErrorResponse } from './types'

// API 에러 클래스
export class FetchError extends Error {
  code: string
  status: number
  statusText: string
  url: string
  details?: { field?: string; reason?: string }

  constructor(params: {
    code: string
    message: string
    status: number
    statusText: string
    url: string
    details?: { field?: string; reason?: string }
  }) {
    super(params.message)
    this.name = 'FetchError'
    this.code = params.code
    this.status = params.status
    this.statusText = params.statusText
    this.url = params.url
    this.details = params.details
  }
}

// re-export for convenience
export type { ApiErrorResponse }
