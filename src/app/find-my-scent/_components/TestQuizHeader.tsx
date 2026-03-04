import Image from 'next/image'

/* TODO: 목데이터 연동 시 제거 - 더미 설정 */
export type TestType = 'PREFERENCE' | 'HEALTH'
const TEST_TYPE_CONFIG: Record<
  TestType,
  { icon: string; title: string; subtitle: string }
> = {
  PREFERENCE: {
    icon: '/taste.svg',
    title: '취향에 어울리는 향기 찾기',
    subtitle: '취향 정보 기반 향기 추천',
  },
  HEALTH: {
    icon: '/wellness.svg',
    title: '웰니스 케어 진단',
    subtitle: '건강 정보 기반 아로마 테라피 추천',
  },
}

type TestQuizHeaderProps = {
  testType: TestType
}

const styles = {
  wrap: 'flex flex-col items-center text-center',
  iconWrap: 'relative mb-3 size-14',
  title: 'text-xl font-bold text-[var(--color-black-primary)]',
  subtitle: 'mt-1 text-sm text-neutral-500',
} as const

export function TestQuizHeader({ testType }: TestQuizHeaderProps) {
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
