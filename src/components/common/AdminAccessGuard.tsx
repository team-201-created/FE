'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

/**
 * `/admin` 트리 — 내 정보의 is_admin 여부로 접근 제한(URL 직접 접근 포함)
 */
export function AdminAccessGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isLoggedIn, user, userProfileLoaded } = useAuthStore()

  useEffect(() => {
    if (!userProfileLoaded) return
    if (!isLoggedIn) {
      router.replace('/login')
      return
    }
    if (user?.is_admin !== true) {
      router.replace('/')
    }
  }, [isLoggedIn, user?.is_admin, userProfileLoaded, router])

  if (!userProfileLoaded || !isLoggedIn || user?.is_admin !== true) {
    return (
      <div
        className="text-muted-foreground flex min-h-[40vh] items-center justify-center text-sm"
        role="status"
        aria-live="polite"
      >
        권한 확인 중…
      </div>
    )
  }

  return children
}
