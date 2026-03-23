'use client'
import { useState } from 'react'
import type { AnswersState, QuizQuestion } from '../_types'

/** 퀴즈 단계·답변 상태 + 이전/다음/선택 토글 (단일·다중선택 규칙 적용) */

export type { AnswersState }

// 퀴즈 단계·답변 상태 + 이전/다음/선택 토글 (단일·다중선택 규칙 적용)
export function useQuizStep(questions: QuizQuestion[]) {
  const total = questions.length
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswersState>({})

  // 현재 질문 조회
  const question = questions[step]
  const selectedIds = answers[question?.id] ?? []

  // 다음 질문으로 이동 가능 여부 — 필수: 단일·다중 모두 1개 이상 선택
  const canGoNext = !question?.required || selectedIds.length >= 1
  const isFirst = step === 0
  const isLast = step === total - 1

  // 선택 토글 핸들러
  const handleToggle = (optionId: string) => {
    if (!question) return
    if (question.questionType === 'SINGLE') {
      setAnswers((prev) => ({ ...prev, [question.id]: [optionId] }))
      return
    }
    setAnswers((prev) => {
      const current = prev[question.id] ?? []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [question.id]: next }
    })
  }

  // 이전 질문으로 이동 핸들러
  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  // 다음 질문으로 이동 핸들러
  const handleNext = () => {
    if (isLast) return
    if (!canGoNext) return
    setStep((s) => s + 1)
  }

  return {
    question,
    currentNumber: step + 1,
    total,
    selectedIds,
    answers,
    canGoNext,
    isFirst,
    isLast,
    handleToggle,
    handlePrev,
    handleNext,
  }
}
