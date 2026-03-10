/** 질문 진행률 바 (현재/전체, 퍼센트) */
type TestProgressBarProps = {
  current: number
  total: number
}

const styles = {
  wrap: 'flex w-full items-center gap-3',
  label: 'shrink-0 text-sm font-medium text-[var(--color-black-primary)]',
  track: 'min-w-0 flex-1 rounded-full bg-[var(--color-white)]',
  fill: 'h-2 rounded-full bg-[var(--color-black-primary)] transition-[width] duration-300',
  percent: 'shrink-0 text-sm text-neutral-500',
} as const

export function TestProgressBar({ current, total }: TestProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0
  const fillStyle = { width: `${percent}%` }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>
        질문 {current}/{total}
      </span>
      <div className={styles.track}>
        <div className={styles.fill} style={fillStyle} />
      </div>
      <span className={styles.percent}>{percent}%</span>
    </div>
  )
}
