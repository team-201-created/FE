'use client'

import React from 'react'
import Link from 'next/link'

// Dropdown 공통 컴포넌트

// 스타일: 디폴트(기본) vs 호버 시 구분
const style = {
  default: {
    border: 'border-neutral-200',
    panelBg: 'bg-white',
    itemText: 'text-neutral-700',
  },
  hover: {
    bg: 'hover:bg-violet-100',
    text: 'hover:text-violet-700',
  },
} as const

// 기본 스타일
export const dropdownMenuDefault = `rounded-lg border ${style.default.border} ${style.default.panelBg} py-2 shadow-lg`
export const dropdownMenuPositionLeft = 'absolute left-0 top-full mt-0.5'
export const dropdownMenuPositionRight = 'absolute right-0 top-full mt-2'
// 디폴트 스타일
export const dropdownItemDefault = `block w-full px-4 py-3 text-left text-sm ${style.default.itemText}`
// 호버 스타일
export const dropdownItemHover = `${style.hover.bg} ${style.hover.text}`
export const dropdownDivider = `border-t ${style.default.border}`
export const dropdownMenuProfile = `absolute right-0 top-full mt-2 min-w-[200px] overflow-hidden rounded-xl border ${style.default.border} ${style.default.panelBg} shadow-lg`
/** 선택된 항목에 체크 표시 시 사용할 아이템 래퍼 스타일 (flex, 우측 체크용) */
export const dropdownItemWithCheck = 'flex items-center justify-between gap-2'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
    </svg>
  )
}

export function DropdownMenu({
  children,
  className,
  role = 'menu',
}: {
  children: React.ReactNode
  className: string
  role?: 'menu'
}) {
  return <ul className={className} role={role}>{children}</ul>
}

const checkIconClass = 'size-4 shrink-0 text-violet-600'

export function DropdownItem({
  href,
  children,
  defaultClassName = dropdownItemDefault,
  hoverClassName = dropdownItemHover,
  dividerAbove = false,
  selected = false,
}: {
  href: string
  children: React.ReactNode
  defaultClassName?: string
  hoverClassName?: string
  dividerAbove?: boolean
  /** true면 우측 끝에 체크 표시 (앞으로 추가할 디자인용) */
  selected?: boolean
}) {
  const linkClassName = selected
    ? `${defaultClassName} ${dropdownItemWithCheck} ${hoverClassName} !flex`
    : `${defaultClassName} ${hoverClassName}`

  return (
    <li role="none" className={dividerAbove ? dropdownDivider : undefined}>
      <Link href={href} className={linkClassName} role="menuitem" aria-current={selected ? 'true' : undefined}>
        {selected ? (
          <>
            <span className="min-w-0">{children}</span>
            <CheckIcon className={checkIconClass} />
          </>
        ) : (
          children
        )}
      </Link>
    </li>
  )
}
