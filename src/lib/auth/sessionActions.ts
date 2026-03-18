'use server'

import { cookies } from 'next/headers'
import { postSocialCallback, postLogout } from '@/lib/api/auth'
import type { User } from '@/types'

type LoginResult =
  | { success: true; user: User }
  | { success: false; error: string }

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  maxAge: 3600,
  sameSite: 'lax' as const,
  path: '/',
}

const REFRESH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 259200,
}

/**
 * 소셜 로그인 콜백 처리 Server Action
 * - 백엔드에서 토큰 발급
 * - access_token, refresh_token을 httpOnly 쿠키에 저장
 * - user 정보를 반환 (클라이언트에서 localStorage에 저장)
 */
export async function loginWithKakaoAction(
  code: string,
  state: string | null
): Promise<LoginResult> {
  try {
    const siteUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_SITE_URL
        : 'http://localhost:3000'
    const redirectUri = `${siteUrl}/login/callback`
    const data = await postSocialCallback('kakao', code, state, redirectUri)

    if (!data.success) {
      throw new Error(data.error?.message || '로그인에 실패했습니다.')
    }

    const { access_token, refresh_token, user } = data.data
    const cookieStore = await cookies()

    cookieStore.set('access_token', access_token, BASE_COOKIE_OPTIONS)
    cookieStore.set('refresh_token', refresh_token, REFRESH_COOKIE_OPTIONS)
    return { success: true, user }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || '로그인 처리 중 오류가 발생했습니다.',
    }
  }
}

/**
 * 로그아웃 Server Action
 * - 백엔드 로그아웃 API 호출
 * - httpOnly 쿠키 삭제
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  try {
    await postLogout()
  } catch {
    // 백엔드 로그아웃 실패해도 쿠키는 반드시 삭제
  }

  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
}
