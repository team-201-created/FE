'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import PenIcon from '@/assets/icons/pen.svg'
import HeartIcon from '@/assets/icons/heart.svg'
import AdminIcon from '@/assets/icons/admin.svg'
import ExitIcon from '@/assets/icons/exit.svg'

// ─── 타입 ─────────────────────────────────────────────────────────────────
export type DropdownItemProp = {
  href: string
  label: string
  title?: string
  subtitle?: string
  icon?: 'pencil' | 'heart' | 'gear' | 'logout'
  dividerAbove?: boolean
  onClick?: string | (() => void)
}

export type DropdownVariant = 'default' | 'withSubtitle' | 'profile'

// ─── 스타일 ─────────────────────────────────────────────────────────────────
const styles = {
  wrap: 'relative',
  backdrop: 'fixed inset-0 z-[60]',
  inner: 'relative',
  innerOpen: 'z-[70]',
  trigger:
    'inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-violet-50 hover:text-violet-800',
  triggerProfile:
    'flex size-9 items-center justify-center rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-90',
  menu: 'absolute left-0 top-full mt-0.5 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg',
  item: 'block w-full min-w-0 whitespace-nowrap px-4 py-3 text-left text-sm text-neutral-700 hover:bg-violet-100 hover:text-violet-700',
  itemSubtitleWrap:
    'block w-full px-4 py-3 text-left group hover:bg-violet-100 hover:text-violet-700',
  itemTitle: 'text-sm font-bold text-neutral-900 group-hover:text-violet-700',
  itemSubtitle: 'mt-0.5 text-xs text-neutral-500 group-hover:text-violet-700',
  itemProfile:
    'flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-800 hover:bg-violet-100 hover:text-violet-700',
  divider: 'border-t border-neutral-200',
  icon: 'size-4 shrink-0',
} as const

const PROFILE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  pencil: PenIcon,
  heart: HeartIcon,
  gear: AdminIcon,
  logout: ExitIcon,
}

// ─── 메뉴 아이템 렌더 (variant별) ──────────────────────────────────────────
type ItemProps = {
  item: DropdownItemProp
  index: number
  variant: DropdownVariant
  onClick?: () => void
  onClose: () => void
}

function DropdownMenuItem({
  item,
  index,
  variant,
  onClick,
  onClose,
}: ItemProps) {
  const showDivider = item.dividerAbove ?? index > 0

  if (
    variant === 'withSubtitle' &&
    item.title != null &&
    item.subtitle != null
  ) {
    return (
      <li
        key={item.href}
        role="none"
        className={cn(showDivider && styles.divider)}
      >
        <Link
          href={item.href}
          className={styles.itemSubtitleWrap}
          role="menuitem"
        >
          <span className={styles.itemTitle}>{item.title}</span>
          <p className={styles.itemSubtitle}>{item.subtitle}</p>
        </Link>
      </li>
    )
  }

  if (variant === 'profile' && item.icon) {
    const Icon = PROFILE_ICONS[item.icon]
    return (
      <li
        key={item.href}
        role="none"
        className={cn(showDivider && styles.divider)}
        onClick={onClick}
      >
        <Link
          href={item.href}
          className={styles.itemProfile}
          role="menuitem"
          onClick={onClose}
        >
          {Icon && <Icon className={styles.icon} />}
          {item.label}
        </Link>
      </li>
    )
  }

  return (
    <li
      key={item.href}
      role="none"
      className={cn(showDivider && styles.divider)}
    >
      <Link
        href={item.href}
        className={styles.item}
        role="menuitem"
        onClick={onClose}
      >
        {item.label}
      </Link>
    </li>
  )
}

// ─── 드롭다운 ───────────────────────────────────────────────────────────────
export function Dropdown({
  trigger,
  items,
  variant = 'default',
  menuMinWidth,
  'aria-label': ariaLabel,
  onProfileAction,
}: {
  trigger: React.ReactNode | ((isOpen: boolean) => React.ReactNode)
  items: readonly DropdownItemProp[]
  variant?: DropdownVariant
  menuMinWidth?: string
  'aria-label'?: string
  onProfileAction?: (action: string | undefined) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = () => setOpen(false)
  const toggle = () => setOpen((prev) => !prev)
  const handleKeyDown = (e: React.KeyboardEvent) =>
    e.key === 'Escape' && close()

  useOutsideClick(ref, close, open)

  const triggerContent = typeof trigger === 'function' ? trigger(open) : trigger
  const triggerClass =
    variant === 'profile' ? styles.triggerProfile : styles.trigger
  const menuClass = cn(styles.menu, menuMinWidth)

  // 아이템 클릭 핸들러: onClick 있으면 실행, 없으면 href 이동
  const handleItemClick = (item: DropdownItemProp) => {
    if (
      variant === 'profile' &&
      typeof item.onClick === 'string' &&
      onProfileAction
    ) {
      onProfileAction(item.onClick)
      close()
      return
    }
    if (item.href) {
      window.open(item.href, '_self')
    } else if (typeof item.onClick === 'function') {
      item.onClick()
    }
    close()
  }

  return (
    <div className={styles.wrap} ref={ref}>
      {open && <div className={styles.backdrop} aria-hidden onClick={close} />}
      <div className={cn(styles.inner, open && styles.innerOpen)}>
        <button
          type="button"
          className={triggerClass}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={ariaLabel}
          onClick={toggle}
          onKeyDown={handleKeyDown}
        >
          {triggerContent}
        </button>
        {open && (
          <ul className={menuClass} role="menu" onKeyDown={handleKeyDown}>
            {items.map((item, index) => (
              <DropdownMenuItem
                key={item.href || item.label}
                item={item}
                index={index}
                variant={variant}
                onClose={() => handleItemClick(item)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
