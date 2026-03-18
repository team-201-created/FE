import { createFetch } from './createFetch'
import { FetchError } from './fetchError'
import { ApiErrorResponse } from './types'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:3000'

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
      // Server Action 컨텍스트에서만 실행 (typeof window === 'undefined')
      // next/headers는 서버 전용 → dynamic import로 클라이언트 번들 오염 방지
      if (typeof window === 'undefined') {
        const { cookies } = await import('next/headers')
        const cookieStore = await cookies()
        const token = cookieStore.get('access_token')?.value

        if (token) {
          args.options.headers = {
            ...args.options.headers,
            Authorization: `Bearer ${token}`,
          }
        }
      }
      return args
    },
    response: handleResponse,
  },
})
