'use client'

import { useState, Suspense } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useModalStore } from '@/store/useModalStore'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'
import type { CreateElementBody } from '../../_api/adminCreateProduct'
import {
  createElementAction,
  patchElementAction,
} from '../../_lib/productActions'
import { useImageUpload } from '../../_hooks/useImageUpload'
import { ImageUploadField } from './ImageUploadField'
import { CategorySelectWrapper } from './CategorySelectWrapper'
import { CategorySelectSkeleton } from './CategorySelectSkeleton'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'
const REQUIRED_MARK = <span className="ml-0.5 text-red-500">*</span>

interface ElementProductFormProps {
  categoryPromise: Promise<AdminCategoryListResponse | null>
  onClose: () => void
  initialData?: {
    name: string
    description?: string
    category_id: number
    image_url: string
  }
  productId?: number
}

export function ElementProductForm({
  categoryPromise,
  onClose,
  initialData,
  productId,
}: ElementProductFormProps) {
  const { openAlert } = useModalStore()
  const [data, setData] = useState<CreateElementBody>({
    name: initialData?.name ?? '',
    description: initialData?.description ?? '',
    category_id: initialData?.category_id ?? 0,
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

  const handleSubmit = async () => {
    if (!data.name.trim()) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '단품명을 입력해주세요.',
      })
      return
    }
    if (!data.category_id) {
      openAlert({
        type: 'danger',
        title: '입력 오류',
        content: '향조를 선택해주세요.',
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

    const body = { ...data, image_url: imageUrl }
    const result = productId
      ? await patchElementAction(productId, body)
      : await createElementAction(body)

    if (!result.success) {
      openAlert({
        type: 'danger',
        title: result.message ?? (productId ? '수정 실패' : '등록 실패'),
        content:
          result.reason ??
          (productId
            ? '단품 수정 중 오류가 발생했습니다.'
            : '단품 등록 중 오류가 발생했습니다.'),
      })
      return
    }
    onClose()
  }

  return (
    <>
      <Modal.Content className="flex flex-col gap-3 text-sm">
        <label className={LABEL_CLASS}>
          <span>단품명{REQUIRED_MARK}</span>
          <Input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="단품명을 입력하세요"
          />
        </label>

        <label className={LABEL_CLASS}>
          설명
          <Input
            name="description"
            value={data.description ?? ''}
            onChange={handleChange}
            placeholder="상품에 대한 설명을 입력하세요"
          />
        </label>

        <div className={LABEL_CLASS}>
          <span>향조 선택{REQUIRED_MARK}</span>
          <Suspense fallback={<CategorySelectSkeleton />}>
            <CategorySelectWrapper
              categoryPromise={categoryPromise}
              value={String(data.category_id || '')}
              onChange={(v) =>
                setData((prev) => ({ ...prev, category_id: Number(v) }))
              }
              placeholder="향조를 선택하세요"
            />
          </Suspense>
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
          onClick={onClose}
        >
          취소
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={isPending}>
          {productId ? '단품 수정' : '단품 등록'}
        </Button>
      </Modal.Footer>
    </>
  )
}
