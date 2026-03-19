import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    if (!refreshToken) {
      const response = NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'UNAUTHORIZED',
            message: 'No refresh token found.',
          },
        },
        { status: 401 }
      )

      response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
      response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })

      return response
    }

    const refreshed = await postTokenRefresh(refreshToken)

    if (!refreshed.success) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: refreshed.error ?? {
            code: 'REFRESH_FAILED',
            message: 'Failed to refresh token.',
          },
        },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, data: null })

    response.cookies.set('access_token', refreshed.data.access_token, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: refreshed.data.expires_in,
    })
    response.cookies.set('refresh_token', refreshed.data.refresh_token, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: refreshed.data.refresh_expires_in,
    })

    return response
  } catch (error) {
    console.error('Refresh API error:', error)

    const response = NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'AUTH_FAILED_TOKEN_REFRESH',
          message: '토큰 재발급에 실패했습니다.',
        },
      },
      { status: 401 }
    )

    response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
    response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })

    return response
  }
}
