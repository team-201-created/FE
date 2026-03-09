'use client'

import React from 'react'
import { useModalStore } from '@/store/useModalStore'
import { AlertModal } from './AlertModal'
import { ModalPortal } from './ModalPortal'

export const GlobalModal = () => {
  const { modals, closeModal } = useModalStore()

  if (modals.length === 0) return null

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50">
        {' '}
        {/* 헤더가 z-50이라 default 50으로 설정 */}
        <div className="relative flex h-full items-center justify-center">
          {modals.map((modal, index) => {
            const baseZIndex = 51 + index
            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center px-4 ${
                  index === 0
                    ? 'bg-black/40 backdrop-blur-[1px]'
                    : 'bg-black/20'
                }`}
                style={{ zIndex: baseZIndex }}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) {
                    closeModal()
                  }
                }}
              >
                {modal.alertConfig ? (
                  <AlertModal
                    isOpen
                    onClose={closeModal}
                    {...modal.alertConfig}
                  />
                ) : modal.content ? (
                  <>{modal.content}</>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </ModalPortal>
  )
}
