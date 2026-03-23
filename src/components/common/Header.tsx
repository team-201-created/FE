'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Dropdown } from '@/components/common/Dropdown'
import { headerNavLinks } from '@/constants/headerNavLinks'
import ProfileModal from '@/app/profile/profileModal/profileModal'
import NicknameModal from '@/app/profile/profileModal/NicknameModal'
import WithdrawModal from '@/app/profile/profileModal/WithdrawModal'
import CloseIcon from '@/assets/icons/close.svg'
import OpenIcon from '@/assets/icons/open.svg'
import { useModalStore } from '@/store/useModalStore'
import Modal from './Modal'
import { useAuthStore } from '@/store/useAuthStore'

const styles = {
  header:
    'sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur',
  container:
    'mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6',
  leftGroup: 'flex items-center gap-6',
  logo: 'flex items-center transition-transform hover:scale-[1.02]',
  nav: 'hidden md:flex items-center gap-1',
  navItemWrapper: 'relative',
  rightMenu: 'hidden md:flex items-center gap-3',
  rightLink: 'text-sm font-medium text-neutral-600 hover:text-violet-700',
  chevronWrap: 'ml-0.5 shrink-0',
} as const

export function Header() {
  const {
    isLoggedIn,
    user,
    userProfileLoaded,
    logout: logoutFromStore,
  } = useAuthStore()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => setMobileMenuOpen(false)

  const profileMenuItems = useMemo(() => {
    const showAdmin =
      userProfileLoaded && user != null && user.is_admin === true
    if (showAdmin) return [...headerNavLinks.profile]
    return headerNavLinks.profile.filter((item) => item.href !== '/admin')
  }, [user, userProfileLoaded])

  const { openModal, closeModal, closeAll } = useModalStore()

  const openProfileModal = () => {
    closeAll()
    closeMenu()
    openModal(
      <Modal rounded="sm" size="md" isOpen onClose={closeModal}>
        <ProfileModal
          isOpen
          onClose={closeModal}
          onNicknameClick={() => {
            closeAll()
            openModal(
              <Modal rounded="sm" size="md" isOpen onClose={closeModal}>
                <NicknameModal isOpen onClose={closeModal} />
              </Modal>
            )
          }}
          onWithdrawClick={() => {
            closeAll()
            openModal(
              <Modal rounded="sm" size="md" isOpen onClose={closeModal}>
                <WithdrawModal isOpen onClose={closeModal} />
              </Modal>
            )
          }}
        />
      </Modal>
    )
  }

  const logout = async () => {
    closeMenu()
    try {
      await logoutFromStore()
      router.push('/login')
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : '로그아웃 처리 중 오류가 발생했습니다.'
      alert(message)
    }
  }

  const handleProfileMenu = (action: string | undefined) => {
    if (action === 'openProfileModal') openProfileModal()
    if (action === 'logout') logout()
  }

  const renderRightMenu = () => {
    if (isLoggedIn) {
      return (
        <Dropdown
          trigger={
            <Image
              src="/profile.svg"
              alt="프로필 메뉴"
              width={36}
              height={36}
              className="size-9"
              aria-hidden
            />
          }
          items={profileMenuItems}
          variant="profile"
          menuMinWidth="min-w-[200px]"
          aria-label="프로필 메뉴"
          onProfileAction={handleProfileMenu}
        />
      )
    }
    return (
      <Link href="/login" className={styles.rightLink}>
        로그인
      </Link>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* 로고 */}
          <div className={styles.leftGroup}>
            <Link href="/" className={styles.logo} aria-label="DeepScent 홈">
              <Image
                src="/logo.svg"
                alt="DeepScent"
                width={189}
                height={29}
                className="h-7 w-auto"
                priority
                loading="eager"
              />
            </Link>

            {/* 데스크탑 전용 nav */}
            <nav className={styles.nav} aria-label="메인 메뉴">
              <div className={styles.navItemWrapper}>
                <Dropdown
                  trigger={(isOpen) => (
                    <>
                      향
                      <span className={styles.chevronWrap} aria-hidden>
                        {isOpen ? (
                          <CloseIcon className="size-4" />
                        ) : (
                          <OpenIcon className="size-4" />
                        )}
                      </span>
                    </>
                  )}
                  items={headerNavLinks.perfume.map(({ label, href }) => ({
                    href,
                    label,
                  }))}
                  variant="default"
                  menuMinWidth="min-w-[180px]"
                />
              </div>

              <div className={styles.navItemWrapper}>
                <Dropdown
                  trigger={(isOpen) => (
                    <>
                      나의 향기 찾기
                      <span className={styles.chevronWrap} aria-hidden>
                        {isOpen ? (
                          <CloseIcon className="size-4" />
                        ) : (
                          <OpenIcon className="size-4" />
                        )}
                      </span>
                    </>
                  )}
                  items={headerNavLinks.findMyScent.map(
                    ({ href, title, subtitle }) => ({
                      href,
                      label: title,
                      title,
                      subtitle,
                    })
                  )}
                  variant="withSubtitle"
                  menuMinWidth="min-w-[280px]"
                />
              </div>
            </nav>
          </div>

          {/* 데스크탑 전용 우측 메뉴 */}
          <div className={styles.rightMenu}>{renderRightMenu()}</div>

          {/* 모바일 전용: 햄버거 버튼 */}
          <button
            className="flex items-center justify-center p-1 text-neutral-700 md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 백드롭 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-14 z-30 bg-black/10 md:hidden"
              onClick={closeMenu}
              aria-hidden
            />

            {/* 모바일 메뉴 패널 */}
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-x-0 top-14 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur md:hidden"
              aria-label="모바일 메뉴"
            >
              <div className="px-4 py-5">
                {/* 향 섹션 */}
                <p className="mb-1.5 px-2 text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                  향
                </p>
                {headerNavLinks.perfume.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    {label}
                    <span className="text-neutral-300">→</span>
                  </Link>
                ))}

                {/* 나의 향기 찾기 섹션 */}
                <p className="mt-5 mb-1.5 px-2 text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                  나의 향기 찾기
                </p>
                {headerNavLinks.findMyScent.map(({ href, title, subtitle }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-2 py-2.5 hover:bg-neutral-50 active:bg-neutral-100"
                  >
                    <span>
                      <span className="block text-sm font-medium text-neutral-700">
                        {title}
                      </span>
                      <span className="block text-xs text-neutral-400">
                        {subtitle}
                      </span>
                    </span>
                    <span className="text-neutral-300">→</span>
                  </Link>
                ))}

                {/* 로그인 / 프로필 */}
                <div className="mt-5 border-t border-neutral-100 pt-4">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={openProfileModal}
                        className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        내 정보 수정
                        <span className="text-neutral-300">→</span>
                      </button>
                      <Link
                        href="/profile/storage"
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                      >
                        향기 저장소
                        <span className="text-neutral-300">→</span>
                      </Link>
                      {userProfileLoaded && user?.is_admin && (
                        <Link
                          href="/admin"
                          onClick={closeMenu}
                          className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          관리자 페이지
                          <span className="text-neutral-300">→</span>
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="text-danger flex w-full rounded-xl px-2 py-2.5 text-sm font-medium hover:bg-neutral-50"
                      >
                        로그아웃
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-xl px-2 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      로그인
                      <span className="text-neutral-300">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
