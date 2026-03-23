import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
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

    const response = await fetch(`${baseUrl}/api/v1/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data = (await response
      .json()
      .catch(() => null)) as ApiResponse<User> | null

    if (!response.ok || !data) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: {
            code: data?.error?.code ?? 'USERS_ME_FETCH_FAILED',
            message: data?.error?.message ?? 'Failed to fetch user profile.',
          },
        },
        { status: response.status || 500 }
      )
    }

    return NextResponse.json(data, { status: response.status })
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
