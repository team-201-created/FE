'use client'

import { ModalOverlay, ModalPortal } from '../Modal'
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
      <ModalOverlay onClose={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
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
      </ModalOverlay>
    </ModalPortal>
  )
}
