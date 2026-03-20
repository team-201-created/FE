import { createFetch } from './createFetch'
import { FetchError } from './fetchError'
import type { ApiErrorResponse } from './types'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:3000'

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const AUTH_REFRESH_PATH = '/api/auth/refresh'
const RETRY_HEADER = 'x-auth-retried'

type RefreshErrorPayload = {
  success?: boolean
  error?: {
    code?: string
    message?: string
  }
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

export const appFetch = createFetch({
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
    response: async (response, requestArgs) => {
      if (
        response.status === 401 &&
        typeof window !== 'undefined' &&
        !requestArgs.url.includes(AUTH_REFRESH_PATH)
      ) {
        const headers = new Headers(requestArgs.options.headers as HeadersInit)
        const hasRetried = headers.get(RETRY_HEADER) === '1'

        if (!hasRetried) {
          const refreshResponse = await fetch(AUTH_REFRESH_PATH, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })

          if (refreshResponse.ok) {
            headers.set(RETRY_HEADER, '1')

            const retryResponse = await fetch(requestArgs.url, {
              ...requestArgs.options,
              headers: Object.fromEntries(headers.entries()),
            })

            if (retryResponse.ok) {
              return retryResponse
            }

            return handleResponse(retryResponse)
          }

          const refreshError = (await refreshResponse
            .json()
            .catch(() => null)) as RefreshErrorPayload | null

          const { useModalStore } = await import('@/store/useModalStore')
          useModalStore.getState().openAlert({
            type: 'danger',
            title: '인증이 만료되었습니다.',
            content:
              refreshError?.error?.message ||
              '세션이 만료되었습니다. 다시 로그인해 주세요.',
            confirmText: '로그인으로 이동',
            onConfirm: () => {
              window.location.href = '/login'
            },
          })
        }
      }

      return handleResponse(response)
    },
  },
})

export const authFetch = appFetch
