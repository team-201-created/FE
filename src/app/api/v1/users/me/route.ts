import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { ApiResponse, User } from '@/types'

export async function GET() {
  try {
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
