'use client'

/** 취향/건강 테스트용 활성 폼 질문 목록 조회 (로딩·에러·questions 반환) */
import { useEffect, useState } from 'react'
import { FetchError } from '@/lib/api'
import {
  fetchProfilingFormActive,
  toQuizQuestions,
} from '../_api/profilingClient'
import type { ProfilingType, QuizQuestion } from '../_types'

export function useProfilingForm(profilingType: ProfilingType) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetchProfilingFormActive(profilingType)
        if (cancelled) return
        setQuestions(toQuizQuestions(res.data))
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof FetchError ? err : new Error(String(err)))
        setQuestions([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [profilingType])

  return { questions, isLoading, error }
}
