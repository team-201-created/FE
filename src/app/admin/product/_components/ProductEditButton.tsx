'use client'

import { useState, Suspense } from 'react'
import Button from '@/components/common/Button'
import PenIcon from '@/assets/icons/pen.svg'
import Modal from '@/components/common/Modal/Modal'
import { useModalStore } from '@/store/useModalStore'
import { fetchAdminProductList } from '../_api/adminFetchProductList'
import {
  fetchElementDetailAction,
  fetchBlendDetailAction,
  fetchElementCategoriesAction,
  fetchBlendCategoriesAction,
} from '../_lib/productActions'
import { ElementProductForm } from './product-post/ElementProductForm'
import { BlendProductForm } from './product-post/BlendProductForm'
import type { ProductTabId } from '../_types/AdminProductType'

interface ProductEditButtonProps {
  type: ProductTabId
  id: number
}

export function ProductEditButton({ type, id }: ProductEditButtonProps) {
  const { openModal, closeModal, openAlert } = useModalStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async () => {
    setIsLoading(true)
    try {
      if (type === 'ELEMENT') {
        const [detailRes, categoryRes] = await Promise.all([
          fetchElementDetailAction(id),
          fetchElementCategoriesAction(),
        ])
        const item = detailRes.data

        openModal(
          <Suspense fallback={null}>
            <Modal isOpen onClose={closeModal} size="md" overflowVisible>
              <Modal.Header>단품 수정</Modal.Header>
              <ElementProductForm
                categoryPromise={Promise.resolve(categoryRes)}
                onClose={closeModal}
                initialData={{
                  name: item.name,
                  description: item.description ?? '',
                  category_id: item.element_category.id,
                  image_url: item.image_url,
                }}
                productId={id}
              />
            </Modal>
          </Suspense>
        )
      } else {
        const [detailRes, categoryRes, elementRes] = await Promise.all([
          fetchBlendDetailAction(id),
          fetchBlendCategoriesAction(),
          fetchAdminProductList('ELEMENT', { size: 50 }),
        ])
        const item = detailRes.data

        openModal(
          <Suspense fallback={null}>
            <Modal isOpen onClose={closeModal} size="md" overflowVisible>
              <Modal.Header>조합 수정</Modal.Header>
              <BlendProductForm
                elementPromise={Promise.resolve(elementRes)}
                categoryPromise={Promise.resolve(categoryRes)}
                onClose={closeModal}
                initialData={{
                  name: item.name,
                  description: item.description ?? '',
                  blend_category_ids: item.blend_categories.map((c) => c.id),
                  image_url: item.image_url,
                }}
                productId={id}
              />
            </Modal>
          </Suspense>
        )
      }
    } catch {
      openAlert({
        type: 'danger',
        title: '불러오기 실패',
        content: '상품 정보를 불러오지 못했습니다.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      color="none"
      size="w32h32"
      rounded="sm"
      onClick={(e) => {
        e.stopPropagation()
        handleEdit()
      }}
      disabled={isLoading}
    >
      <PenIcon width={16} height={16} className="text-gray-secondary" />
    </Button>
  )
}
