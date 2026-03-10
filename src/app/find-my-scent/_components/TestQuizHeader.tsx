/** 테스트 상단: 아이콘·제목·부제 (취향/건강 타입별 설정) */
import Image from 'next/image'

import type { TestType } from '../_types'

// 취향/건강 타입별 설정
const TEST_TYPE_CONFIG: Record<
  TestType,
  { icon: string; title: string; subtitle: string }
> = {
  PREFERENCE: {
    icon: '/taste.svg',
    title: '취향에 어울리는 향기 찾기',
    subtitle: '취향 정보를 기반으로하여 어울리는 향기를 추천합니다.',
  },
  HEALTH: {
    icon: '/wellness.svg',
    title: '웰니스 케어 진단',
    subtitle: '건강 정보를 기반으로하여 어울리는 향기를 추천합니다.',
  },
}

const styles = {
  wrap: 'flex flex-col items-center text-center',
  iconWrap: 'relative mb-3 size-14',
  title: 'text-xl font-bold text-[var(--color-black-primary)]',
  subtitle: 'mt-1 text-sm text-neutral-500',
} as const

export function TestQuizHeader({ testType }: { testType: TestType }) {
  const { icon, title, subtitle } = TEST_TYPE_CONFIG[testType]
  return (
    <header className={styles.wrap}>
      <div className={styles.iconWrap}>
        <Image src={icon} alt="" fill className="object-contain" />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  )
}
