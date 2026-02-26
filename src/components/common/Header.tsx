'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownItem,
  dropdownMenuDefault,
  dropdownMenuPositionLeft,
  dropdownMenuProfile,
  dropdownItemDefault,
  dropdownItemHover,
} from '@/components/common/Dropdown'
import { headerNavLinks } from '@/constants/headerNavLinks'
import CloseIcon from '@/assets/icons/close.svg'
import OpenIcon from '@/assets/icons/open.svg'
import ProfileIcon from '@/assets/icons/profile.svg'
import PenIcon from '@/assets/icons/pen.svg'
import HeartIcon from '@/assets/icons/heart.svg'
import AdminIcon from '@/assets/icons/admin.svg'
import ExitIcon from '@/assets/icons/exit.svg'

const styles = {
  header: 'sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur',
  container: 'mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6',
  logo: 'text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-transform hover:scale-[1.02]',
  nav: 'flex items-center gap-1',
  navItemWrapper: 'relative',
  navTab: 'inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-violet-50 hover:text-violet-800',
  chevronWrap: 'ml-0.5 shrink-0',
  findMyScentItem: 'block w-full px-4 py-3 text-left group',
  findMyScentTitle: 'text-sm font-bold text-neutral-900 group-hover:text-violet-700',
  findMyScentSubtitle: 'mt-0.5 text-xs text-neutral-500 group-hover:text-violet-700',
  rightMenu: 'flex items-center gap-3',
  rightLink: 'text-sm font-medium text-neutral-600 hover:text-violet-700',
  divider: 'h-3.5 w-px bg-neutral-300 shrink-0',
  profileButtonWrap: 'relative',
  profileButton: 'flex size-9 items-center justify-center rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-90',
  profileItemDefault: 'flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-800',
} as const

const menuClassNames = {
  perfume: `${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[200px]`,
  findMyScent: `${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[280px]`,
} as const

const PROFILE_ICON_CLASS = 'size-4 shrink-0'
const profileDropdownIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pencil: PenIcon,
  heart: HeartIcon,
  gear: AdminIcon,
  logout: ExitIcon,
}

function ProfileDropdownIcon({ type }: { type: string }) {
  const IconComponent = profileDropdownIcons[type]
  if (!IconComponent) return null
  return <IconComponent className={PROFILE_ICON_CLASS} />
}

export function Header() {
  const pathname = usePathname()
  const [openPerfume, setOpenPerfume] = useState(false)
  const [openFindMyScent, setOpenFindMyScent] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const profileWrapRef = useRef<HTMLDivElement>(null)

  const togglePerfume = () => setOpenPerfume((prev) => !prev)
  const toggleFindMyScent = () => setOpenFindMyScent((prev) => !prev)
  const toggleProfile = () => setOpenProfile((prev) => !prev)

  // 페이지 이동 시 네비 드롭다운(향, 나의 향기 찾기) 닫기
  useEffect(() => {
    setOpenPerfume(false)
    setOpenFindMyScent(false)
  }, [pathname])

  useEffect(() => {
    if (!openProfile) return
    const handleClickOutside = (e: MouseEvent) => {
      if (profileWrapRef.current?.contains(e.target as Node)) return
      setOpenProfile(false)
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProfile(false)
    }
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openProfile])

  const Chevron = (isOpen: boolean) =>
    isOpen ? <CloseIcon className="size-4" /> : <OpenIcon className="size-4" />

  const perfumeDropdown = openPerfume ? (
    <DropdownMenu className={menuClassNames.perfume}>
      {headerNavLinks.perfume.map((item, index) => (
        <DropdownItem
          key={item.href}
          href={item.href}
          defaultClassName={dropdownItemDefault}
          hoverClassName={dropdownItemHover}
          dividerAbove={index > 0}
        >
          {item.label}
        </DropdownItem>
      ))}
    </DropdownMenu>
  ) : null

  const findMyScentDropdown = openFindMyScent ? (
    <DropdownMenu className={menuClassNames.findMyScent}>
      {headerNavLinks.findMyScent.map((item, index) => (
        <DropdownItem
          key={item.href}
          href={item.href}
          defaultClassName={styles.findMyScentItem}
          hoverClassName={dropdownItemHover}
          dividerAbove={index > 0}
        >
          <span className={styles.findMyScentTitle}>{item.title}</span>
          <p className={styles.findMyScentSubtitle}>{item.subtitle}</p>
        </DropdownItem>
      ))}
    </DropdownMenu>
  ) : null

  const profileDropdown = openProfile ? (
    <DropdownMenu className={dropdownMenuProfile}>
      {headerNavLinks.profile.map((item) => (
        <DropdownItem
          key={item.href}
          href={item.href}
          defaultClassName={styles.profileItemDefault}
          hoverClassName={dropdownItemHover}
        >
          <ProfileDropdownIcon type={item.icon} />
          {item.label}
        </DropdownItem>
      ))}
    </DropdownMenu>
  ) : null

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DeepScent
        </Link>

        <nav className={styles.nav} aria-label="메인 메뉴">
          <div className={styles.navItemWrapper}>
            <button
              type="button"
              className={styles.navTab}
              aria-expanded={openPerfume}
              aria-haspopup="true"
              onClick={togglePerfume}
            >
              향
              <span className={styles.chevronWrap} aria-hidden>
                {Chevron(openPerfume)}
              </span>
            </button>
            {perfumeDropdown}
          </div>

          <div className={styles.navItemWrapper}>
            <button
              type="button"
              className={styles.navTab}
              aria-expanded={openFindMyScent}
              aria-haspopup="true"
              onClick={toggleFindMyScent}
            >
              나의 향기 찾기
              <span className={styles.chevronWrap} aria-hidden>
                {Chevron(openFindMyScent)}
              </span>
            </button>
            {findMyScentDropdown}
          </div>
        </nav>

        <div className={styles.rightMenu}>
          <Link href="/login" className={styles.rightLink}>
            로그인
          </Link>
          <span className={styles.divider} aria-hidden />
          <Link href="/signup" className={styles.rightLink}>
            회원가입
          </Link>
          <div ref={profileWrapRef} className={styles.profileButtonWrap}>
            <button
              type="button"
              className={styles.profileButton}
              aria-label="프로필 메뉴"
              aria-expanded={openProfile}
              aria-haspopup="true"
              onClick={toggleProfile}
            >
              <ProfileIcon className="size-9" aria-hidden />
            </button>
            {profileDropdown}
          </div>
        </div>
      </div>
    </header>
  )
}
