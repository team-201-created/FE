'use client'

import { PageCenter } from '@/components/common/PageCenter'
import { QuizView } from './QuizView'
import { useProfilingForm } from '../_hooks/useProfilingForm'
import type { TestType } from './TestQuizHeader'

const styles = {
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
      <PageCenter>
        <p className={styles.loadingText}>질문을 불러오는 중...</p>
      </PageCenter>
    )
  }

  if (error) {
    return (
      <PageCenter>
        <p className={styles.errorText}>
          질문을 불러오지 못했어요. ({error.message})
        </p>
      </PageCenter>
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
