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

/** 비로그인·세션 없음 등 로그인 유도가 필요한 API 오류인지 */
export function isLoginRequiredFetchError(err: unknown): err is FetchError {
  if (!(err instanceof FetchError)) return false
  if (err.status === 401 || err.status === 403) return true
  return /로그인|login|unauthorized|unauthenticated|인증|authentication|세션|session/i.test(
    err.message
  )
}

// re-export for convenience
export type { ApiErrorResponse }
