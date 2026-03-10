/** 한 문항 카드: 지문·단일/다중선택 옵션·선택 토글 */
import { cn } from '@/lib/cn'

import type { QuizQuestion } from '../_types'

// 질문 유형 라벨
const TYPE_LABEL = { SINGLE: '단일선택', MULTI: '다중선택' } as const

const styles = {
  typePillBase: 'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
  typePillSingle: 'bg-[#F3E8FF] border border-[#E9D4FF] text-[#8200DB]',
  typePillMulti: 'bg-[#FCE7F3] border border-[#FCCEE8] text-[#C6005C]',
  card: 'rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm',
  head: 'mb-4 flex items-start justify-between gap-2',
  body: 'flex flex-col gap-2',
  questionWrap: 'min-w-0 flex-1',
  question: 'text-base font-bold text-[var(--color-black-primary)]',
  required: 'ml-1 text-[var(--color-danger)]',
  option:
    'flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors',
  optionSelected:
    'border-[var(--color-black-primary)] bg-[var(--color-gray-light)] text-[var(--color-black-primary)]',
  optionDefault:
    'border-neutral-200 bg-white text-[var(--color-black-primary)] hover:border-neutral-300',
  checkWrap:
    'flex size-6 items-center justify-center rounded-full bg-[var(--color-black-primary)] text-white',
} as const

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7l3 3 5-6" />
    </svg>
  )
}

function OptionRow({
  option,
  selected,
  onToggle,
}: {
  option: QuizQuestion['options'][number]
  selected: boolean
  onToggle: () => void
}) {
  const optionClassName = cn(
    styles.option,
    selected ? styles.optionSelected : styles.optionDefault
  )
  return (
    <button type="button" onClick={onToggle} className={optionClassName}>
      <span>{option.text}</span>
      {selected && (
        <span className={styles.checkWrap}>
          <CheckIcon />
        </span>
      )}
    </button>
  )
}

export function TestQuestionCard({
  question,
  selectedIds,
  onToggle,
}: {
  question: QuizQuestion
  selectedIds: string[]
  onToggle: (optionId: string) => void
}) {
  const typeLabel = TYPE_LABEL[question.questionType]
  const typePillClass =
    question.questionType === 'SINGLE'
      ? cn(styles.typePillBase, styles.typePillSingle)
      : cn(styles.typePillBase, styles.typePillMulti)
  const isSelected = (optionId: string) => selectedIds.includes(optionId)
  const handleToggle = (optionId: string) => onToggle(optionId)

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.questionWrap}>
          <p className={styles.question}>
            {question.text}
            {question.required && (
              <span className={styles.required}>*필수</span>
            )}
          </p>
        </div>
        <span className={typePillClass}>{typeLabel}</span>
      </div>
      <div className={styles.body}>
        {question.options.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            selected={isSelected(option.id)}
            onToggle={() => handleToggle(option.id)}
          />
        ))}
      </div>
    </div>
  )
}
