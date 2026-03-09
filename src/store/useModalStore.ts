import { create } from 'zustand'
import React from 'react'
import { AlertConfig } from '@/components/common/Modal/AlertModal'

interface ModalState {
  isOpen: boolean
  content: React.ReactNode | null
  alertConfig: AlertConfig | null
}

interface ModalAction {
  openModal: (content: React.ReactNode) => void
  openAlert: (config: AlertConfig) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  // state
  isOpen: false,
  content: null,
  alertConfig: null,

  // action
  openModal: (content) => set({ isOpen: true, content, alertConfig: null }),
  openAlert: (config) =>
    set({ isOpen: true, alertConfig: config, content: null }),
  closeModal: () => set({ isOpen: false, content: null, alertConfig: null }),
}))
