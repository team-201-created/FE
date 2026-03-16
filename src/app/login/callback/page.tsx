'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { postSocialCallback } from '@/lib/api/auth'
import { useAuthStore } from '@/store/useAuthStore'

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login } = useAuthStore()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state') // 백엔드에서 state 검증을 요구할 경우를 대비해 함께 전달

    const handleLogin = async () => {
      if (!code) {
        alert('인증 코드가 없습니다. 다시 시도해 주세요.')
        router.replace('/login')
        return
      }

      try {
        const data = await postSocialCallback('kakao', code, state)

        if (data.success) {
          const { access_token, refresh_token, user } = data.data
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('refreshToken', refresh_token)
          localStorage.setItem('user', JSON.stringify(user))
          login(user)

          alert(`${user.nickname}님, 환영합니다!`)
          router.replace('/')
        } else {
          throw new Error(data.error?.message || '로그인에 실패했습니다.')
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
