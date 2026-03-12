'use client'

import { useModalStore } from '@/store/useModalStore'
import { ModalOverlay, ModalPortal } from '../Modal'
import { AlertModal } from '../Modal/AlertModal'

type ErrorFeedbackModalProps = {
  message: string
  /** legacy: isOpen/onClose 둘 다 주면 Portal+Overlay 직접 렌더. 없으면 openModal(content)용 콘텐츠만 렌더 */
  isOpen?: boolean
  onClose?: () => void
}

/**
 * API 에러 등 사용자 피드백용 에러 팝업
 * - openModal(<ErrorFeedbackModal message={msg} />, () => setError(null)) → GlobalModal이 Portal+Overlay 적용
 * - <ErrorFeedbackModal isOpen onClose={...} message={msg} /> → 기존처럼 자체 Portal+Overlay
 */
export function ErrorFeedbackModal({
  message,
  isOpen,
  onClose,
}: ErrorFeedbackModalProps) {
  const { closeModal } = useModalStore()
  const handleClose = onClose ?? closeModal

  if (isOpen === false) return null

  const alert = (
    <AlertModal
      isOpen
      onClose={handleClose}
      type="danger"
      title="오류 발생"
      content={message}
      confirmText="확인"
      onConfirm={handleClose}
    />
  )

  if (isOpen === true && onClose != null) {
    return (
      <ModalPortal>
        <ModalOverlay onClose={handleClose}>
          <div onClick={(e) => e.stopPropagation()}>{alert}</div>
        </ModalOverlay>
      </ModalPortal>
    )
  }

  return alert
}
