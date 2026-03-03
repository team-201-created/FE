import { Reorder } from 'motion/react'
import { AdminSelect } from '@/app/admin/_components'
import TrashIcon from '@/assets/icons/trash.svg'
import {
  STANDARD_OPTIONS,
  ALL_PRESETS,
  CATEGORIZED_PRESET_OPTIONS,
} from '../_constants/presets'
import { Question, Option } from '../_types'
import { cn } from '@/lib/cn'

interface QuestionFormProps {
  testType: string
  question: Question
  index: number
  onUpdate: (updates: Partial<Question>) => void
  onRemove: () => void
  onAddOption: () => void
  onRemoveOption: (optUid: string) => void
  onUpdateOption: (optUid: string, updates: Partial<Option>) => void
  onReorderOptions: (options: Option[]) => void
}

export const QuestionForm = ({
  testType,
  question,
  index,
  onUpdate,
  onRemove,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
  onReorderOptions,
}: QuestionFormProps) => {
  // 템플릿에 정의된 질문 키별 표준 옵션들
  const availableOptions = STANDARD_OPTIONS[question.question_key] || []

  // 현재 테스트 유형에 맞는 프리셋 옵션들
  const presetOptions = CATEGORIZED_PRESET_OPTIONS[testType] || []

  // 프리셋 선택 핸들러
  const handlePresetChange = (presetId: string) => {
    if (presetId === 'custom') return

    const preset = ALL_PRESETS.find((p) => p.question_key === presetId)
    if (preset) {
      onUpdate({
        question_key: preset.question_key,
        question_text: preset.question_text,
        selection_type: preset.selection_type,
        is_required: preset.is_required,
        options: preset.options,
      })
    }
  }

  return (
    <div className="border-gray-light rounded-[20px] border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-6 cursor-grab items-center justify-center text-gray-300 hover:text-gray-400 active:cursor-grabbing">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor">
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="2" cy="7" r="1.5" />
            <circle cx="2" cy="12" r="1.5" />
            <circle cx="2" cy="17" r="1.5" />
            <circle cx="6" cy="2" r="1.5" />
            <circle cx="6" cy="7" r="1.5" />
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="6" cy="17" r="1.5" />
          </svg>
        </div>

        <div className="bg-black-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
          {index + 1}
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <input
            type="text"
            value={question.question_text}
            onChange={(e) => onUpdate({ question_text: e.target.value })}
            placeholder="질문을 입력하세요"
            className="border-gray-light focus:border-black-primary w-full border-b py-2 text-lg font-medium outline-none"
          />
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="hover:text-danger cursor-pointer"
          aria-label="질문 삭제"
        >
          <TrashIcon width={20} height={20} />
        </button>
      </div>

      <div
        className="mb-6 flex items-center gap-10 pl-10"
        style={{ marginBottom: '24px' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-md text-gray font-bold">유형</span>
            <div className="min-w-[160px]">
              <AdminSelect
                width="w-full"
                options={presetOptions}
                value={
                  ALL_PRESETS.some(
                    (p) => p.question_key === question.question_key
                  )
                    ? question.question_key
                    : ''
                }
                onChange={handlePresetChange}
              />
            </div>
            {!ALL_PRESETS.some(
              (p) => p.question_key === question.question_key
            ) && (
              <span className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-400">
                {question.question_key}
              </span>
            )}
          </div>
        </div>

        {question.selection_type !== 'PHOTO' && (
          <div className="flex items-center gap-4">
            <label className="text-success text-[11px] font-bold tracking-tight uppercase">
              선택형태
            </label>
            <div className="flex gap-1">
              {[
                { label: '단일선택', value: 'SINGLE' },
                { label: '다중선택', value: 'MULTI' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate({ selection_type: opt.value as any })}
                  className={cn(
                    'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold',
                    question.selection_type === opt.value
                      ? 'bg-success border-success text-white'
                      : 'border-gray-light bg-white text-gray-400'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <label className="text-danger text-[11px] font-bold">필수여부</label>
          <div className="flex gap-1">
            {[
              { label: '필수', value: true },
              { label: '선택', value: false },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onUpdate({ is_required: opt.value })}
                className={cn(
                  'cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold',
                  question.is_required === opt.value
                    ? 'bg-danger border-danger text-white'
                    : 'border-gray-light text-gray bg-white'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {question.selection_type === 'PHOTO' ? (
        <div className="border-gray-light mt-4 rounded-xl border border-dashed bg-gray-50/50 p-10 text-center">
          <p className="text-gray text-sm">
            사용자가 사진을 업로드할 수 있는 영역입니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-gray text-xs font-bold">답변 선택지</label>
            <button
              onClick={onAddOption}
              className="text-black-primary cursor-pointer text-xs font-bold underline"
            >
              선택지 추가
            </button>
          </div>

          <Reorder.Group
            axis="y"
            values={question.options}
            onReorder={onReorderOptions}
            className="space-y-2"
          >
            {question.options.map((option, oIdx) => (
              <Reorder.Item
                key={option.key}
                value={option}
                className="flex items-center gap-3 bg-white"
                initial={false}
                transition={{ duration: 0 }}
              >
                <div className="flex h-10 w-6 cursor-grab items-center justify-center text-gray-300 hover:text-gray-400 active:cursor-grabbing">
                  <svg
                    width="12"
                    height="18"
                    viewBox="0 0 12 18"
                    fill="currentColor"
                  >
                    <circle cx="2" cy="2" r="1.5" />
                    <circle cx="2" cy="7" r="1.5" />
                    <circle cx="2" cy="12" r="1.5" />
                    <circle cx="2" cy="17" r="1.5" />
                    <circle cx="6" cy="2" r="1.5" />
                    <circle cx="6" cy="7" r="1.5" />
                    <circle cx="6" cy="12" r="1.5" />
                    <circle cx="6" cy="17" r="1.5" />
                  </svg>
                </div>

                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={option.answer_option_text}
                    onChange={(e) =>
                      onUpdateOption(option.key, {
                        answer_option_text: e.target.value,
                      })
                    }
                    placeholder={`선택지 ${oIdx + 1}`}
                    className="border-gray-light flex-1 rounded-xl border bg-gray-50/50 px-4 py-3 text-sm outline-none focus:border-violet-300 focus:bg-white"
                  />
                  <AdminSelect
                    width="w-[171px]"
                    options={availableOptions}
                    value={option.answer_option_key}
                    onChange={(val: string) => {
                      onUpdateOption(option.key, {
                        answer_option_key: val,
                      })
                    }}
                  />
                </div>
                <button
                  onClick={() => onRemoveOption(option.key)}
                  className="hover:text-danger cursor-pointer text-gray-300"
                >
                  <TrashIcon width={16} height={16} />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}
    </div>
  )
}
