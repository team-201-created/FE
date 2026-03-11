'use client'

import React, { useState, use, Suspense } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import { useModalStore } from '@/store/useModalStore'
import type {
  ProductTabId,
  AdminElementListResponse,
} from '../_types/AdminProductType'
import Input from '@/components/common/Input'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'
const INPUT_CLASS =
  'border-gray-light focus:border-black-primary rounded-md border p-2 focus:outline-none'

interface ProductPostModalProps {
  activeTab: ProductTabId
  elementPromise: Promise<AdminElementListResponse | null>
}

export const ProductPostModal = ({
  activeTab,
  elementPromise,
}: ProductPostModalProps) => {
  const { closeModal, openAlert } = useModalStore()
  const isElement = activeTab === 'ELEMENT'

  // 단품
  const [elementData, setElementData] = useState({
    name: '',
    description: '',
    category_id: '', // TODO: 카테고리 목록 불러오는 로직 적용 후 선택 가능하게
    // image_urls: '', // TODO: 이후 S3 업로드 로직으로 교체
  })

  // 조합
  const [blendData, setBlendData] = useState({
    name: '',
    description: '',
    blend_categories_text: '',
    element_ids: [] as number[], // 선택된 단품 ID 4개
    // image_url: '', // TODO: 이후 S3 업로드 로직으로 교체
  })

  // 단품 핸들러
  const handleElementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setElementData((prev) => ({ ...prev, [name]: value }))
  }

  // 조합 핸들러
  const handleBlendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlendData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleElementId = (id: number) => {
    setBlendData((prev) => {
      const isSelected = prev.element_ids.includes(id)
      let newIds = prev.element_ids
      if (isSelected) {
        newIds = newIds.filter((v) => v !== id)
      } else {
        if (newIds.length >= 4) {
          return prev
        }
        newIds = [...newIds, id]
      }
      return { ...prev, element_ids: newIds }
    })
  }

  const handleRegister = () => {
    if (isElement) {
      const submitElementData = {
        name: elementData.name,
        // image_url: [] // TODO: S3 연동
        description: elementData.description ?? '',
        category_id: Number(elementData.category_id),
      }
      console.log(`단품 입력 : `, submitElementData)
    } else {
      const submitBlendData = {
        name: blendData.name,
        // image_url: '' // TODO: S3 연동
        description: blendData.description ?? '',
        blend_category_ids: blendData.blend_categories_text
          .split(',')
          .map((v) => Number(v.trim())),
        element_ids: blendData.element_ids,
      }

      if (submitBlendData.element_ids.length !== 4) {
        openAlert({
          type: 'danger',
          title: '선택 오류',
          content: '단품을 반드시 4개 선택해주세요.',
        })
        return
      }
      console.log(`조합 입력 : `, submitBlendData)
    }
    closeModal()
  }

  return (
    <Modal isOpen onClose={closeModal} size="md">
      <Modal.Header>{isElement ? '단품' : '조합'} 등록</Modal.Header>

      <Modal.Content className="flex flex-col gap-3 text-sm">
        {isElement ? (
          <>
            <label className={LABEL_CLASS}>
              단품명
              <Input
                name="name"
                value={elementData.name}
                onChange={handleElementChange}
                placeholder="단품명을 입력하세요"
              />
            </label>

            <label className={LABEL_CLASS}>
              설명
              <Input
                name="description"
                value={elementData.description}
                onChange={handleElementChange}
                placeholder="상품에 대한 설명을 입력하세요"
              />
            </label>

            <label className={LABEL_CLASS}>
              향조 선택
              <Input
                name="category_id"
                type="number"
                value={elementData.category_id}
                onChange={handleElementChange}
                placeholder=""
              />
            </label>

            <div>이미지 업로드는 추후 S3 연동 시 추가예정</div>
          </>
        ) : (
          <>
            <label className={LABEL_CLASS}>
              조합명
              <Input
                name="name"
                value={blendData.name}
                onChange={handleBlendChange}
                placeholder="조합명을 입력하세요 (예: 하트 시그널)"
              />
            </label>

            <label className={LABEL_CLASS}>
              설명
              <Input
                name="description"
                value={blendData.description}
                onChange={handleBlendChange}
                placeholder="조합에 대한 무드/설명을 입력하세요"
              />
            </label>

            <label className={LABEL_CLASS}>
              테마 선택
              <Input
                name="blend_categories_text"
                value={blendData.blend_categories_text}
                onChange={handleBlendChange}
                placeholder=""
              />
            </label>

            <div className={LABEL_CLASS}>
              구성 단품 선택 (현재 {blendData.element_ids.length} / 4개)
              <div className="border-gray-light grid h-40 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-2 font-normal">
                <Suspense
                  fallback={
                    <span className="col-span-2 my-auto text-center text-xs">
                      단품 목록을 불러오는 중...
                    </span>
                  }
                >
                  {elementPromise && (
                    <ElementCheckboxList
                      elementPromise={elementPromise}
                      selectedIds={blendData.element_ids}
                      onToggle={toggleElementId}
                    />
                  )}
                </Suspense>
              </div>
            </div>

            <div>이미지 업로드는 추후 S3 연동 시 추가예정</div>
          </>
        )}
      </Modal.Content>

      <Modal.Footer className="flex justify-end gap-2 text-[16px]">
        <Button
          color="none"
          className="border-gray-light border"
          onClick={closeModal}
        >
          취소
        </Button>
        <Button color="primary" onClick={handleRegister}>
          {isElement ? '단품' : '조합'} 등록
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function ElementCheckboxList({
  elementPromise,
  selectedIds,
  onToggle,
}: {
  elementPromise: Promise<AdminElementListResponse | null>
  selectedIds: number[]
  onToggle: (id: number) => void
}) {
  const elementResponse = use(elementPromise)
  const elementList = elementResponse?.data?.results || []

  if (elementList.length === 0) {
    return (
      <span className="col-span-2 my-auto text-center text-xs">
        등록된 단품 데이터가 없습니다.
      </span>
    )
  }

  return (
    <>
      {elementList.map((el) => {
        const isChecked = selectedIds.includes(el.id)
        return (
          <label
            key={el.id}
            className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-neutral-50"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(el.id)}
              className="accent-black-primary"
            />
            <span className="truncate text-xs">
              {el.name} (ID: {el.id})
            </span>
          </label>
        )
      })}
    </>
  )
}
