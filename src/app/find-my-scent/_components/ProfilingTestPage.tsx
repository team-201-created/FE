'use client'

/** 취향/건강 테스트 공통 페이지 — 진입 전 제품 유형(향수/디퓨저) 선택 후 활성 폼 조회·퀴즈 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageCenter } from '@/components/common/PageCenter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { LoginRequiredTestModal } from './LoginRequiredTestModal'
import { ProductTypeSelectModal } from './ProductTypeSelectModal'
import type { ProductTypeChoice, TestType } from '../_types'
import { QuizView } from './QuizView'
import { useProfilingForm } from '../_hooks/useProfilingForm'
import { useErrorPopup } from '../_hooks/useErrorPopup'
import { isLoginRequiredFetchError } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'

const styles = {
  emptyText: 'text-neutral-500',
  retryBtn:
    'mt-4 rounded-xl bg-[var(--color-black-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90',
} as const

export function ProfilingTestPage({ testType }: { testType: TestType }) {
  const router = useRouter()
  const { isLoggedIn, isInitialized } = useAuthStore()
  const [productType, setProductType] = useState<ProductTypeChoice | null>(null)
  const { questions, pipelineSnapshotId, isLoading, error, refetch } =
    useProfilingForm(testType, productType)
  const { isOpen: showErrorPopup, close: closeErrorPopup } =
    useErrorPopup(error)

  if (productType === null) {
    return (
      <>
        <PageCenter>
          <p className="text-center text-sm text-neutral-500">
            추천 받을 제품 유형을 선택해 주세요.
          </p>
        </PageCenter>
        <ProductTypeSelectModal
          isOpen
          onSelect={setProductType}
          onClose={() => router.back()}
        />
      </>
    )
  }

  if (isInitialized && isLoggedIn === false) {
    return (
      <>
        <PageCenter>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-neutral-500">로그인 후 이용할 수 있어요.</p>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className={styles.retryBtn}
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

  if (error) {
    const needLogin = isLoginRequiredFetchError(error)
    return (
      <>
        <PageCenter>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-neutral-500">
              {needLogin
                ? '로그인 후 이용할 수 있어요.'
                : '질문을 불러오지 못했어요.'}
            </p>
            <button
              type="button"
              onClick={() => (needLogin ? router.push('/login') : refetch())}
              className={styles.retryBtn}
              aria-label={needLogin ? '로그인하기' : '테스트 다시 하기'}
            >
              {needLogin ? '로그인하기' : '테스트 다시 하기'}
            </button>
          </div>
        </PageCenter>
        {needLogin ? (
          <LoginRequiredTestModal
            isOpen={showErrorPopup}
            onClose={closeErrorPopup}
          />
        ) : (
          <ErrorFeedbackModal
            message={error.message}
            isOpen={showErrorPopup}
            onClose={closeErrorPopup}
          />
        )}
      </>
    )
  }

  if (isLoading) {
    return (
      <PageCenter>
        <LoadingSpinner />
      </PageCenter>
    )
  }

  if (questions.length === 0 || pipelineSnapshotId == null) {
    return (
      <PageCenter>
        <p className={styles.emptyText}>진행 중인 테스트가 없어요.</p>
      </PageCenter>
    )
  }

  return (
    <QuizView
      testType={testType}
      questions={questions}
      pipelineSnapshotId={pipelineSnapshotId}
      productType={productType}
    />
  )
}
