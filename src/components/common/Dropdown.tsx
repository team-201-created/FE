'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import PenIcon from '@/assets/icons/pen.svg'
import HeartIcon from '@/assets/icons/heart.svg'
import AdminIcon from '@/assets/icons/admin.svg'
import ExitIcon from '@/assets/icons/exit.svg'

// ─── 타입 ─────────────────────────────────────────────────────────────────
/** 드롭다운 한 개 항목 (variant에 따라 label만 / title+subtitle / icon+label) */
export type DropdownItemProp = {
  href: string
  label: string
  title?: string
  subtitle?: string
  icon?: 'pencil' | 'heart' | 'gear' | 'logout'
  dividerAbove?: boolean
}

/** variant: default(단순) | withSubtitle(제목+부제목) | profile(아이콘+라벨) */
export type DropdownVariant = 'default' | 'withSubtitle' | 'profile'

// ─── 스타일 상수 ─────────────────────────────────────────────────────────
const style = {
  default: {
    // 기본 스타일
    border: 'border-neutral-200',
    panelBg: 'bg-white',
    itemText: 'text-neutral-700',
  },
  hover: {
    // 호버 스타일
    bg: 'hover:bg-violet-100',
    text: 'hover:text-violet-700',
  },
} as const

// ─── 메뉴 스타일 ─────────────────────────────────────────────────────────
const menuBase = cn(
  'rounded-lg border py-2 shadow-lg', // 기본 스타일
  style.default.border, // 테두리 스타일
  style.default.panelBg // 배경 스타일
)
const menuPosition = 'absolute left-0 top-full mt-0.5'
const itemBase = cn(
  'block w-full min-w-0 whitespace-nowrap px-4 py-3 text-left text-sm', // 아이템 기본 스타일
  style.default.itemText // 아이템 텍스트 스타일
)
const itemHover = cn(style.hover.bg, style.hover.text)
const divider = cn('border-t', style.default.border)
const PROFILE_ICON_CLASS = 'size-4 shrink-0'

const profileIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  pencil: PenIcon,
  heart: HeartIcon,
  gear: AdminIcon,
  logout: ExitIcon,
}

// ─── 통합 드롭다운 (스타일·열기/닫기·백드롭 내장) ─────────────────────────
const triggerButton =
  'inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-violet-50 hover:text-violet-800'
const triggerButtonProfile =
  'flex size-9 items-center justify-center rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-90'
const itemWithSubtitle = 'block w-full px-4 py-3 text-left group'
const itemTitle =
  'text-sm font-bold text-neutral-900 group-hover:text-violet-700'
const itemSubtitle =
  'mt-0.5 text-xs text-neutral-500 group-hover:text-violet-700'
const itemProfile =
  'flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-800'

export function Dropdown({
  trigger,
  items,
  variant = 'default',
  menuMinWidth,
  'aria-label': ariaLabel,
}: {
  /** 버튼 내용. (isOpen) => ReactNode 이면 열림 상태에 따라 아이콘 등 변경 가능 */
  trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode)
  items: DropdownItemProp[]
  variant?: DropdownVariant
  menuMinWidth?: string
  'aria-label'?: string
}) {
  const [open, setOpen] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) setTimeout(() => backdropRef.current?.focus(), 0)
      return !prev
    })
  }
  const close = () => setOpen(false)

  const isTriggerFn = typeof trigger === 'function'
  const triggerContent = isTriggerFn
    ? (trigger as (isOpen: boolean) => React.ReactNode)(open)
    : trigger

  const menuClassName = cn(menuBase, menuPosition, menuMinWidth)

  const renderItem = (item: DropdownItemProp, index: number) => {
    const dividerAbove = item.dividerAbove ?? index > 0
    const baseItemClass = cn(itemBase, itemHover)

    if (
      variant === 'withSubtitle' &&
      item.title != null &&
      item.subtitle != null
    ) {
      return (
        <li key={item.href} role="none" className={cn(dividerAbove && divider)}>
          <Link
            href={item.href}
            className={cn(itemWithSubtitle, itemHover)}
            role="menuitem"
            onClick={close}
          >
            <span className={itemTitle}>{item.title}</span>
            <p className={itemSubtitle}>{item.subtitle}</p>
          </Link>
        </li>
      )
    }

    if (variant === 'profile' && item.icon) {
      const Icon = profileIcons[item.icon]
      return (
        <li key={item.href} role="none" className={cn(dividerAbove && divider)}>
          <Link
            href={item.href}
            className={cn(itemProfile, itemHover)}
            role="menuitem"
            onClick={close}
          >
            {Icon ? <Icon className={PROFILE_ICON_CLASS} /> : null}
            {item.label}
          </Link>
        </li>
      )
    }

    // default
    return (
      <li key={item.href} role="none" className={cn(dividerAbove && divider)}>
        <Link
          href={item.href}
          className={baseItemClass}
          role="menuitem"
          onClick={close}
        >
          {item.label}
        </Link>
      </li>
    )
  }

  const isProfileTrigger = variant === 'profile'
  const buttonClass = isProfileTrigger ? triggerButtonProfile : triggerButton

  return (
    <div className="relative">
      {open && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40"
          aria-hidden
          tabIndex={-1}
          onClick={close}
          onKeyDown={(e) => e.key === 'Escape' && close()}
        />
      )}
      <button
        type="button"
        className={buttonClass}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={ariaLabel}
        onClick={toggle}
      >
        {triggerContent}
      </button>
      {open && (
        <ul className={menuClassName} role="menu">
          {items.map((item, index) => renderItem(item, index))}
        </ul>
      )}
    </div>
  )
}
