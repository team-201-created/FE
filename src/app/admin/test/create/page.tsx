'use client'

import Link from 'next/link'
import { Reorder } from 'motion/react'
import {
  AdminListCard,
  AdminPageHeader,
  AdminTabGroup,
} from '@/app/admin/_components'
import Button from '@/components/common/Button'
import { useTestCreate } from '@/app/admin/test/create/_hooks'
import { QuestionForm } from '@/app/admin/test/create/_components'
import { Question } from '@/app/admin/test/create/_types'
import { TEST_TYPE_TABS } from '@/app/admin/test/create/_constants'

export default function TestCreatePage() {
  const { state, actions } = useTestCreate()

  return (
    <div className="flex flex-col gap-8">
      <AdminPageHeader
        title="새 테스트 생성"
        leftContent={
          <Link
            href="/admin/test"
            className="text-black-primary text-sm font-semibold underline"
          >
            목록으로 돌아가기
          </Link>
        }
        rightContent={
          <div className="flex items-center gap-2">
            <Button
              rounded="sm"
              className="border-gray-light text-black-primary border bg-white font-bold"
            >
              미리보기
            </Button>
            <Button color="primary" rounded="sm" onClick={actions.handleSave}>
              저장
            </Button>
          </div>
        }
        containerClassName="rounded-[20px] bg-white p-8 m-0"
      />

      <AdminListCard>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <span className="text-black-primary text-lg font-bold">
                기본 정보
              </span>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-500">
                테스트 이름
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={state.formData.name}
                onChange={(e) => actions.updateField('name', e.target.value)}
                placeholder="테스트 이름을 입력하세요 ex) 취향 테스트 v1.1"
                className="border-gray-light w-full rounded-2xl border bg-gray-50/50 p-4 text-sm outline-none focus:border-violet-300 focus:bg-white"
              />
            </div>

            <div className="space-y-4">
              <div className="mb-2 flex gap-2">
                <label className="text-sm font-bold text-gray-500">
                  테스트 유형
                </label>
                <span className="text-red-500">*</span>
              </div>
              <AdminTabGroup
                tabs={TEST_TYPE_TABS}
                activeTab={state.uiCategory}
                onChange={(id) => actions.updateCategory(id)}
                fullWidth
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between text-sm font-bold text-gray-500">
                테스트 설명 (선택)
                <span className="text-xs font-normal text-gray-400">
                  {state.formData.description.length}/100
                </span>
              </label>
              <textarea
                value={state.formData.description}
                onChange={(e) =>
                  actions.updateField('description', e.target.value)
                }
                placeholder="테스트에 대한 간단한 설명을 입력하세요"
                className="border-gray-light min-h-[120px] w-full rounded-2xl border bg-gray-50/50 p-6 text-sm outline-none focus:border-violet-300 focus:bg-white"
                maxLength={100}
              />
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
            <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-800 text-xs font-bold text-blue-800">
              i
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-blue-900">
                노출 상태 안내
              </h4>
              <p className="text-xs leading-relaxed text-blue-700 opacity-80">
                새로 생성되는 테스트는 기본적으로{' '}
                <span className="font-bold underline">비노출</span> 상태로
                저장됩니다. 노출 설정은 목록에서 변경할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </AdminListCard>

      <AdminListCard>
        <div className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <h3 className="text-black-primary text-xl font-bold">
              테스트 질문
            </h3>
            <Button
              onClick={actions.question.add}
              color="primary"
              className="flex items-center gap-2 rounded-xl border-none bg-violet-100 px-6 py-2.5 font-bold text-violet-700 shadow-sm hover:bg-violet-200"
            >
              질문 추가
            </Button>
          </div>

          {state.formData.questions.length === 0 ? (
            <div className="border-gray-light flex min-h-[160px] flex-col items-center justify-center rounded-[20px] border-2 border-dashed bg-gray-50/30 text-center">
              <p className="text-sm text-gray-400">
                아직 추가된 질문이 없습니다.
              </p>
              <p className="mt-1 text-xs text-gray-400 opacity-70">
                위의 질문 추가 버튼을 클릭하여 질문을 만들어보세요.
              </p>
            </div>
          ) : (
            <Reorder.Group
              axis="y"
              values={state.formData.questions}
              onReorder={actions.question.reorder}
              className="flex flex-col gap-6"
            >
              {state.formData.questions.map(
                (question: Question, index: number) => (
                  <Reorder.Item
                    key={question.key}
                    value={question}
                    className="cursor-default"
                    initial={false}
                    transition={{ duration: 0 }}
                  >
                    <QuestionForm
                      testType={state.uiCategory}
                      question={question}
                      index={index}
                      onUpdate={(updates) =>
                        actions.question.update(question.key, updates)
                      }
                      onRemove={() => actions.question.remove(question.key)}
                      onAddOption={() => actions.option.add(question.key)}
                      onRemoveOption={(optKey) =>
                        actions.option.remove(question.key, optKey)
                      }
                      onUpdateOption={(optKey, updates) =>
                        actions.option.update(question.key, optKey, updates)
                      }
                      onReorderOptions={(newOptions) =>
                        actions.option.reorder(question.key, newOptions)
                      }
                    />
                  </Reorder.Item>
                )
              )}
            </Reorder.Group>
          )}
        </div>
      </AdminListCard>
    </div>
  )
}
