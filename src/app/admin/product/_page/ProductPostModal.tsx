'use client'

import Modal from '@/components/common/Modal/Modal'
import { useModalStore } from '@/store/useModalStore'
import type {
  ProductTabId,
  AdminElementListResponse,
} from '@/app/admin/product/_types/AdminProductType'
import type { AdminCategoryListResponse } from '@/app/admin/category/_types/AdminCategoryType'
import { ElementProductForm } from '@/app/admin/product/_components/product-post/ElementProductForm'
import { BlendProductForm } from '@/app/admin/product/_components/product-post/BlendProductForm'

interface ProductPostModalProps {
  activeTab: ProductTabId
  elementPromiseForBlend: Promise<AdminElementListResponse | null>
  categoryPromiseForElement: Promise<AdminCategoryListResponse | null>
  categoryPromiseForBlend: Promise<AdminCategoryListResponse | null>
}

export const ProductPostModal = ({
  activeTab,
  elementPromiseForBlend,
  categoryPromiseForElement,
  categoryPromiseForBlend,
}: ProductPostModalProps) => {
  const { closeModal } = useModalStore()
  const isElement = activeTab === 'ELEMENT'

  return (
    <Modal isOpen onClose={closeModal} size="md" overflowVisible>
      <Modal.Header>{isElement ? '단품' : '조합'} 등록</Modal.Header>
      {isElement ? (
        <ElementProductForm
          categoryPromise={categoryPromiseForElement}
          onClose={closeModal}
        />
      ) : (
        <BlendProductForm
          elementPromise={elementPromiseForBlend}
          categoryPromise={categoryPromiseForBlend}
          onClose={closeModal}
        />
      )}
    </Modal>
  )
}
