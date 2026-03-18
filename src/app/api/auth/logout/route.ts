import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      data: null,
    })

    // 쿠키를 삭제하여 로그아웃 처리
    response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
    response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })

    return response
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: 'LOGOUT_FAILED',
          message: 'An error occurred during logout.',
        },
      },
      { status: 500 }
    )
  }
}
