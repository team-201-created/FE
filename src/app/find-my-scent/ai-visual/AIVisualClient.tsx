'use client'

/** AI 비주얼 분석 페이지 — 모달로 진입 (dynamic ssr:false 로 클라이언트에서만 렌더) */
import { AIVisualModal } from '../_components/AIVisualModal'

export function AIVisualClient() {
  return <AIVisualModal isOpen onClose={() => window.history.back()} />
}
