import type { ApiResponse, AuthTokens, AuthorizeUrl, User } from '@/types'
import { appFetch } from './client'
import { FetchError } from './fetchError'
import type { ApiErrorResponse } from './types'

type TokenRefreshData = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  refresh_expires_in: number
}

/**
 * 소셜 로그인/회원가입 URL을 요청합니다.
 * apiFetch는 NEXT_PUBLIC_API_URL을 base로 쓰므로 브라우저에서 CORS가 납니다.
 * 동일 출처 `/api/v1/auth/social/...` Next 라우트(BFF)로만 요청합니다.
 */
export async function getSocialAuthorizeUrl(
  provider: string,
  state: string
): Promise<ApiResponse<AuthorizeUrl>> {
  const redirectUri = `${window.location.origin}/login/callback`
  const params = new URLSearchParams({
    state,
    redirect_uri: redirectUri,
  })
  const path = `/api/v1/auth/social/${provider}/authorize-url?${params.toString()}`

  const response = await fetch(path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const body = (await response.json().catch(() => null)) as
    | ApiResponse<AuthorizeUrl>
    | ApiErrorResponse
    | null

  if (!body) {
    throw new FetchError({
      code: 'PARSE_ERROR',
      message: 'authorize-url 응답을 해석할 수 없습니다.',
      status: response.status,
      statusText: response.statusText,
      url: path,
    })
  }

  if (!response.ok) {
    const err = body as ApiErrorResponse
    throw new FetchError({
      code: err.error?.code ?? 'AUTHORIZE_URL_FAILED',
      message:
        err.error?.message ?? `authorize-url 요청 실패 (${response.status})`,
      status: response.status,
      statusText: response.statusText,
      url: path,
      details: err.error?.details,
    })
  }

  return body as ApiResponse<AuthorizeUrl>
}

/**
 * 소셜 로그인/회원가입 처리를 요청합니다.
 * @param provider 소셜 제공자 (e.g., 'kakao')
 * @param code 인가 코드
 * @param state CSRF 방지용 state 값 (선택)
 */
export async function postSocialCallback(
  provider: string,
  code: string,
  state: string | null,
  redirect_uri: string
): Promise<ApiResponse<AuthTokens>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/api/v1/auth/${provider}/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      state,
      redirect_uri,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to process social callback')
  }

  return data
}

/**
 * 로그인 세션 쿠키 저장을 요청합니다.
 */
export function postSessionLogin(
  accessToken: string,
  refreshToken: string
): Promise<ApiResponse<null>> {
  return appFetch.post<ApiResponse<null>>('/api/auth/login', {
    accessToken,
    refreshToken,
  })
}

/**
 * 리프레시 토큰으로 토큰 재발급을 요청합니다.
 */
export async function postTokenRefresh(
  refreshToken: string
): Promise<ApiResponse<TokenRefreshData>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/api/v1/auth/token/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  const data = (await response
    .json()
    .catch(() => null)) as ApiResponse<TokenRefreshData> | null

  if (!response.ok || !data) {
    throw new Error(data?.error?.message || 'Failed to refresh token')
  }

  return data
}

/**
 * 로그아웃을 요청합니다.
 */
export function postLogout(): Promise<ApiResponse<null>> {
  return appFetch.post<ApiResponse<null>>('/api/auth/logout')
}

/**
 * 현재 로그인된 사용자 정보를 가져옵니다.
 */
export function getMe(): Promise<ApiResponse<User>> {
  return appFetch.get<ApiResponse<User>>('/api/v1/users/me')
}
