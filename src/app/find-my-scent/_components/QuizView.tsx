'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ProfilingType, QuizQuestion, TestType } from '../_types'
import type { ProductTypeChoice } from './ProductTypeSelectModal'
import { useQuizStep } from '../_hooks'
import { buildSubmitPayload, submitProfiling } from '../_api/profilingClient'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { TestQuizHeader } from './TestQuizHeader'
import { TestProgressBar } from './TestProgressBar'
import { TestQuestionCard } from './TestQuestionCard'
import { TestQuizFooter } from './TestQuizFooter'

const RESULT_PATH: Record<TestType, string> = {
  PREFERENCE: '/find-my-scent/taste-test/result',
  HEALTH: '/find-my-scent/wellness/result',
}

const styles = {
  wrap: 'min-h-screen bg-[var(--background-light-bg)] px-4 py-8',
  inner: 'mx-auto flex max-w-lg flex-col gap-8',
  emptyWrap: 'flex min-h-[50vh] items-center justify-center',
  emptyText: 'text-neutral-500',
} as const

// 퀴즈 본문
export function QuizView({
  testType,
  questions,
  pipelineSnapshotId,
  productType,
}: {
  testType: TestType
  questions: QuizQuestion[]
  /** 활성 폼 조회 응답의 pipeline_snapshot_id */
  pipelineSnapshotId: number
  /** 진입 전 모달에서 선택한 추천 유형 */
  productType: ProductTypeChoice
}) {
  const {
    question,
    currentNumber,
    total,
    selectedIds,
    answers,
    canGoNext,
    isFirst,
    isLast,
    handleToggle,
    handlePrev,
    handleNext,
  } = useQuizStep(questions)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<Error | null>(null)

  const handleNextOrSubmit = async () => {
    if (isLast) {
      if (isSubmitting) return
      setIsSubmitting(true)
      setSubmitError(null)
      try {
        const payload = buildSubmitPayload(
          questions,
          answers,
          pipelineSnapshotId,
          testType as ProfilingType,
          productType
        )
        const res = await submitProfiling(payload)
        if (!res.success || !res.data?.result_id) {
          setSubmitError(
            new Error(
              (res as { error?: { message?: string } }).error?.message ??
                '제출에 실패했습니다.'
            )
          )
          return
        }
        router.push(`${RESULT_PATH[testType]}?result_id=${res.data.result_id}`)
      } catch (err) {
        setSubmitError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setIsSubmitting(false)
      }
      return
    }
    handleNext()
  }

  if (!question) {
    return (
      <div className={styles.emptyWrap}>
        <p className={styles.emptyText}>질문이 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <TestQuizHeader testType={testType} />
          <TestProgressBar current={currentNumber} total={total} />
          <TestQuestionCard
            question={question}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
          <TestQuizFooter
            isFirst={isFirst}
            isLast={isLast}
            canGoNext={canGoNext}
            isSubmitting={isSubmitting}
            onPrev={handlePrev}
            onNext={handleNextOrSubmit}
          />
        </div>
      </div>

      {submitError && (
        <ErrorFeedbackModal
          message={submitError.message}
          isOpen
          onClose={() => setSubmitError(null)}
        />
      )}
    </>
  )
}
