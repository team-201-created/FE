/** 테스트 제출 후 결과 페이지 UI (취향/건강 공통) — 서버 컴포넌트 */
import Image from 'next/image'
import Link from 'next/link'
import type { TestType } from '../_types'

const TEST_TYPE_RESULT_CONFIG: Record<
  TestType,
  { icon: string; title: string; description: string }
> = {
  PREFERENCE: {
    icon: '/taste.svg',
    title: '취향 테스트가 완료되었어요',
    description: '선택하신 내용을 바탕으로 향기 추천 결과를 준비하고 있습니다.',
  },
  HEALTH: {
    icon: '/wellness.svg',
    title: '웰니스 진단이 완료되었어요',
    description:
      '선택하신 내용을 바탕으로 맞춤 향기 추천 결과를 준비하고 있습니다.',
  },
}

const styles = {
  wrap: 'min-h-screen bg-[var(--background-light-bg)] px-4 py-12',
  inner: 'mx-auto flex max-w-lg flex-col items-center gap-8 text-center',
  iconWrap: 'relative size-20',
  title: 'text-xl font-bold text-[var(--color-black-primary)]',
  description: 'text-sm leading-relaxed text-neutral-600',
  linkWrap: 'flex flex-col gap-3 pt-4',
  linkPrimary:
    'rounded-xl bg-[var(--color-black-primary)] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:opacity-90',
  linkSecondary:
    'rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50',
} as const

type TestResultPageProps = {
  testType: TestType
}

export function TestResultPage({ testType }: TestResultPageProps) {
  const { icon, title, description } = TEST_TYPE_RESULT_CONFIG[testType]
  const listPath =
    testType === 'PREFERENCE'
      ? '/find-my-scent/taste-test'
      : '/find-my-scent/wellness'

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.iconWrap}>
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.linkWrap}>
          <Link href="/products/single" className={styles.linkPrimary}>
            추천 향기 보러가기
          </Link>
          <Link href={listPath} className={styles.linkSecondary}>
            테스트 다시 하기
          </Link>
        </div>
      </div>
    </div>
  )
}
