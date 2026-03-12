'use client'

import React, { useState } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useModalStore } from '@/store/useModalStore'
import type { CategoryTabId } from '../_types/AdminCategoryType'
import { postCategoryAction } from '../_lib/postCategoryAction'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'

export function CategoryPostModal({
  activeTab,
  onSuccess,
}: {
  activeTab: CategoryTabId
  onSuccess: () => void
}) {
  const { closeModal } = useModalStore()
  const [nameKr, setNameKr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isElement = activeTab === 'Element'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameKr || !nameEn) return

    setIsLoading(true)
    try {
      const parent_id = activeTab === 'Element' ? 1 : 2

      const result = await postCategoryAction({
        parent_id,
        level: '중분류',
        name: {
          kr: nameKr,
          en: nameEn,
        },
      })

      if (result.success) {
        onSuccess() // 추가적인 클라이언트 로직이 필요할 경우 호출
        closeModal()
        setNameKr('')
        setNameEn('')
      }
    } catch {
      // 여기서는 로딩 해제만
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
