import { useRef, useEffect } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

interface UseModalProps {
  isOpen: boolean
  onClose: () => void
  outsideCloseEnabled?: boolean
  ignoreRefs?: Array<React.RefObject<HTMLElement | null>>
}

export function useModal({
  isOpen,
  onClose,
  outsideCloseEnabled = true,
  ignoreRefs = [],
}: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지
  useOutsideClick(modalRef, onClose, isOpen && outsideCloseEnabled, ignoreRefs)

  // 바디 스크롤 차단
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // ESC 키 처리
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  return {
    modalRef,
  }
}
