'use client'

import Link from 'next/link'

/**
 * Dropdown 공통 컴포넌트
 * 헤더 "향", "나의 향기 찾기", "프로필" 드롭다운에서 재사용.
 */

/** 스타일: 디폴트(기본) vs 호버 시 구분 */
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

/** 패널 기본 (위치 제외) */
export const dropdownMenuDefault = `rounded-lg border ${style.default.border} ${style.default.panelBg} py-2 shadow-lg`
export const dropdownMenuPositionLeft = 'absolute left-0 top-full mt-0.5'
export const dropdownMenuPositionRight = 'absolute right-0 top-full mt-2'
/** 항목: 디폴트 */
export const dropdownItemDefault = `block w-full px-4 py-3 text-left text-sm ${style.default.itemText}`
/** 항목: 호버 시 */
export const dropdownItemHover = `${style.hover.bg} ${style.hover.text}`
export const dropdownDivider = `border-t ${style.default.border}`
export const dropdownMenuProfile = `absolute right-0 top-full mt-2 min-w-[200px] overflow-hidden rounded-xl border ${style.default.border} ${style.default.panelBg} shadow-lg`

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

export function DropdownItem({
  href,
  children,
  defaultClassName = dropdownItemDefault,
  hoverClassName = dropdownItemHover,
  dividerAbove = false,
}: {
  href: string
  children: React.ReactNode
  defaultClassName?: string
  hoverClassName?: string
  dividerAbove?: boolean
}) {
  return (
    <li role="none" className={dividerAbove ? dropdownDivider : undefined}>
      <Link href={href} className={`${defaultClassName} ${hoverClassName}`} role="menuitem">
        {children}
      </Link>
    </li>
  )
}
