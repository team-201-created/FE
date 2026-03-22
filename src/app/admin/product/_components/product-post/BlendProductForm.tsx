'use client'

import { useState, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useModalStore } from '@/store/useModalStore'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'
import type { AdminElementListResponse } from '../../_types/AdminProductType'
import type { CreateBlendBody } from '../../_api/adminCreateProduct'
import { createBlendAction, patchBlendAction } from '../../_lib/productActions'
import { useImageUpload } from '../../_hooks/useImageUpload'
import { ImageUploadField } from './ImageUploadField'
import { CategoryMultiSelectWrapper } from './CategoryMultiSelectWrapper'
import { CategorySelectSkeleton } from './CategorySelectSkeleton'
import { ElementCheckboxList } from './ElementCheckboxList'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'
const REQUIRED_MARK = <span className="ml-0.5 text-red-500">*</span>

interface BlendProductFormProps {
  elementPromise: Promise<AdminElementListResponse | null>
  categoryPromise: Promise<AdminCategoryListResponse | null>
  onClose: () => void
  initialData?: {
    name: string
    description?: string
    blend_category_ids: number[]
    image_url: string
  }
  productId?: number
}

export function BlendProductForm({
  elementPromise,
  categoryPromise,
  onClose,
  initialData,
  productId,
}: BlendProductFormProps) {
  const { openAlert } = useModalStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<CreateBlendBody>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    blend_category_ids: initialData?.blend_category_ids ?? [],
    element_ids: [],
    image_url: undefined,
  })

  const {
    imagePreview,
    imageUrl,
    isPending,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
  } = useImageUpload(initialData?.image_url)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleElementId = (id: number) => {
    setData((prev) => {
      const isSelected = prev.element_ids.includes(id)
      if (isSelected)
        return {
          ...prev,
          element_ids: prev.element_ids.filter((v) => v !== id),
        }
      if (prev.element_ids.length >= 4) return prev
      return { ...prev, element_ids: [...prev.element_ids, id] }
    })
  }

  const handleSubmit = async () => {
    if (!data.name.trim()) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '조합명을 입력해주세요.',
      })
      return
    }
    if (data.blend_category_ids.length === 0) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '테마를 선택해주세요.',
      })
      return
    }
    if (data.element_ids.length !== 4) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '구성 단품을 반드시 4개 선택해주세요.',
      })
      return
    }
    if (!imageUrl) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '이미지를 업로드해주세요.',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const body = { ...data, image_url: imageUrl }
      const result = productId
        ? await patchBlendAction(productId, body)
        : await createBlendAction(body)

      if (!result.success) {
        openAlert({
          type: 'danger',
          title: result.message ?? (productId ? '수정 실패' : '등록 실패'),
          content:
            result.reason ??
            (productId
              ? '조합 수정 중 오류가 발생했습니다.'
              : '조합 등록 중 오류가 발생했습니다.'),
        })
        return
      }
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal.Content className="flex flex-col gap-3 text-sm">
        <label className={LABEL_CLASS}>
          <span>조합명{REQUIRED_MARK}</span>
          <Input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="조합명을 입력하세요 (예: 하트 시그널)"
          />
        </label>

        <label className={LABEL_CLASS}>
          설명
          <Input
            name="description"
            value={data.description ?? ''}
            onChange={handleChange}
            placeholder="조합에 대한 무드/설명을 입력하세요"
          />
        </label>

        <div className={LABEL_CLASS}>
          <span>테마 선택{REQUIRED_MARK}</span>
          <Suspense fallback={<CategorySelectSkeleton />}>
            <CategoryMultiSelectWrapper
              categoryPromise={categoryPromise}
              selectedIds={data.blend_category_ids}
              onChange={(ids) =>
                setData((prev) => ({ ...prev, blend_category_ids: ids }))
              }
              placeholder="테마를 선택하세요"
            />
          </Suspense>
        </div>

        <div className={LABEL_CLASS}>
          <span>
            구성 단품 선택{REQUIRED_MARK} (현재 {data.element_ids.length} / 4개)
          </span>
          <div className="border-gray-light grid h-40 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-2 font-normal">
            <ErrorBoundary
              fallback={
                <span className="text-danger col-span-2 my-auto text-center">
                  단품 목록을 불러오는 데 실패했습니다.
                </span>
              }
            >
              <Suspense
                fallback={
                  <span className="text-black-tertiary col-span-2 my-auto text-center">
                    단품 목록을 불러오는 중...
                  </span>
                }
              >
                <ElementCheckboxList
                  elementPromise={elementPromise}
                  selectedIds={data.element_ids}
                  onToggle={toggleElementId}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>

        <ImageUploadField
          fileInputRef={fileInputRef}
          imagePreview={imagePreview}
          imageUrl={imageUrl}
          isPending={isPending}
          onFileChange={handleImageChange}
          onRemove={handleRemoveImage}
        />
      </Modal.Content>

      <Modal.Footer className="flex justify-end gap-2 text-[16px]">
        <Button
          color="none"
          className="border-gray-light border"
          disabled={isSubmitting}
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={isPending || isSubmitting}
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" className="mx-auto" />
          ) : productId ? (
            '조합 수정'
          ) : (
            '조합 등록'
          )}
        </Button>
      </Modal.Footer>
    </>
  )
}
