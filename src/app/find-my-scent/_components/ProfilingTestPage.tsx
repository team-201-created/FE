'use client'

/** 취향/건강 테스트 공통 페이지 */
import { PageCenter } from '@/components/common/PageCenter'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { QuizView } from './QuizView'
import { useProfilingForm } from '../_hooks/useProfilingForm'
import { useErrorPopup } from '../_hooks/useErrorPopup'
import type { TestType } from '../_types'

const styles = {
  loadingText: 'text-neutral-500',
  emptyText: 'text-neutral-500',
} as const

export function ProfilingTestPage({ testType }: { testType: TestType }) {
  const { questions, isLoading, error } = useProfilingForm(testType)
  const { isOpen: showErrorPopup, close: closeErrorPopup } =
    useErrorPopup(error)

  if (isLoading) {
    return (
      <PageCenter>
        <p className={styles.loadingText}>질문을 불러오는 중...</p>
      </PageCenter>
    )
  }

  if (error) {
    return (
      <>
        <PageCenter>
          <p className="text-neutral-500">질문을 불러오지 못했어요.</p>
        </PageCenter>
        <ErrorFeedbackModal
          message={error.message}
          isOpen={showErrorPopup}
          onClose={closeErrorPopup}
        />
      </>
    )
  }

  if (questions.length === 0) {
    return (
      <PageCenter>
        <p className={styles.emptyText}>진행 중인 테스트가 없어요.</p>
      </PageCenter>
    )
  }

  return <QuizView testType={testType} questions={questions} />
}
