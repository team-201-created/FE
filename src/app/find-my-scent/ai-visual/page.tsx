import type { Metadata } from 'next'
import { AIVisualClient } from './AIVisualClient'

export const metadata: Metadata = {
  title: 'AI 비주얼 분석',
  description:
    '인테리어·OOTD 사진을 올리면 AI가 분위기를 읽고 어울리는 향기를 찾아줍니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/find-my-scent/ai-visual`,
  },
}

export default function AIVisualPage() {
  return <AIVisualClient />
}
