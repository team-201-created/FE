import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

type ProxyError = {
  code: string
  message: string
  details?: unknown
}

type ProxyFallback = {
  success: false
  data: null
  error: ProxyError
}

type AuthProxyOptions = {
  requestWithAccessToken: (accessToken: string) => Promise<Response>
  fallbackError: ProxyError
  unauthenticatedError?: ProxyError
}

const DEFAULT_UNAUTHENTICATED_ERROR: ProxyError = {
  code: 'NOT_AUTHENTICATED',
  message: '인증이 필요합니다.',
}

const asFallback = (error: ProxyError): ProxyFallback => ({
  success: false,
  data: null,
  error,
})

export const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
  response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })
}

export const parseJsonSafely = async <T>(
  response: Response
): Promise<T | null> => {
  return response.json().catch(() => null)
}

export const getApiBaseUrl = (): string | null => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()
  return baseUrl || null
}

export async function proxyWithRefresh({
  requestWithAccessToken,
  fallbackError,
  unauthenticatedError = DEFAULT_UNAUTHENTICATED_ERROR,
}: AuthProxyOptions): Promise<NextResponse> {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.json(asFallback(unauthenticatedError), { status: 401 })
  }

  if (accessToken) {
    const upstream = await requestWithAccessToken(accessToken)

    if (upstream.ok) {
      const body = await parseJsonSafely<unknown>(upstream)
      return NextResponse.json(body, { status: upstream.status })
    }

    if (upstream.status !== 401) {
      const body = await parseJsonSafely<unknown>(upstream)
      return NextResponse.json(body ?? asFallback(fallbackError), {
        status: upstream.status,
      })
    }
  }

  if (!refreshToken) {
    const response = NextResponse.json(asFallback(unauthenticatedError), {
      status: 401,
    })
    clearAuthCookies(response)
    return response
  }

  try {
    const refreshed = await postTokenRefresh(refreshToken)
    accessToken = refreshed.data.access_token

    const upstream = await requestWithAccessToken(accessToken)
    const body = await parseJsonSafely<unknown>(upstream)

    const response = NextResponse.json(body ?? asFallback(fallbackError), {
      status: upstream.status,
    })

    response.cookies.set('access_token', refreshed.data.access_token, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: refreshed.data.expires_in,
    })
    response.cookies.set('refresh_token', refreshed.data.refresh_token, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: refreshed.data.refresh_expires_in,
    })

    return response
  } catch {
    const response = NextResponse.json(asFallback(unauthenticatedError), {
      status: 401,
    })
    clearAuthCookies(response)
    return response
  }
}
