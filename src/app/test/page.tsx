'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { Dropdown } from '@/components/common/Dropdown'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'

const SORT_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'name', label: '이름순' },
] as const

const sectionTitle =
  'text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2'
const card = 'rounded-xl border border-neutral-200 bg-white p-6 shadow-sm'

function TestPageContent() {
  const [openModal, setOpenModal] = useState(false)

  // Input 전용 상태
  const [inputValue, setInputValue] = useState('')

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortParam = searchParams.get('sort')
  const currentSort = SORT_OPTIONS.some((o) => o.value === sortParam)
    ? (sortParam as (typeof SORT_OPTIONS)[number]['value'])
    : 'recent'
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? '최신순'

  const [prevSort, setPrevSort] = useState(currentSort)
  if (currentSort !== prevSort) setPrevSort(currentSort)

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">
          UI 컴포넌트 테스트
        </h1>
        <p className="mb-10 text-neutral-600">
          공통 컴포넌트들의 통합 테스트 페이지입니다.
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* 인풋 섹션 추가 */}
          <section className={card}>
            <h2 className={sectionTitle}>5. 인풋 테스트</h2>
            <p className="mb-4 text-sm text-neutral-600">
              공통 인풋 컴포넌트 예시입니다.
            </p>
            <div className="flex flex-col gap-4">
              <Input
                label="기본"
                placeholder="이름을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="실명을 입력해 주세요."
              />
              <Input
                label="에러"
                status="error"
                defaultValue="testtest"
                helperText="올바른 이메일 형식이 아닙니다."
              />
              <Input
                label="성공"
                status="success"
                defaultValue="test@naver.com"
                helperText="올바른 이메일 형식이 아닙니다."
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestPageContent />
    </Suspense>
  )
}
