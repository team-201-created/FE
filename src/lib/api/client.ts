import { createFetch } from './createFetch'
import { FetchError } from './fetchError'
import { ApiErrorResponse } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? ''

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// 공통 Response Interceptor
export const handleResponse = async (response: Response): Promise<Response> => {
  if (response.ok) return response

  const errorBody: ApiErrorResponse = await response.json().catch(() => ({
    success: false as const,
    error: { code: 'UNKNOWN', message: `알 수 없는 오류 (${response.status})` },
  }))

  throw new FetchError({
    code: errorBody.error.code,
    message: errorBody.error.message,
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    details: errorBody.error.details,
  })
}

// 인증 필요없는 Fetch 요청
export const apiFetch = createFetch({
  baseUrl: BASE_URL,
  headers: DEFAULT_HEADERS,
  interceptors: {
    response: handleResponse,
  },
})

// 인증이 필요한 Fetch 요청
export const authFetch = createFetch({
  baseUrl: BASE_URL,
  headers: DEFAULT_HEADERS,
  interceptors: {
    request: async (args) => {
      // TODO: 로그인 구현 후 토큰 주입
      // if (token) {
      //   args.options.headers = { ...args.options.headers, Authorization: `Bearer ${token}` }
      // }
      return args
    },
    response: handleResponse,
  },
})
