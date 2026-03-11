'use client'

/** 멀티스텝 인디케이터 — N단계 중 현재 단계 표시 (1-based) */
export type StepIndicatorProps = {
  /** 전체 단계 수 (예: 2) */
  totalSteps: number
  /** 현재 단계 (1 ~ totalSteps) */
  currentStep: number
}

const styles = {
  wrap: 'flex items-center justify-center gap-2',
  dot: 'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-200',
  dotActive:
    'bg-[var(--color-black-primary)] text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
  dotInactive: 'border border-neutral-300 bg-white text-neutral-400',
  line: 'h-px w-10 bg-gradient-to-r from-transparent via-neutral-200 to-transparent',
  lineActive: 'h-0.5 w-10 rounded-full bg-[var(--color-black-primary)]',
} as const

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className={styles.wrap} role="tablist" aria-label="단계">
      {steps.map((stepNumber, index) => {
        const isActive = currentStep >= stepNumber
        const isLast = index === steps.length - 1

        return (
          <div key={stepNumber} className="flex items-center gap-2">
            <span
              role="tab"
              aria-selected={currentStep === stepNumber}
              aria-label={`${stepNumber}단계`}
              className={`${styles.dot} ${isActive ? styles.dotActive : styles.dotInactive}`}
            >
              {stepNumber}
            </span>
            {!isLast && (
              <span
                className={
                  currentStep > stepNumber ? styles.lineActive : styles.line
                }
                aria-hidden
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
