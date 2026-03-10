'use client'
import { useState } from 'react'
import type { QuizQuestion } from '../_types'

/** 퀴즈 단계·답변 상태 + 이전/다음/선택 토글 (단일·다중선택 규칙 적용) */

// 답변 상태
export type AnswersState = Record<string, string[]>

// 퀴즈 단계·답변 상태 + 이전/다음/선택 토글 (단일·다중선택 규칙 적용)
export function useQuizStep(questions: QuizQuestion[]) {
  const total = questions.length
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswersState>({})
  const [showMinSelectionWarning, setShowMinSelectionWarning] = useState(false)

  // 현재 질문 조회
  const question = questions[step]
  const selectedIds = answers[question?.id] ?? []

  // 다중선택 규칙 적용
  const minSelections = question?.questionType === 'MULTI' ? 2 : 1

  // 다음 질문으로 이동 가능 여부
  const canGoNext = !question?.required || selectedIds.length >= minSelections
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

  // 다음 질문으로 이동 핸들러 (필수 아님 + 다중선택에서 1개만 선택 시 경고 모달 표시)
  const handleNext = () => {
    if (isLast) return
    const isMultiNotRequired =
      question?.questionType === 'MULTI' && !question?.required
    if (isMultiNotRequired && selectedIds.length === 1) {
      setShowMinSelectionWarning(true)
      return
    }
    if (!canGoNext) return
    setStep((s) => s + 1)
  }

  return {
    question,
    currentNumber: step + 1,
    total,
    selectedIds,
    canGoNext,
    isFirst,
    isLast,
    showMinSelectionWarning,
    closeMinSelectionWarning: () => setShowMinSelectionWarning(false),
    handleToggle,
    handlePrev,
    handleNext,
  }
}
