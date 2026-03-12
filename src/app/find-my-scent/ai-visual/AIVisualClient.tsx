'use client'

/** AI 비주얼 분석 페이지 — 모달로 진입 (클라이언트 마운트 후 렌더로 hydration 회피) */
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { submitAiVisualAnalysis } from '../_api/aiVisualClient'
import { AIVisualModal } from '../_components/AIVisualModal'

export function AIVisualClient() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // 클라이언트에서만 모달 렌더하여 SSR/hydration 불일치 방지
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional for client-only mount
    setMounted(true)
  }, [])

  const handleAnalyze = async (photoType: 'INTERIOR' | 'OOTD', file: File) => {
    const resultId = await submitAiVisualAnalysis(photoType, file)
    router.push(`/find-my-scent/ai-visual/result?result_id=${resultId}`)
  }

  if (!mounted) return null

  return (
    <AIVisualModal
      isOpen
      onClose={() => window.history.back()}
      onAnalyze={handleAnalyze}
    />
  )
}
