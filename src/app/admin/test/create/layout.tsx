import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '어드민 테스트 생성',
}

export default function TestCreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
