import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'
import type { ApiResponse, User } from '@/types'

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

const clearAuthCookies = (response: NextResponse) => {
  response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
  response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })
}

const parseJsonSafely = async <T>(response: Response): Promise<T | null> => {
  return response.json().catch(() => null)
}

const fetchUsersMe = async ({
  method,
  accessToken,
  baseUrl,
  requestBody,
}: {
  method: 'GET' | 'DELETE'
  accessToken: string
  baseUrl: string
  requestBody?: string
}) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  if (method === 'DELETE') {
    headers['Content-Type'] = 'application/json'
  }

  return fetch(`${baseUrl}/api/v1/users/me`, {
    method,
    headers,
    body: method === 'DELETE' ? requestBody : undefined,
    cache: 'no-store',
  })
}

const proxyUsersMe = async ({
  method,
  requestBody,
}: {
  method: 'GET' | 'DELETE'
  requestBody?: string
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  if (!baseUrl) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'MISSING_API_URL',
          message: 'NEXT_PUBLIC_API_URL is not configured.',
        },
      },
      { status: 500 }
    )
  }

  const cookieStore = await cookies()
  let accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: '인증이 필요합니다.',
        },
      },
      { status: 401 }
    )
  }

  if (accessToken) {
    const upstream = await fetchUsersMe({
      method,
      accessToken,
      baseUrl,
      requestBody,
    })

    if (upstream.ok) {
      const body = await parseJsonSafely<ApiResponse<User | null>>(upstream)
      return NextResponse.json(body, { status: upstream.status })
    }

    if (upstream.status !== 401) {
      const errorBody =
        await parseJsonSafely<ApiResponse<User | null>>(upstream)
      return NextResponse.json(
        errorBody ?? {
          success: false,
          data: null,
          error: {
            code: 'USERS_ME_FETCH_FAILED',
            message:
              method === 'GET'
                ? 'Failed to fetch user profile.'
                : 'Failed to withdraw user account.',
          },
        },
        { status: upstream.status }
      )
    }
  }

  if (!refreshToken) {
    const response = NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: '인증이 필요합니다.',
        },
      },
      { status: 401 }
    )
    clearAuthCookies(response)
    return response
  }

  try {
    const refreshed = await postTokenRefresh(refreshToken)
    accessToken = refreshed.data.access_token

    const upstream = await fetchUsersMe({
      method,
      accessToken,
      baseUrl,
      requestBody,
    })
    const body = await parseJsonSafely<ApiResponse<User | null>>(upstream)

    const response = NextResponse.json(
      body ?? {
        success: false,
        data: null,
        error: {
          code: 'USERS_ME_FETCH_FAILED',
          message:
            method === 'GET'
              ? 'Failed to fetch user profile.'
              : 'Failed to withdraw user account.',
        },
      },
      { status: upstream.status }
    )

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
    const response = NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: '인증이 필요합니다.',
        },
      },
      { status: 401 }
    )
    clearAuthCookies(response)
    return response
  }
}

export async function GET() {
  try {
    return proxyUsersMe({ method: 'GET' })
  } catch (error) {
    // eslint-disable-next-line no-console -- 서버 오류 추적
    console.error('Users me API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'USERS_ME_FAILED',
          message: 'An error occurred while fetching profile.',
        },
      },
      { status: 500 }
    )
  }
}

type WithdrawRequest = {
  confirm_text?: string
}

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request
      .json()
      .catch(() => null)) as WithdrawRequest | null
    const confirmText = body?.confirm_text

    if (confirmText !== '회원탈퇴') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_WITHDRAW_REQUEST',
            message: '회원탈퇴 파라미터가 올바르지 않습니다.',
            details: {
              field: 'confirm_text',
              reason: 'must_equal_회원탈퇴',
            },
          },
        },
        { status: 400 }
      )
    }

    return proxyUsersMe({
      method: 'DELETE',
      requestBody: JSON.stringify({ confirm_text: confirmText }),
    })
  } catch (error) {
    // eslint-disable-next-line no-console -- 서버 오류 추적
    console.error('Users withdraw API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'USERS_WITHDRAW_FAILED',
          message: 'An error occurred while withdrawing account.',
        },
      },
      { status: 500 }
    )
  }
}
