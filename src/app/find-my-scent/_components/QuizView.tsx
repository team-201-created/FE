'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
/** 퀴즈 본문: 헤더·진행바·질문카드·이전/다음 푸터 (useQuizStep 사용) */
import type { QuizQuestion, TestType } from '../_types'
import { useQuizStep } from '../_hooks'

const RESULT_PATH: Record<TestType, string> = {
  PREFERENCE: '/find-my-scent/taste-test/result',
  HEALTH: '/find-my-scent/wellness/result',
}
import { AlertModal } from '@/components/common/Modal/AlertModal'
import { ModalPortal } from '@/components/common/Modal/ModalPortal'
import { TestQuizHeader } from './TestQuizHeader'
import { TestProgressBar } from './TestProgressBar'
import { TestQuestionCard } from './TestQuestionCard'
import { TestQuizFooter } from './TestQuizFooter'

const MIN_SELECTION_WARNING_MESSAGE =
  '다중선택 문제유형은 지문을 최소 2개이상 선택해야 합니다'
const WARNING_AUTO_CLOSE_MS = 3000

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
}: {
  testType: TestType
  questions: QuizQuestion[]
}) {
  const {
    question,
    currentNumber,
    total,
    selectedIds,
    canGoNext,
    isFirst,
    isLast,
    showMinSelectionWarning,
    closeMinSelectionWarning,
    handleToggle,
    handlePrev,
    handleNext,
  } = useQuizStep(questions)
  const router = useRouter()

  const handleNextOrSubmit = () => {
    if (isLast) {
      router.push(RESULT_PATH[testType])
      return
    }
    handleNext()
  }

  // 다중선택 최소 개수 경고 모달 3초 후 자동 닫기
  useEffect(() => {
    if (!showMinSelectionWarning) return
    const timer = setTimeout(closeMinSelectionWarning, WARNING_AUTO_CLOSE_MS)
    return () => clearTimeout(timer)
  }, [showMinSelectionWarning, closeMinSelectionWarning])

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
            onPrev={handlePrev}
            onNext={handleNextOrSubmit}
          />
        </div>
      </div>

      {showMinSelectionWarning && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
            onClick={closeMinSelectionWarning}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AlertModal
                isOpen
                onClose={closeMinSelectionWarning}
                type="danger"
                title="경고"
                content={MIN_SELECTION_WARNING_MESSAGE}
                showButtons={false}
              />
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  )
}
