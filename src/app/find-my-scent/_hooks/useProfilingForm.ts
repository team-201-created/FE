'use client'

/** 취향/건강 테스트용 활성 폼 조회 (로딩·에러·questions·refetch) */
import { useEffect, useRef, useState } from 'react'
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
  const loadRef = useRef<() => void | Promise<void>>(() => {})

  useEffect(() => {
    let cancelled = false
    loadRef.current = async () => {
      setError(null)
      setQuestions([])
      setIsLoading(true)
      try {
        const res = await fetchProfilingFormActive(profilingType)
        if (cancelled) return
        setQuestions(toQuizQuestions(res.data))
      } catch (err) {
        if (!cancelled)
          setError(err instanceof FetchError ? err : new Error(String(err)))
        if (!cancelled) setQuestions([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    loadRef.current()
    return () => {
      cancelled = true
    }
  }, [profilingType])

  return {
    questions,
    isLoading,
    error,
    refetch: () => loadRef.current?.(),
  }
}
