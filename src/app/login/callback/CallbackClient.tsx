'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { loginWithKakaoAction } from '@/lib/auth/sessionActions'
import { useAuthStore } from '@/store/useAuthStore'

export default function CallbackClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login } = useAuthStore()
  const hasHandled = useRef(false)

  useEffect(() => {
    if (hasHandled.current) return
    hasHandled.current = true

    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const handleLogin = async () => {
      if (!code) {
        alert('인증 코드가 없습니다. 다시 시도해 주세요.')
        router.replace('/login')
        return
      }

      try {
        // 토큰은 httpOnly 쿠키에 저장, user 정보만 반환
        const result = await loginWithKakaoAction(code, state)

        if (result.success) {
          // user 정보는 UI 표시용으로 localStorage에 저장
          localStorage.setItem('user', JSON.stringify(result.user))
          login(result.user)

          alert(`${result.user.nickname}님, 환영합니다!`)
          router.replace('/')
        } else {
          throw new Error(result.error)
        }
      } catch (error: any) {
        alert(error.message || '로그인 처리 중 오류가 발생했습니다.')
        router.replace('/login')
      }
    }

    handleLogin()
  }, [searchParams, router, login])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <LoadingSpinner />
      <p>로그인 처리 중입니다. 잠시만 기다려주세요...</p>
    </div>
  )
}
