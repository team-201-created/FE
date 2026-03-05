'use client'

import { useEffect, useState } from 'react'
import {
  fetchProfilingFormActive,
  toQuizQuestions,
  type QuizQuestion,
  type ProfilingType,
} from '@/lib/api/profilingClient'

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
        setError(err instanceof Error ? err : new Error(String(err)))
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
