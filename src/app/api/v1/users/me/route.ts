import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl, proxyWithRefresh } from '@/lib/auth/serverAuthProxy'

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

  return proxyWithRefresh({
    requestWithAccessToken: (accessToken) =>
      fetchUsersMe({
        method,
        accessToken,
        baseUrl,
        requestBody,
      }),
    fallbackError: {
      code: 'USERS_ME_FETCH_FAILED',
      message:
        method === 'GET'
          ? 'Failed to fetch user profile.'
          : 'Failed to withdraw user account.',
    },
  })
}

export async function GET() {
  try {
    return proxyUsersMe({ method: 'GET' })
  } catch {
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
  } catch {
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
