'use client'

/** 다른 테스트 하러가기 모달 — 현재 결과 유형 제외 2가지 테스트 선택 */
import Image from 'next/image'
import type { ResultPageType } from '../_types'
import { OtherTestCard } from './OtherTestCard'

const OTHER_TEST_CONFIG: Record<
  ResultPageType,
  { icon: string; title: string; subtitle: string; href: string }
> = {
  PREFERENCE: {
    icon: '/taste.svg',
    title: '취향 테스트',
    subtitle: '질문 기반 맞춤 향기 추천',
    href: '/find-my-scent/taste-test',
  },
  HEALTH: {
    icon: '/wellness.svg',
    title: '웰니스 케어 진단',
    subtitle: '건강 정보 기반 맞춤 향기 추천',
    href: '/find-my-scent/wellness',
  },
  AI: {
    icon: '/ai.svg',
    title: 'AI 비주얼 분석',
    subtitle: '사진 업로드 기반 AI 향기 추천',
    href: '/find-my-scent/ai-visual',
  },
}

const ALL_TYPES: ResultPageType[] = ['PREFERENCE', 'HEALTH', 'AI']

export type OtherTestModalProps = {
  isOpen: boolean
  onClose: () => void
  /** 현재 결과 페이지 유형 — 이 유형은 목록에서 제외 */
  currentResultType: ResultPageType
}

const styles = {
  overlay:
    'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4',
  modal: 'w-full max-w-md rounded-2xl bg-white p-6 shadow-lg',
  header: 'relative mb-5',
  closeBtn:
    'absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black',
  title: 'text-xl font-bold text-[var(--color-black-primary)]',
  subtitle: 'mt-1 text-sm text-neutral-600',
  list: 'flex flex-col gap-3',
} as const

export function OtherTestModal({
  isOpen,
  onClose,
  currentResultType,
}: OtherTestModalProps) {
  if (!isOpen) return null

  const options = ALL_TYPES.filter((t) => t !== currentResultType).map(
    (type) => OTHER_TEST_CONFIG[type]
  )

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="other-test-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="닫기"
          >
            <Image
              src="/modalClose.svg"
              alt=""
              width={20}
              height={20}
              unoptimized
            />
          </button>
          <h2 id="other-test-modal-title" className={styles.title}>
            다른 테스트 하러가기
          </h2>
          <p className={styles.subtitle}>관심 있는 테스트를 선택해주세요</p>
        </header>
        <div className={styles.list}>
          {options.map((opt) => (
            <OtherTestCard
              key={opt.href}
              iconSrc={opt.icon}
              title={opt.title}
              subtitle={opt.subtitle}
              href={opt.href}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
