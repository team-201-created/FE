'use client'

/** 취향/건강 테스트용 활성 폼 조회 (로딩·에러·questions·refetch) */
import { useEffect, useRef, useState } from 'react'
import { FetchError } from '@/lib/api'
import {
  fetchProfilingFormActive,
  toQuizQuestions,
} from '../_api/profilingClient'
import type { ProductTypeChoice, ProfilingType, QuizQuestion } from '../_types'

export function useProfilingForm(
  profilingType: ProfilingType,
  productType: ProductTypeChoice | null
) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [pipelineSnapshotId, setPipelineSnapshotId] = useState<number | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const loadRef = useRef<() => void | Promise<void>>(() => {})

  useEffect(() => {
    if (productType == null) {
      setQuestions([])
      setPipelineSnapshotId(null)
      setError(null)
      setIsLoading(false)
      loadRef.current = async () => {}
      return
    }

    let cancelled = false
    loadRef.current = async () => {
      setError(null)
      setQuestions([])
      setPipelineSnapshotId(null)
      setIsLoading(true)
      try {
        const res = await fetchProfilingFormActive(profilingType, productType)
        if (cancelled) return
        setQuestions(toQuizQuestions(res.data))
        setPipelineSnapshotId(res.data.pipeline_snapshot_id)
      } catch (err) {
        if (!cancelled)
          setError(err instanceof FetchError ? err : new Error(String(err)))
        if (!cancelled) setQuestions([])
        if (!cancelled) setPipelineSnapshotId(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    loadRef.current()
    return () => {
      cancelled = true
    }
  }, [profilingType, productType])

  return {
    questions,
    pipelineSnapshotId,
    isLoading,
    error,
    refetch: () => loadRef.current?.(),
  }
}
