import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, proxyWithRefresh } from '@/lib/auth/serverAuthProxy'

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

    const baseUrl = getApiBaseUrl()
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

    const requestBody = JSON.stringify({ nickname })

    return proxyWithRefresh({
      requestWithAccessToken: (accessToken) =>
        fetchNicknameUpdate(baseUrl, accessToken, requestBody),
      fallbackError: {
        code: 'NICKNAME_UPDATE_FAILED',
        message: '닉네임 변경에 실패했습니다.',
      },
    })
  } catch {
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
