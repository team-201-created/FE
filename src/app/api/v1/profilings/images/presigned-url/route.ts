/**
 * 이미지 업로드용 presigned URL 발급 (MSW 미가로챔 시 fallback)
 * PUT /api/v1/profilings/images/presigned-url
 * Body: { file_name, image_format (jpeg|jpg|png|webp), file_size }
 */
import { NextResponse } from 'next/server'

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

export async function PUT(request: Request) {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) {
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

  let body: { file_name?: string; image_format?: string; file_size?: number }
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

  const { file_name, image_format, file_size } = body ?? {}
  if (!file_name || !image_format || file_size == null) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: 'file_name, image_format, file_size는 필수입니다.',
          details: null,
        },
      },
      { status: 400 }
    )
  }
  if (!ALLOWED_FORMATS.includes(image_format.toLowerCase())) {
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
