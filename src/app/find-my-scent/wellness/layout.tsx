import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '웰니스 케어 진단',
  description:
    '현재 컨디션과 건강 상태를 체크해 심신 안정에 도움이 되는 아로마를 제안합니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/find-my-scent/wellness`,
  },
}

export default function WellnessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
