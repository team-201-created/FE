'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dropdown } from '@/components/common/Dropdown'
import { headerNavLinks } from '@/constants/headerNavLinks'
import ProfileModal from '@/app/profile/profileModal/profileModal'
import NicknameModal from '@/app/profile/profileModal/NicknameModal'
import WithdrawModal from '@/app/profile/profileModal/WithdrawModal'
import CloseIcon from '@/assets/icons/close.svg'
import OpenIcon from '@/assets/icons/open.svg'
import { useModalStore } from '@/store/useModalStore'
import Modal from './Modal'
import { postLogout } from '@/lib/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useState, useEffect } from 'react'

const styles = {
  header:
    'sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur',
  container:
    'mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6',
  leftGroup: 'flex items-center gap-6',
  logo: 'flex items-center transition-transform hover:scale-[1.02]',
  nav: 'flex items-center gap-1',
  navItemWrapper: 'relative',
  rightMenu: 'flex items-center gap-3',
  rightLink: 'text-sm font-medium text-neutral-600 hover:text-violet-700',
  divider: 'h-3.5 w-px bg-neutral-300 shrink-0',
  chevronWrap: 'ml-0.5 shrink-0',
} as const
export function Header() {
  const { isLoggedIn, user, logout: logoutFromStore } = useAuthStore()
  const router = useRouter()

  const { openModal, closeModal, closeAll } = useModalStore()
  const openProfileModal = () => {
    closeAll()
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
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      alert('로그인 정보가 없습니다.')
      logoutFromStore()
      router.push('/login')
      return
    }

    try {
      await postLogout(accessToken, refreshToken)
      alert('로그아웃되었습니다.')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      logoutFromStore()
      router.push('/login')
    } catch (error: any) {
      console.error('Logout Error:', error)
      alert(error.message || '로그아웃 처리 중 오류가 발생했습니다.')
    }
  }

  const handleProfileMenu = (action: string | undefined) => {
    if (action === 'openProfileModal') openProfileModal()
    if (action === 'logout') logout()
  }

  const renderRightMenu = () => {
    // 개발 환경에서는 로그인 상태와 관계없이 로그인 링크와 프로필 메뉴를 모두 보여줌
    if (process.env.NODE_ENV === 'development') {
      return (
        <>
          <Link href="/login" className={styles.rightLink}>
            로그인
          </Link>
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
            items={headerNavLinks.profile}
            variant="profile"
            menuMinWidth="min-w-[200px]"
            aria-label="프로필 메뉴"
            onProfileAction={handleProfileMenu}
          />
        </>
      )
    }

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
          items={headerNavLinks.profile}
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
          <div className={styles.leftGroup}>
            <Link href="/" className={styles.logo} aria-label="DeepScent 홈">
              <Image
                src="/logo.svg"
                alt="DeepScent"
                width={189}
                height={29}
                className="h-7 w-auto"
              />
            </Link>

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

          <div className={styles.rightMenu}>{renderRightMenu()}</div>
        </div>
      </header>
      {/* useModalStore에서 모달 렌더링, Header에서는 직접 렌더링하지 않음 */}
    </>
  )
}
