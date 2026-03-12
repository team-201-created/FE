'use client'

import React from 'react'
import { useModalStore } from '@/store/useModalStore'
import { AlertModal } from './AlertModal'
import { ModalOverlay } from './ModalOverlay'
import { ModalPortal } from './ModalPortal'

/** openModal로 전달한 콘텐츠는 ModalPortal + ModalOverlay로 자동 감싸져 렌더됨 */
export const GlobalModal = () => {
  const { modals, closeModal } = useModalStore()

  if (modals.length === 0) return null

  return (
    <ModalPortal>
      {modals.map((modal, index) => {
        const zIndex = 100 + index
        const handleOverlayClose = () => {
          modal.onClose?.()
          closeModal()
        }
        return (
          <div
            key={index}
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex }}
          >
            <ModalOverlay onClose={handleOverlayClose}>
              {modal.alertConfig ? (
                <div onClick={(e) => e.stopPropagation()}>
                  <AlertModal
                    isOpen
                    onClose={closeModal}
                    {...modal.alertConfig}
                  />
                </div>
              ) : modal.content ? (
                <div onClick={(e) => e.stopPropagation()}>{modal.content}</div>
              ) : null}
            </ModalOverlay>
          </div>
        )
      })}
    </ModalPortal>
  )
}
