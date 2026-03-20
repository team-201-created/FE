'use client'

/** 취향/건강 테스트 공통 페이지 — 진입 전 제품 유형(향수/디퓨저) 선택 후 퀴즈 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageCenter } from '@/components/common/PageCenter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { ProductTypeSelectModal } from './ProductTypeSelectModal'
import type { ProductTypeChoice } from './ProductTypeSelectModal'
import { QuizView } from './QuizView'
import { useProfilingForm } from '../_hooks/useProfilingForm'
import { useErrorPopup } from '../_hooks/useErrorPopup'
import type { TestType } from '../_types'

const styles = {
  emptyText: 'text-neutral-500',
  retryBtn:
    'mt-4 rounded-xl bg-[var(--color-black-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90',
} as const

export function ProfilingTestPage({ testType }: { testType: TestType }) {
  const router = useRouter()
  const { questions, pipelineSnapshotId, isLoading, error, refetch } =
    useProfilingForm(testType)
  const [productType, setProductType] = useState<ProductTypeChoice | null>(null)
  const { isOpen: showErrorPopup, close: closeErrorPopup } =
    useErrorPopup(error)

  if (error) {
    return (
      <>
        <PageCenter>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-neutral-500">질문을 불러오지 못했어요.</p>
            <button
              type="button"
              onClick={refetch}
              className={styles.retryBtn}
              aria-label="테스트 다시 하기"
            >
              테스트 다시 하기
            </button>
          </div>
        </PageCenter>
        <ErrorFeedbackModal
          message={error.message}
          isOpen={showErrorPopup}
          onClose={closeErrorPopup}
        />
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
    <>
      <ProductTypeSelectModal
        isOpen={productType === null}
        onSelect={setProductType}
        onClose={() => router.back()}
      />
      {productType != null && (
        <QuizView
          testType={testType}
          questions={questions}
          pipelineSnapshotId={pipelineSnapshotId}
          productType={productType}
        />
      )}
    </>
  )
}
