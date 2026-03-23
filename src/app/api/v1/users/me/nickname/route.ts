import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { postTokenRefresh } from '@/lib/api/auth'

type NicknameUpdateResponse = {
  success: boolean
  data: {
    id: number
    nickname: string
    updated_at: string
  } | null
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

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

const fetchNicknameUpdate = async (
  baseUrl: string,
  accessToken: string,
  requestBody: string
) => {
  return fetch(`${baseUrl}/api/v1/users/me/nickname`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: requestBody,
    cache: 'no-store',
  })
}

type NicknameUpdateRequest = {
  nickname?: string
}

const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣]{2,8}$/

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request
      .json()
      .catch(() => null)) as NicknameUpdateRequest | null
    const nickname = body?.nickname?.trim()

    if (!nickname || !NICKNAME_PATTERN.test(nickname)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NICKNAME_UPDATE_INVALID_REQUEST',
            message: '닉네임 변경 요청이 올바르지 않습니다.',
            details: {
              field: 'nickname',
              reason: '2_to_8_alnum_or_korean_complete_only',
            },
          },
        },
        { status: 400 }
      )
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

    const cookieStore = await cookies()
    let accessToken = cookieStore.get('access_token')?.value
    const refreshToken = cookieStore.get('refresh_token')?.value
    const requestBody = JSON.stringify({ nickname })

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
      const upstream = await fetchNicknameUpdate(
        baseUrl,
        accessToken,
        requestBody
      )
      if (upstream.ok) {
        const data = await parseJsonSafely<NicknameUpdateResponse>(upstream)
        return NextResponse.json(data, { status: upstream.status })
      }

      if (upstream.status !== 401) {
        const errorBody =
          await parseJsonSafely<NicknameUpdateResponse>(upstream)
        return NextResponse.json(
          errorBody ?? {
            success: false,
            data: null,
            error: {
              code: 'NICKNAME_UPDATE_FAILED',
              message: '닉네임 변경에 실패했습니다.',
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

      const upstream = await fetchNicknameUpdate(
        baseUrl,
        accessToken,
        requestBody
      )
      const responseBody =
        await parseJsonSafely<NicknameUpdateResponse>(upstream)

      const response = NextResponse.json(
        responseBody ?? {
          success: false,
          data: null,
          error: {
            code: 'NICKNAME_UPDATE_FAILED',
            message: '닉네임 변경에 실패했습니다.',
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
  } catch (error) {
    console.error('Nickname update API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'NICKNAME_UPDATE_FAILED',
          message: '닉네임 변경 중 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    )
  }
}
