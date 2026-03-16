import { Suspense } from 'react'
import CallbackClient from './CallbackClient'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <LoadingSpinner />
          <p>로그인 페이지를 준비 중입니다...</p>
        </div>
      }
    >
      <CallbackClient />
    </Suspense>
  )
}
