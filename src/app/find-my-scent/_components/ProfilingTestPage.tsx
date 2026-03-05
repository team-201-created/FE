'use client'

import { QuizView } from './QuizView'
import { useProfilingForm } from '../_hooks/useProfilingForm'
import type { TestType } from './TestQuizHeader'

const styles = {
  wrap: 'flex min-h-screen items-center justify-center bg-[var(--background-light-bg)]',
  loadingText: 'text-neutral-500',
  errorText: 'text-red-500',
  emptyText: 'text-neutral-500',
} as const

type ProfilingTestPageProps = {
  testType: TestType
}

export function ProfilingTestPage({ testType }: ProfilingTestPageProps) {
  const { questions, isLoading, error } = useProfilingForm(testType)

  if (isLoading) {
    return (
      <div className={styles.wrap}>
        <p className={styles.loadingText}>질문을 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.wrap}>
        <p className={styles.errorText}>
          질문을 불러오지 못했어요. ({error.message})
        </p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className={styles.wrap}>
        <p className={styles.emptyText}>진행 중인 테스트가 없어요.</p>
      </div>
    )
  }

  return <QuizView testType={testType} questions={questions} />
}
