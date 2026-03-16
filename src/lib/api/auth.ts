import type { ApiResponse, AuthTokens, AuthorizeUrl } from '@/types'

// 소셜 로그인 및 토큰 관련 API 함수 모음

/**
 * 소셜 로그인/회원가입 URL을 요청합니다.
 * @param provider 소셜 제공자 (e.g., 'kakao')
 * @param state CSRF 방지용 랜덤 문자열
 * @param redirectUri 리디렉션 URI
 */
export async function getSocialAuthorizeUrl(
  provider: string,
  state: string
): Promise<ApiResponse<AuthorizeUrl>> {
  const redirectUri = `${window.location.origin}/login/callback`
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(
    `${backendApiUrl}/api/v1/auth/social/${provider}/authorize-url?state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`
  )

  if (!res.ok) {
    const errorData = await res.json().catch(() => null) // 에러 응답이 JSON이 아닐 수도 있음
    console.error('Error fetching authorize URL:', errorData)
    throw new Error('Failed to fetch authorize URL')
  }

  return res.json()
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
  state: string | null
): Promise<ApiResponse<AuthTokens>> {
  const redirectUri = `${window.location.origin}/login/callback`
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(
    `${backendApiUrl}/api/v1/auth/${provider}/callback`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        state,
        redirect_uri: redirectUri,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.error('Error in social callback:', data)
    throw new Error(data.error?.message || 'Failed to process social callback')
  }

  return data
}

/**
 * 토큰 재발급을 요청합니다.
 * @param refreshToken 리프레시 토큰
 */
export async function postTokenRefresh(
  refreshToken: string
): Promise<ApiResponse<Pick<AuthTokens, 'access_token'>>> {
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${backendApiUrl}/api/v1/auth/token/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    console.error('Error refreshing token:', errorData)
    throw new Error('Failed to refresh token')
  }

  return res.json()
}

/**
 * 로그아웃을 요청합니다.
 * @param accessToken 액세스 토큰
 * @param refreshToken 리프레시 토큰
 */
export async function postLogout(
  accessToken: string,
  refreshToken: string
): Promise<ApiResponse<null>> {
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${backendApiUrl}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json().catch(() => ({})) // 응답이 JSON이 아닐 수도 있음

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to logout')
  }

  return data
}
