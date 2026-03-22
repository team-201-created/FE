'use client'

import React, { use, useState } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useModalStore } from '@/store/useModalStore'
import type {
  AdminCategoryListResponse,
  RootCategory,
} from '@/app/admin/category/_types/AdminCategoryType'
import { postCategoryAction } from '@/app/admin/category/_lib/categoryAction'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'

export function CategoryPostModal({
  rootCategory,
  categoryResponsePromise,
}: {
  rootCategory: RootCategory
  categoryResponsePromise: Promise<AdminCategoryListResponse>
}) {
  const categoryResponse = use(categoryResponsePromise)
  const rootCategoryId = categoryResponse?.data?.categories?.[0]?.category_id

  const { closeModal, openAlert } = useModalStore()
  const [nameKr, setNameKr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isElement = rootCategory === 'element'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameKr || !nameEn || rootCategoryId === undefined) return

    if (nameEn.includes(' ')) {
      openAlert({
        type: 'danger',
        title: '영문명 오류',
        content: '영문명에 공백이 포함되어 있습니다. 공백을 제거해 주세요.',
        confirmText: '확인',
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await postCategoryAction(rootCategory, {
        parent_id: rootCategoryId,
        level: '소분류',
        name: {
          kr: nameKr,
          en: nameEn,
        },
      })

      if (result.success) {
        closeModal()
      } else {
        openAlert({
          type: 'danger',
          title: result.message ?? '카테고리 등록 실패',
          content:
            result.reason ??
            '카테고리 등록에 실패했습니다. 다시 시도해 주세요.',
          confirmText: '확인',
        })
      }
    } catch {
      openAlert({
        type: 'danger',
        title: '카테고리 등록 실패',
        content: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.',
        confirmText: '확인',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen onClose={closeModal} size="md">
      <Modal.Header>{isElement ? '단품' : '조합'} 카테고리 등록</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content className="flex flex-col gap-3 text-sm">
          <label className={LABEL_CLASS}>
            {isElement ? '향조' : '테마'} 명 (kr)
            <Input
              value={nameKr}
              placeholder="한글로 입력하세요"
              onChange={(e) => {
                const value = e.target.value.replace(
                  /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/g,
                  ''
                )
                setNameKr(value)
              }}
              required
            />
          </label>

          <label className={LABEL_CLASS}>
            {isElement ? '향조' : '테마'} 명 (en)
            <Input
              value={nameEn}
              placeholder="영문으로 입력하세요"
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
                setNameEn(value)
              }}
              required
            />
          </label>
        </Modal.Content>
        <Modal.Footer className="flex justify-end gap-2">
          <Button
            type="button"
            color="none"
            onClick={closeModal}
            disabled={isLoading}
            className="border-gray-light border"
          >
            취소
          </Button>
          <Button type="submit" color="primary" disabled={isLoading}>
            {isLoading ? '등록 중...' : '등록'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
