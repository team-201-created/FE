'use client'

import { useState, useEffect, startTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from '@/hooks'

/**
 * 검색어와 URL 쿼리 파라미터(q)를 동기화하는 훅
 * @param delay 디바운스 지연 시간 (기본값: 300ms)
 */
export function useAdminSearch(delay = 300) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const debouncedSearchTerm = useDebounce(searchTerm, delay)

  // URL의 q 파라미터가 외부에서 변경되면(예: 탭 전환) 로컬 상태를 즉시 동기화합니다.
  useEffect(() => {
    const currentParamQ = searchParams.get('q') || ''
    if (currentParamQ !== searchTerm) {
      startTransition(() => {
        setSearchTerm(currentParamQ)
      })
    }
  }, [searchParams, searchTerm])

  useEffect(() => {
    const currentQ = searchParams.get('q') || ''

    // 디바운스된 값이 현재 URL과 다르고,
    // 현재 입력 중인 값(searchTerm)과 디바운스된 값이 일치할 때만(즉, 디바운스가 완료되었을 때만)
    // URL을 업데이트합니다. 이 조건이 탭 전환 시 이전 값이 URL을 덮어쓰는 것을 방지합니다.
    if (
      debouncedSearchTerm !== currentQ &&
      debouncedSearchTerm === searchTerm
    ) {
      const params = new URLSearchParams(searchParams.toString())

      if (debouncedSearchTerm) {
        params.set('q', debouncedSearchTerm)
      } else {
        params.delete('q')
      }

      if (params.has('page')) {
        params.delete('page')
      }

      router.push(`${pathname}?${params.toString()}`)
    }
  }, [debouncedSearchTerm, pathname, router, searchParams, searchTerm])

  return {
    searchTerm,
    setSearchTerm,
  }
}
