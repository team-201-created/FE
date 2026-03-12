import { Suspense } from 'react'
import type { Metadata } from 'next'
import TestAdminContent from './_page/TestAdminContent'
import { TestTableServer } from './_components/TestTableServer'
import { AdminTableLoading } from '../_components'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '어드민 테스트 관리',
}

interface TestAdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TestAdminPage({
  searchParams,
}: TestAdminPageProps) {
  const params = await searchParams

  return (
    <Suspense fallback={<AdminTableLoading />}>
      <TestAdminContent>
        <TestTableServer searchParams={params} />
      </TestAdminContent>
    </Suspense>
  )
}
