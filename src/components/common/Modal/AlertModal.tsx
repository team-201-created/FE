'use client'

import React from 'react'
import Modal from './Modal'
import Button from '../Button'
import AlertDangerIcon from '@/assets/icons/alertDanger.svg'
import AlertSuccessIcon from '@/assets/icons/alertSuccess.svg'

export interface AlertConfig {
  type: 'success' | 'danger'
  title: string
  content?: React.ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export interface AlertModalProps extends AlertConfig {
  isOpen: boolean
  onClose: () => void
}

export function AlertModal({
  isOpen,
  onClose,
  type,
  title,
  content,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}: AlertModalProps) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    else onClose()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    else onClose()
  }

  const isDanger = type === 'danger'

  const TopBorderStyle = isDanger ? 'bg-danger' : 'bg-success'
  const IconBgStyle = isDanger ? 'bg-danger/10' : 'bg-success/10'
  const IconColorStyle = isDanger ? 'text-danger' : 'text-success'

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size="sm"
      showCloseButton
      className="overflow-hidden p-0"
    >
      <div
        className={`absolute top-0 right-0 left-0 h-[6px] ${TopBorderStyle}`}
      />

      <div className="flex flex-col items-center px-6 pt-12 pb-8">
        <div
          className={`mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full ${IconBgStyle} ${IconColorStyle}`}
        >
          {isDanger ? (
            <AlertDangerIcon width={40} height={40} />
          ) : (
            <AlertSuccessIcon width={40} height={40} />
          )}
        </div>

        <h2 className="mb-2 text-center text-[18px] font-bold text-black">
          {title}
        </h2>
        {content && (
          <div className="mb-8 text-center text-[14px] whitespace-pre-wrap text-gray-500">
            {content}
          </div>
        )}

        <div className="flex w-full gap-3">
          {cancelText && (
            <Button
              color="none"
              size="none"
              className="flex-1 rounded-[14px] border border-gray-200 bg-gray-50 py-3 font-semibold text-gray-600 hover:bg-gray-100"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}
          <Button
            color={isDanger ? 'danger' : 'success'}
            size="none"
            className="flex-1 rounded-[14px] py-3 font-semibold"
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
