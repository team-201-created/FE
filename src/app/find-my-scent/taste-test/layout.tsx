import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '취향 테스트',
  description:
    '생활 방식과 취향을 분석해 나의 일상에 꼭 맞는 향기를 추천합니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/find-my-scent/taste-test`,
  },
}

export default function TasteTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
