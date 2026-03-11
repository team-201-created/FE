/** AI 비주얼 분석 — 모달 UI로 진입 (클라이언트 전용) */
import dynamic from 'next/dynamic'

const AIVisualClient = dynamic(
  () => import('./AIVisualClient').then((m) => m.AIVisualClient),
  { ssr: false }
)

export default function AIVisualPage() {
  return <AIVisualClient />
}
