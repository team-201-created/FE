import { useRef, useEffect } from 'react'

interface UseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function useModal({ isOpen, onClose }: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

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
