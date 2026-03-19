import type { ApiResponse, AuthTokens, AuthorizeUrl, User } from '@/types'
import { apiFetch, appFetch } from './client'
import { FetchError } from './fetchError'

type TokenRefreshData = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  refresh_expires_in: number
}

/**
 * 소셜 로그인/회원가입 URL을 요청합니다.
 * @param provider 소셜 제공자 (e.g., 'kakao')
 * @param state CSRF 방지용 랜덤 문자열
 */
export async function getSocialAuthorizeUrl(
  provider: string,
  state: string
): Promise<ApiResponse<AuthorizeUrl>> {
  const redirectUri = `${window.location.origin}/login/callback`

  try {
    return await apiFetch.get<ApiResponse<AuthorizeUrl>>(
      `/api/v1/auth/social/${provider}/authorize-url`,
      {
        params: { state, redirect_uri: redirectUri },
      }
    )
  } catch (error) {
    // 백엔드 경로가 /auth/{provider}/authorize-url 인 환경을 fallback으로 지원
    if (error instanceof FetchError && error.status === 404) {
      return apiFetch.get<ApiResponse<AuthorizeUrl>>(
        `/api/v1/auth/${provider}/authorize-url`,
        {
          params: { state, redirect_uri: redirectUri },
        }
      )
    }
    throw error
  }
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
    console.error('Error in social callback:', data)
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
  return appFetch.get<ApiResponse<User>>('/api/auth/me')
}
