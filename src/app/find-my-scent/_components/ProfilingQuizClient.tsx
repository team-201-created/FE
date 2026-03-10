'use client'

/** 서버에서 받은 질문으로 퀴즈만 렌더 (로딩/에러는 서버·loading/error에서 처리) */
import type { QuizQuestion, TestType } from '../_types'
import { QuizView } from './QuizView'

type ProfilingQuizClientProps = {
  testType: TestType
  initialQuestions: QuizQuestion[]
}

export function ProfilingQuizClient({
  testType,
  initialQuestions,
}: ProfilingQuizClientProps) {
  return <QuizView testType={testType} questions={initialQuestions} />
}
