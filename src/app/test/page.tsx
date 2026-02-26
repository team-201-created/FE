'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownItem,
  dropdownMenuDefault,
  dropdownMenuPositionLeft,
  dropdownItemDefault,
  dropdownItemHover,
} from '@/components/common/Dropdown'

const SORT_OPTIONS = [
  { value: 'recent', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'name', label: '이름순' },
] as const

const sectionTitle = 'text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2'
const card = 'rounded-xl border border-neutral-200 bg-white p-6 shadow-sm'
const triggerButton =
  'inline-flex items-center gap-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50'

// 제목+부제목용 스타일
const itemWithSubtitle = 'block w-full px-4 py-3 text-left group'
const itemTitle = 'text-sm font-bold text-neutral-900 group-hover:text-violet-700'
const itemSubtitle = 'mt-0.5 text-xs text-neutral-500 group-hover:text-violet-700'

export default function DropdownTestPage() {
  const [openBasic, setOpenBasic] = useState(false)
  const [openWithSubtitle, setOpenWithSubtitle] = useState(false)
  const [openWithCheck, setOpenWithCheck] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortParam = searchParams.get('sort')
  const currentSort = SORT_OPTIONS.some((o) => o.value === sortParam)
    ? (sortParam as (typeof SORT_OPTIONS)[number]['value'])
    : 'recent'
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label ?? '최신순'

  // 정렬 드롭다운: URL이 바뀌면(항목 선택 시) 드롭다운 닫기
  useEffect(() => {
    setOpenWithCheck(false)
  }, [currentSort])

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">드롭다운 스타일 테스트</h1>
        <p className="mb-10 text-neutral-600">
          공통 Dropdown 컴포넌트의 스타일 종류별 사용 예시입니다.
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* 1. 기본 스타일 (단순 링크, 왼쪽 정렬) */}
          <section className={card}>
            <h2 className={sectionTitle}>1. 기본 스타일</h2>
            <p className="mb-4 text-sm text-neutral-600">
              단순 텍스트 링크, 왼쪽 정렬. 구분선(dividerAbove) 사용.
            </p>
            <div className="relative inline-block">
              <button
                type="button"
                className={triggerButton}
                onClick={() => setOpenBasic((p) => !p)}
                aria-expanded={openBasic}
                aria-haspopup="true"
              >
                메뉴 열기
              </button>
              {openBasic && (
                <DropdownMenu
                  className={`${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[200px]`}
                >
                  <DropdownItem href="#" defaultClassName={dropdownItemDefault} hoverClassName={dropdownItemHover}>
                    전체 향
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    defaultClassName={dropdownItemDefault}
                    hoverClassName={dropdownItemHover}
                    dividerAbove
                  >
                    신규 향
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    defaultClassName={dropdownItemDefault}
                    hoverClassName={dropdownItemHover}
                    dividerAbove
                  >
                    인기 향
                  </DropdownItem>
                </DropdownMenu>
              )}
            </div>
          </section>

          {/* 2. 제목 + 부제목 스타일 */}
          <section className={card}>
            <h2 className={sectionTitle}>2. 제목 + 부제목</h2>
            <p className="mb-4 text-sm text-neutral-600">
              항목마다 제목과 부제목 두 줄. 넓은 패널 권장.
            </p>
            <div className="relative inline-block">
              <button
                type="button"
                className={triggerButton}
                onClick={() => setOpenWithSubtitle((p) => !p)}
                aria-expanded={openWithSubtitle}
                aria-haspopup="true"
              >
                나의 향기 찾기
              </button>
              {openWithSubtitle && (
                <DropdownMenu
                  className={`${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[280px]`}
                >
                  <DropdownItem
                    href="/find-my-scent/ai-visual"
                    defaultClassName={itemWithSubtitle}
                    hoverClassName={dropdownItemHover}
                  >
                    <span className={itemTitle}>AI 비주얼 추천</span>
                    <p className={itemSubtitle}>이미지로 나에게 맞는 향 찾기</p>
                  </DropdownItem>
                  <DropdownItem
                    href="/find-my-scent/quiz"
                    defaultClassName={itemWithSubtitle}
                    hoverClassName={dropdownItemHover}
                    dividerAbove
                  >
                    <span className={itemTitle}>퀴즈 기반 추천</span>
                    <p className={itemSubtitle}>몇 가지 질문으로 맞춤 향 추천</p>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </div>
          </section>

          {/* 3. 선택 항목 체크 표시 */}
          <section className={card}>
            <h2 className={sectionTitle}>3. 선택 항목 체크 표시</h2>
            <p className="mb-4 text-sm text-neutral-600">
              선택된 항목만 우측에 체크 표시. 항목 클릭 시 URL 반영 후 닫힘.
            </p>
            <div className="relative inline-block">
              <button
                type="button"
                className={triggerButton}
                onClick={() => setOpenWithCheck((p) => !p)}
                aria-expanded={openWithCheck}
                aria-haspopup="true"
              >
                정렬: {currentSortLabel}
              </button>
              {openWithCheck && (
                <DropdownMenu
                  className={`${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[180px]`}
                >
                  {SORT_OPTIONS.map((opt, index) => (
                    <DropdownItem
                      key={opt.value}
                      href={`${pathname}?sort=${opt.value}`}
                      dividerAbove={index > 0}
                      selected={currentSort === opt.value}
                    >
                      {opt.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
