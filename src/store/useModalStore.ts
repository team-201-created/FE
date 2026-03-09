import { create } from 'zustand'
import React from 'react'
import { AlertConfig } from '@/components/common/Modal/AlertModal'

interface ModalData {
  content: React.ReactNode | null
  alertConfig: AlertConfig | null
}

interface ModalState {
  modals: ModalData[]
}

interface ModalAction {
  openModal: (content: React.ReactNode) => void
  openAlert: (config: AlertConfig) => void
  closeModal: () => void
  closeAll: () => void
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  // state
  modals: [],

  // action
  openModal: (content) =>
    set((state) => ({
      modals: [...state.modals, { content, alertConfig: null }],
    })),
  openAlert: (config) =>
    set((state) => ({
      modals: [...state.modals, { content: null, alertConfig: config }],
    })),
  closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
  closeAll: () => set({ modals: [] }),
}))
