/** 테스트 결과 페이지 — 상단(아이콘/타이틀/부타이틀) + 컨텐츠 박스 */
import type { ComponentProps } from 'react'
import Image from 'next/image'
import type { ResultPageType } from '../_types'
import { ResultContentBox } from './ResultContentBox'

const RESULT_HEADER_CONFIG: Record<
  ResultPageType,
  { title: string; subtitle: string }
> = {
  PREFERENCE: {
    title: '당신을 위한 조합 향기를 찾았습니다!',
    subtitle: '질문을 통해 취향에 맞는 조합 향기를 추천해드립니다',
  },
  HEALTH: {
    title: '웰니스 향기 분석 완료!',
    subtitle: '당신의 건강 상태에 맞는 아로마 테라피를 찾았습니다',
  },
  AI: {
    title: 'AI 조합 향기 분석 완료!',
    subtitle: '이미지 기반으로 최적의 조합 향기를 찾았습니다',
  },
}

/** 결과 유형별 재테스트 경로 (다른 테스트는 모달에서 선택) */
const RESULT_PATHS: Record<ResultPageType, { retest: string }> = {
  PREFERENCE: { retest: '/find-my-scent/taste-test' },
  HEALTH: { retest: '/find-my-scent/wellness' },
  AI: { retest: '/find-my-scent/ai-visual' },
}

const styles = {
  wrap: 'min-h-screen bg-[var(--background-light-bg)] px-4 py-8 pb-50',
  inner: 'mx-auto w-full max-w-[1200px]',
  header: 'flex flex-col items-center gap-4 pb-8 text-center',
  iconWrap: 'relative h-[104px] w-[104px] shrink-0',
  title: 'text-xl font-bold text-[var(--color-black-primary)]',
  subtitle: 'text-sm leading-relaxed text-neutral-600',
  content: 'mt-0',
} as const

export type TestResultPageProps = {
  resultType: ResultPageType
  /** 컨텐츠 박스 props (API 결과 또는 목데이터) */
  contentBoxProps: Omit<
    ComponentProps<typeof ResultContentBox>,
    'retestButtonHref' | 'resultType'
  >
}

export function TestResultPage({
  resultType,
  contentBoxProps,
}: TestResultPageProps) {
  const { title, subtitle } = RESULT_HEADER_CONFIG[resultType]
  const { retest } = RESULT_PATHS[resultType]

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.iconWrap}>
            <Image
              src="/result.svg"
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.content}>
          <ResultContentBox
            retestButtonHref={retest}
            resultType={resultType}
            {...contentBoxProps}
          />
        </div>
      </div>
    </div>
  )
}
