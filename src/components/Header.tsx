'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownItem,
  dropdownMenuDefault,
  dropdownMenuPositionLeft,
  dropdownMenuPositionRight,
  dropdownMenuProfile,
  dropdownItemDefault,
  dropdownItemHover,
  dropdownDivider,
} from '@/components/Dropdown'

const navLinks = {
  perfume: [
    { label: '단품 상품 리스트', href: '/products/single' },
    { label: '조합 상품 리스트', href: '/products/combo' },
  ],
  findMyScent: [
    { title: '취향 추천 테스트', subtitle: '취향 정보 기반 향기 추천', href: '/find-my-scent/taste-test' },
    { title: '웰니스 케어 진단', subtitle: '건강 정보 기반 아로마 테라피', href: '/find-my-scent/wellness' },
    { title: 'AI 비주얼 분석', subtitle: '사진 기반 향기 추천', href: '/find-my-scent/ai-visual' },
  ],
  profile: [
    { label: '내 정보 수정', href: '/profile', icon: 'pencil' },
    { label: '향기 저장소', href: '/profile/storage', icon: 'heart' },
    { label: '관리자 페이지', href: '/admin', icon: 'gear' },
    { label: '로그아웃', href: '/login', icon: 'logout' },
  ],
}

const styles = {
  header: 'sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur',
  container: 'mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6',
  logo: 'text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-transform hover:scale-[1.02]',
  nav: 'flex items-center gap-1',
  navItemWrapper: 'relative',
  navTab: 'inline-flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-violet-50 hover:text-violet-800',
  chevronWrap: 'ml-0.5 shrink-0',
  findMyScentTitle: 'text-sm font-bold text-neutral-900 group-hover:text-violet-700',
  findMyScentSubtitle: 'mt-0.5 text-xs text-neutral-500 group-hover:text-violet-700',
  rightMenu: 'flex items-center gap-3',
  rightLink: 'text-sm font-medium text-neutral-600 hover:text-violet-700',
  divider: 'h-3.5 w-px bg-neutral-300 shrink-0',
  profileButtonWrap: 'relative',
  profileButton: 'flex size-9 items-center justify-center rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-90',
  profileItemDefault: 'flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-800',
} as const

export function Header() {
  const [openPerfume, setOpenPerfume] = useState(false)
  const [openFindMyScent, setOpenFindMyScent] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  const chevronSrc = (isOpen: boolean) => (isOpen ? '/close.svg' : '/open.svg')

  const profileWrapRef = useRef<HTMLDivElement>(null)

  const handlePerfumeEnter = () => setOpenPerfume(true)
  const handlePerfumeLeave = () => setOpenPerfume(false)
  const handleFindMyScentEnter = () => setOpenFindMyScent(true)
  const handleFindMyScentLeave = () => setOpenFindMyScent(false)
  const toggleProfile = () => setOpenProfile((prev) => !prev)

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

  const perfumeMenuClassName = `${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[200px]`
  const findMyScentMenuClassName = `${dropdownMenuDefault} ${dropdownMenuPositionLeft} min-w-[280px]`

  const renderPerfumeDropdown = () => (
    <DropdownMenu className={perfumeMenuClassName}>
      {navLinks.perfume.map((item, index) => (
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
  )

  const renderFindMyScentDropdown = () => (
    <DropdownMenu className={findMyScentMenuClassName}>
      {navLinks.findMyScent.map((item, index) => (
        <DropdownItem
          key={item.href}
          href={item.href}
          defaultClassName="block w-full px-4 py-3 text-left group"
          hoverClassName={dropdownItemHover}
          dividerAbove={index > 0}
        >
          <span className={styles.findMyScentTitle}>{item.title}</span>
          <p className={styles.findMyScentSubtitle}>{item.subtitle}</p>
        </DropdownItem>
      ))}
    </DropdownMenu>
  )

  const renderProfileList = () => (
    <DropdownMenu className={dropdownMenuProfile}>
      {navLinks.profile.map((item) => (
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
  )

  const chevronImg = (isOpen: boolean) => (
    <img
      src={chevronSrc(isOpen)}
      alt=""
      width={16}
      height={16}
      className="size-4"
    />
  )

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DeepScent
        </Link>

        <nav className={styles.nav} aria-label="메인 메뉴">
          <div
            className={styles.navItemWrapper}
            onMouseEnter={handlePerfumeEnter}
            onMouseLeave={handlePerfumeLeave}
          >
            <button
              type="button"
              className={styles.navTab}
              aria-expanded={openPerfume}
              aria-haspopup="true"
            >
              향
              <span className={styles.chevronWrap} aria-hidden>
                {chevronImg(openPerfume)}
              </span>
            </button>
            {openPerfume && renderPerfumeDropdown()}
          </div>

          <div
            className={styles.navItemWrapper}
            onMouseEnter={handleFindMyScentEnter}
            onMouseLeave={handleFindMyScentLeave}
          >
            <button
              type="button"
              className={styles.navTab}
              aria-expanded={openFindMyScent}
              aria-haspopup="true"
            >
              나의 향기 찾기
              <span className={styles.chevronWrap} aria-hidden>
                {chevronImg(openFindMyScent)}
              </span>
            </button>
            {openFindMyScent && renderFindMyScentDropdown()}
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
              <img src="/profile.svg" alt="" width={36} height={36} className="size-9" />
            </button>
            {openProfile && renderProfileList()}
          </div>
        </div>
      </div>
    </header>
  )
}

function ProfileDropdownIcon({ type }: { type: string }) {
  const iconClass = 'size-4 shrink-0'
  switch (type) {
    case 'pencil':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    case 'gear':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'logout':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    default:
      return null
  }
}
