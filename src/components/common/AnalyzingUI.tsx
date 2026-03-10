'use client'

/** 결과 페이지로 이동 시 표시하는 "분석 중" 로딩 UI */
import { motion } from 'motion/react'

const styles = {
  wrap: 'flex min-h-screen items-center justify-center bg-[var(--background-light-bg)] px-6 pt-24 pb-16',
  card: 'w-full max-w-md rounded-3xl border border-white/20 bg-white/70 p-10 text-center shadow-xl backdrop-blur-xl',
  iconWrap: 'relative mx-auto mb-8 h-28 w-28',
  ring1:
    'absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-oriental-bg)] to-[var(--color-floral-bg)]',
  ring2:
    'absolute inset-3 rounded-full border-4 border-[var(--color-purple-primary)] border-t-transparent',
  ring3:
    'absolute inset-6 rounded-full border-4 border-[var(--color-oriental-border)] border-t-transparent',
  centerIcon:
    'absolute inset-0 m-auto h-10 w-10 text-[var(--color-purple-primary)]',
  title: 'mb-2 text-2xl font-bold text-[var(--color-black-primary)]',
  description: 'text-sm leading-relaxed text-[var(--color-gray-primary)]',
  dots: 'mt-6 flex justify-center gap-1',
  dot: 'h-2 w-2 rounded-full bg-[var(--color-purple-primary)]',
} as const

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 20l-1.5-6.5L4 11l6.5-1.5L12 3z" />
    </svg>
  )
}

export function AnalyzingUI() {
  return (
    <div className={styles.wrap}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className={styles.card}
      >
        <div className={styles.iconWrap}>
          <motion.div
            className={styles.ring1}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className={styles.ring2}
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className={styles.ring3}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <SparkleIcon className={styles.centerIcon} />
        </div>
        <h3 className={styles.title}>분석 중...</h3>
        <p className={styles.description}>
          선택하신 내용을 바탕으로
          <br />
          맞춤 향기를 분석하고 있습니다
        </p>
        <div className={styles.dots}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={styles.dot}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
