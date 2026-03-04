'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from '@/components/common/Dropdown'
import { headerNavLinks } from '@/constants/headerNavLinks'
import CloseIcon from '@/assets/icons/close.svg'
import OpenIcon from '@/assets/icons/open.svg'

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
  return (
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

        <div className={styles.rightMenu}>
          <Link href="/login" className={styles.rightLink}>
            로그인
          </Link>
          <span className={styles.divider} aria-hidden />
          <Link href="/signup" className={styles.rightLink}>
            회원가입
          </Link>
          <Dropdown
            trigger={
              <Image
                src="/profile.svg"
                alt=""
                width={36}
                height={36}
                className="size-9"
                aria-hidden
              />
            }
            items={headerNavLinks.profile.map(({ href, label, icon }) => ({
              href,
              label,
              icon,
            }))}
            variant="profile"
            menuMinWidth="min-w-[200px]"
            aria-label="프로필 메뉴"
          />
        </div>
      </div>
    </header>
  )
}
