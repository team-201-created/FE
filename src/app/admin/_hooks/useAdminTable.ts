'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition as reactStartTransition,
  useTransition,
} from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from '@/hooks'

interface UseAdminTableOptions {
  searchDelay?: number
  resetParamsOnTabChange?: string[]
}

interface UpdateUrlOptions {
  replace?: boolean
  scroll?: boolean
}

/**
 * 어드민 테이블의 검색, 필터, 탭 전환 로직을 통합 관리하는 훅
 */
export function useAdminTable({
  searchDelay = 300,
  resetParamsOnTabChange = [],
}: UseAdminTableOptions = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // 최신 searchParams를 참조하도록 ref로 유지
  const paramsRef = useRef(searchParams)
  useEffect(() => {
    paramsRef.current = searchParams
  }, [searchParams])

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '')
  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay)

  // URL → 로컬: 외부(탭 전환 등)에서 URL이 바뀌면 input을 동기화
  const currentUrlQ = searchParams.get('q') ?? ''
  useEffect(() => {
    if (currentUrlQ !== searchTerm) {
      reactStartTransition(() => {
        setSearchTerm(currentUrlQ)
      })
    }
  }, [currentUrlQ])

  const updateUrl = useCallback(
    (
      updates: Record<string, string | null>,
      { replace = false, scroll = true }: UpdateUrlOptions = {}
    ) => {
      const params = new URLSearchParams(paramsRef.current.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === 'all') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }

      const qs = params.toString()
      const url = `${pathname}${qs ? `?${qs}` : ''}`

      startTransition(() => {
        if (replace) {
          router.replace(url, { scroll })
        } else {
          router.push(url, { scroll })
        }
      })
    },
    [pathname, router]
  )

  // 로컬 → URL: 디바운스가 완료된 검색어를 URL에 반영
  useEffect(() => {
    const urlQ = paramsRef.current.get('q') ?? ''
    if (debouncedSearchTerm !== urlQ && debouncedSearchTerm === searchTerm) {
      updateUrl({ q: debouncedSearchTerm || null, page: null })
    }
  }, [debouncedSearchTerm, searchTerm, updateUrl])

  /** 필터 파라미터 변경 (예: status, profiling_type 등) */
  const onFilterChange = useCallback(
    (key: string, value: string) => {
      updateUrl({ [key]: value, page: null })
    },
    [updateUrl]
  )

  /** 탭 전환 +  검색어·필터를 초기화하고 tab 파라미터 업데이트 */
  const onTabChange = useCallback(
    (tabId: string) => {
      const resets = Object.fromEntries(
        resetParamsOnTabChange.map((key) => [key, null])
      )
      // 검색 input을 즉시 빈 문자열로 리셋
      reactStartTransition(() => {
        setSearchTerm('')
      })
      updateUrl(
        { tab: tabId, q: null, page: null, ...resets },
        { replace: true, scroll: false }
      )
    },
    [updateUrl, resetParamsOnTabChange]
  )

  const resetParams = useCallback(
    (keys: string[]) => {
      const resets = Object.fromEntries(keys.map((k) => [k, null]))
      updateUrl({ ...resets, page: null })
    },
    [updateUrl]
  )

  return {
    searchTerm,
    setSearchTerm,
    onFilterChange,
    onTabChange,
    resetParams,
    searchParams,
    isPending,
  }
}
