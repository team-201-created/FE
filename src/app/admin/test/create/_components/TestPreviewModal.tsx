'use client'

import Modal from '@/components/common/Modal'
import { TestFormData } from '@/app/admin/test/create/_types'

const TYPE_LABEL: Record<string, string> = {
  PREFERENCE: '취향',
  HEALTH: '건강',
}

interface TestPreviewModalProps {
  formData: TestFormData
  onClose: () => void
}

export function TestPreviewModal({ formData, onClose }: TestPreviewModalProps) {
  return (
    <Modal isOpen onClose={onClose} size="lg" rounded="md">
      <Modal.Header>테스트 상세</Modal.Header>

      <Modal.Content className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
        {/* 기본 정보 */}
        <div className="rounded-2xl bg-gray-50 px-5 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-black-primary text-base font-bold">
              {formData.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                {TYPE_LABEL[formData.profiling_type]}
              </span>
            </div>
            {formData.description && (
              <p className="text-sm leading-relaxed text-gray-500">
                {formData.description}
              </p>
            )}
          </div>
        </div>

        {/* 질문 목록 */}
        {formData.questions.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-400">
            추가된 질문이 없습니다.
          </p>
        ) : (
          formData.questions.map((question, idx) => (
            <div
              key={question.key}
              className="border-gray-light flex flex-col gap-4 rounded-2xl border p-5"
            >
              {/* 질문 헤더 */}
              <div className="flex items-start gap-3">
                <span className="bg-black-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="no-wrap space-nowrap truncate font-semibold">
                    {question.question_text}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-black-secondary text-[11px] font-bold">
                      {question.selection_type === 'SINGLE'
                        ? '단일선택'
                        : '다중선택'}
                    </span>
                    {question.is_required && (
                      <span className="text-[11px] font-bold text-red-400">
                        필수
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 선택지 */}
              <div className="flex flex-col gap-2 pl-10">
                {question.options.length === 0 ? (
                  <p className="text-xs text-gray-400">선택지 없음</p>
                ) : (
                  question.options.map((option) => (
                    <label
                      key={option.key}
                      className={
                        'border-gray-light flex cursor-default items-center gap-3 rounded-xl border px-4 py-3 text-sm text-gray-700'
                      }
                    >
                      <input
                        type={
                          question.selection_type === 'SINGLE'
                            ? 'radio'
                            : 'checkbox'
                        }
                        disabled
                        className="accent-violet-500"
                      />
                      {option.answer_option_text || '(선택지 없음)'}
                    </label>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </Modal.Content>
    </Modal>
  )
}
