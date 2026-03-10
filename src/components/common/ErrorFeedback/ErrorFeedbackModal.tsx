'use client'

import { ModalPortal } from '../Modal/ModalPortal'
import { AlertModal } from '../Modal/AlertModal'

type ErrorFeedbackModalProps = {
  message: string
  isOpen: boolean
  onClose: () => void
}

/**
 * API 에러 등 사용자 피드백용 에러 팝업
 * FetchError.message 또는 에러 메시지를 팝업으로 표시
 */
export function ErrorFeedbackModal({
  message,
  isOpen,
  onClose,
}: ErrorFeedbackModalProps) {
  if (!isOpen) return null

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <AlertModal
          isOpen
          onClose={onClose}
          type="danger"
          title="오류 발생"
          content={message}
          confirmText="확인"
          onConfirm={onClose}
        />
      </div>
    </ModalPortal>
  )
}
