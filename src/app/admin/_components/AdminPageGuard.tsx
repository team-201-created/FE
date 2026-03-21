'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface AdminPageGuardProps {
  currentPage: number
}

/**
 * 현재 페이지에 데이터가 없고 page > 1 일 때 이전 페이지로 이동시키는 컴포넌트.
 * RSC 내 redirect()는 ErrorBoundary에 잡힐 수 있어 클라이언트 라우팅으로 처리.
 */
export function AdminPageGuard({ currentPage }: AdminPageGuardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(currentPage - 1))
    router.replace(`${pathname}?${params.toString()}`)
  }, [])

  return null
}
