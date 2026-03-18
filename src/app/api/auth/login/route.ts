import { NextResponse } from 'next/server'

type LoginBody = {
  accessToken?: string
  refreshToken?: string
}

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export async function POST(request: Request) {
  try {
    const { accessToken, refreshToken } = (await request.json()) as LoginBody

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'INVALID_REQUEST',
            message: 'accessToken and refreshToken are required.',
          },
        },
        { status: 400 }
      )
    }

    const response = NextResponse.json({ success: true, data: null })

    response.cookies.set('access_token', accessToken, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: 60 * 60,
    })
    response.cookies.set('refresh_token', refreshToken, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 3,
    })

    return response
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'LOGIN_FAILED',
          message: 'An error occurred during login.',
        },
      },
      { status: 500 }
    )
  }
}
