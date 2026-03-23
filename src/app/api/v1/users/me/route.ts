import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'
import type { ApiResponse, User } from '@/types'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'

/** MSW/목 모드에서 프로필 동기화가 실 API 없이 동작하도록 */
const MOCK_ME_USER: User = {
  id: 1,
  nickname: '목 사용자',
  email: 'mock@example.com',
  profileImageUrl: undefined,
  is_admin: false,
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: 'UNAUTHORIZED',
            message: 'No access token found.',
          },
        },
        { status: 401 }
      )
    }

    if (USE_MOCK) {
      const body: ApiResponse<User> = {
        success: true,
        data: MOCK_ME_USER,
      }
      return NextResponse.json(body, { status: 200 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

    if (!baseUrl) {
      return NextResponse.json(
        errorBody ?? {
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
