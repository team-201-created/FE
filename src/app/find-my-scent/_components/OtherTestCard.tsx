'use client'

/** 다른 테스트 하러가기 모달 내 개별 테스트 유형 카드 */
import Image from 'next/image'
import Link from 'next/link'

export type OtherTestCardProps = {
  iconSrc: string
  title: string
  subtitle: string
  href: string
}

const styles = {
  card: 'flex w-full items-center gap-4 rounded-xl bg-[#F5F0E8] px-4 py-4 transition-colors hover:bg-[#EDE8E0]',
  iconWrap: 'relative h-10 w-10 shrink-0',
  textWrap: 'min-w-0 flex-1',
  title: 'text-base font-semibold text-[var(--color-black-primary)]',
  subtitle: 'text-sm text-neutral-600',
  arrow: 'shrink-0 text-[var(--color-black-primary)]',
} as const

export function OtherTestCard({
  iconSrc,
  title,
  subtitle,
  href,
}: OtherTestCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.iconWrap}>
        <Image
          src={iconSrc}
          alt=""
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div className={styles.textWrap}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <span className={styles.arrow} aria-hidden>
        ›
      </span>
    </Link>
  )
}
