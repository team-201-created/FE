'use client'

import { useState } from 'react'
import { TestQuizHeader, type TestType } from './TestQuizHeader'
import { TestProgressBar } from './TestProgressBar'
import { TestQuestionCard } from './TestQuestionCard'
import { TestQuizFooter } from './TestQuizFooter'

/* 더미 타입 : 목데이터 연동 시 수정 예정 */
type QuestionOption = { id: string; text: string }
type QuestionType = 'SINGLE' | 'MULTI'
type Question = {
  id: string
  text: string
  required: boolean
  questionType: QuestionType
  options: QuestionOption[]
}
type AnswersState = Record<string, string[]>
type QuizViewProps = {
  testType: TestType
  questions: Question[]
}

const styles = {
  wrap: 'min-h-screen bg-[var(--background-light-bg)] px-4 py-8',
  inner: 'mx-auto flex max-w-lg flex-col gap-8',
  emptyWrap: 'flex min-h-[50vh] items-center justify-center',
  emptyText: 'text-neutral-500',
} as const

//
export function QuizView({ testType, questions }: QuizViewProps) {
  const total = questions.length
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswersState>({})

  // 현재 질문
  const question = questions[step]
  // 현재 질문 번호
  const currentNumber = step + 1
  // 현재 선택된 옵션 ID 배열
  const selectedIds = answers[question?.id] ?? []

  // 옵션 선택
  const handleToggle = (optionId: string) => {
    // 질문이 없을 때
    if (!question) return
    // 단일선택 질문일 때
    if (question.questionType === 'SINGLE') {
      setAnswers((prev) => ({ ...prev, [question.id]: [optionId] }))
      return
    }
    // 다중선택 질문일 때
    setAnswers((prev) => {
      const current = prev[question.id] ?? []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [question.id]: next }
    })
  }

  // 다음 질문으로 이동 가능 여부
  const canGoNext = !question?.required || selectedIds.length > 0
  // 첫 질문인지 여부
  const isFirst = step === 0
  // 마지막 질문인지 여부
  const isLast = step === total - 1

  // 이전 질문으로 이동
  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  // 다음 질문으로 이동
  const handleNext = () => {
    // 다음 질문으로 이동 가능하지 않을 때
    if (!canGoNext) return
    // 마지막 질문일 때 이동 불가( 나중에 결과 페이지로 이동 예정 )
    if (isLast) return
    // 다음 질문으로 이동
    setStep((s) => s + 1)
  }

  // 질문이 없을 때
  if (!question) {
    return (
      <div className={styles.emptyWrap}>
        <p className={styles.emptyText}>질문이 없습니다.</p>
      </div>
    )
  }

  return (
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
          onNext={handleNext}
        />
      </div>
    </div>
  )
}
