'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'

/**
 * `/admin` 트리 — 내 정보의 is_admin 여부로 접근 제한(URL 직접 접근 포함)
 */
export function AdminAccessGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isLoggedIn, user, userProfileLoaded } = useAuthStore()
  const { openAlert, closeModal } = useModalStore()
  const hasShownInvalidAccessAlertRef = useRef(false)

  useEffect(() => {
    if (!userProfileLoaded) return
    if (!isLoggedIn) {
      router.replace('/login')
      return
    }
    if (user?.is_admin !== true) {
      if (!hasShownInvalidAccessAlertRef.current) {
        hasShownInvalidAccessAlertRef.current = true
        openAlert({
          type: 'danger',
          title: '잘못된 접근입니다.',
          content: '관리자만 접근할 수 있는 페이지입니다.',
          confirmText: '확인',
          onConfirm: () => {
            closeModal()
            router.replace('/')
          },
          onCancel: () => {
            closeModal()
            router.replace('/')
          },
        })
      }
    }
  }, [
    isLoggedIn,
    user?.is_admin,
    userProfileLoaded,
    router,
    openAlert,
    closeModal,
  ])

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
