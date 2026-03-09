'use client'

import React from 'react'
import { useModalStore } from '@/store/useModalStore'
import { AlertModal } from './AlertModal'

export const GlobalModal = () => {
  const { isOpen, content, alertConfig, closeModal } = useModalStore()

  if (!isOpen) return null

  return (
    <>
      {alertConfig ? (
        <AlertModal isOpen onClose={closeModal} {...alertConfig} />
      ) : content ? (
        <>{content}</>
      ) : null}
    </>
  )
}
