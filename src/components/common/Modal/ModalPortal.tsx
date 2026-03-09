'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (typeof window === 'undefined' || !mounted) return null

  const modalRoot = document.getElementById('modal-root')

  if (!modalRoot) {
    return null
  }

  return createPortal(children, modalRoot)
}
