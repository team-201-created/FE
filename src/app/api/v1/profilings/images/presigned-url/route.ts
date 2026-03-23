/**
 * 이미지 업로드용 presigned URL 발급
 * PUT /api/v1/profilings/images/presigned-url
 *
 * - NEXT_PUBLIC_USE_MOCK_API=true: 로컬 mock 응답(같은 오리진 mock-upload)
 * - 그 외: 백엔드 프록시 — Body { file_name, file_size } 만 전달
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true'
const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp']
const MOCK_IMAGE_URL = 'https://cdn.example.com/images/ai-visual-mock.jpg'
const MOCK_KEY = 'images/ai-visual-mock.jpg'

function getOrigin(request: Request): string {
  try {
    return new URL(request.url).origin
  } catch {
    return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  }
}

function resolveBearer(request: Request): string | null {
  const auth = request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ') && auth.length > 7) return auth
  return null
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value
  const bearer = resolveBearer(request) ?? (token ? `Bearer ${token}` : null)

  if (!bearer) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
          details: null,
        },
      },
      { status: 401 }
    )
  }

  let body: {
    file_name?: string
    file_size?: number
    image_format?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: '요청 본문이 올바르지 않습니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }

  const { file_name, file_size, image_format } = body ?? {}
  if (!file_name || file_size == null) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'file_name, file_size는 필수입니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }

  if (USE_MOCK) {
    if (
      image_format != null &&
      !ALLOWED_FORMATS.includes(String(image_format).toLowerCase())
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: '허용되지 않는 파일 형식입니다.',
            details: null,
          },
        },
        { status: 400 }
      )
    }

    const origin = getOrigin(request)
    const presigned_url = `${origin}/api/v1/profilings/images/mock-upload`

    return NextResponse.json(
      {
        success: true,
        data: {
          presigned_url,
          image_url: MOCK_IMAGE_URL,
          key: MOCK_KEY,
          expires_in: 300,
        },
      },
      { status: 201 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()
  if (!baseUrl) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'MISSING_API_URL',
          message: 'NEXT_PUBLIC_API_URL is not configured.',
          details: null,
        },
      },
      { status: 500 }
    )
  }

  const upstream = await fetch(
    `${baseUrl}/api/v1/profilings/images/presigned-url`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify({ file_name, file_size }),
      cache: 'no-store',
    }
  )

  const text = await upstream.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = {
      success: false,
      error: {
        code: 'UPSTREAM_PARSE_ERROR',
        message: '서버 응답을 해석하지 못했습니다.',
        details: null,
      },
    }
  }

  return NextResponse.json(data, { status: upstream.status })
}
