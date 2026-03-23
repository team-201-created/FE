'use client'

/** AI 비주얼 분석 페이지 — 모달로 진입 (클라이언트 마운트 후 렌더로 hydration 회피) */
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PageCenter } from '@/components/common/PageCenter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useAuthStore } from '@/store/useAuthStore'
import { submitAiVisualAnalyze } from '../_api/aiVisualClient'
import { AIVisualModal } from '../_components/AIVisualModal'
import { LoginRequiredTestModal } from '../_components/LoginRequiredTestModal'

const loginHintBtn =
  'mt-4 rounded-xl bg-[var(--color-black-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90'

export function AIVisualClient() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { isLoggedIn, isInitialized } = useAuthStore()

  useEffect(() => {
    // 클라이언트에서만 모달 렌더하여 SSR/hydration 불일치 방지
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional for client-only mount
    setMounted(true)
  }, [])

  const handleAnalyze = async (
    photoType: 'INTERIOR' | 'OOTD',
    imageUrl: string
  ) => {
    const resultId = await submitAiVisualAnalyze(
      imageUrl,
      photoType,
      'DIFFUSER'
    )
    router.push(`/find-my-scent/ai-visual/result?result_id=${resultId}`)
  }

  if (!mounted) return null

  if (!isInitialized) {
    return (
      <PageCenter>
        <LoadingSpinner />
      </PageCenter>
    )
  }

  /** 비로그인: 사진/타입 선택 모달보다 먼저 경고 (3초 후 /login) */
  if (isLoggedIn === false) {
    return (
      <>
        <PageCenter>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-neutral-500">로그인 후 이용할 수 있어요.</p>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className={loginHintBtn}
              aria-label="로그인하기"
            >
              로그인하기
            </button>
          </div>
        </PageCenter>
        <LoginRequiredTestModal isOpen onClose={() => router.push('/login')} />
      </>
    )
  }

  return (
    <AIVisualModal
      isOpen
      onClose={() => window.history.back()}
      onAnalyze={handleAnalyze}
    />
  )
}
