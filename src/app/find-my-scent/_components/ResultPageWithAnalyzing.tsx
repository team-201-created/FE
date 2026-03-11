'use client'

/** 결과 페이지: 분석 중 UI 표시 후 결과 콘텐츠 표시 */
import { useState, useEffect } from 'react'
import type { ComponentProps } from 'react'
import { AnalyzingUI } from '@/components/common/AnalyzingUI'
import { TestResultPage } from './TestResultPage'
import type { ResultPageType } from '../_types'

const DEFAULT_ANALYZING_MS = 3000

type ResultPageWithAnalyzingProps = {
  resultType: ResultPageType
  /** 컨텐츠 박스 props (API 결과 또는 목데이터) */
  contentBoxProps: Omit<
    ComponentProps<typeof TestResultPage>,
    'resultType'
  >['contentBoxProps']
  analyzingDurationMs?: number
}

export function ResultPageWithAnalyzing({
  resultType,
  contentBoxProps,
  analyzingDurationMs = DEFAULT_ANALYZING_MS,
}: ResultPageWithAnalyzingProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), analyzingDurationMs)
    return () => clearTimeout(timer)
  }, [analyzingDurationMs])

  if (isAnalyzing) {
    return <AnalyzingUI />
  }

  return (
    <TestResultPage resultType={resultType} contentBoxProps={contentBoxProps} />
  )
}
