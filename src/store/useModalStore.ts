import { create } from 'zustand'
import React from 'react'
import { AlertConfig } from '@/components/common/Modal/AlertModal'

interface ModalData {
  content: React.ReactNode | null
  alertConfig: AlertConfig | null
  /** 모달이 닫힐 때(오버레이 클릭 또는 content에서 close 호출 시) 실행할 콜백 */
  onClose?: () => void
}

interface ModalState {
  modals: ModalData[]
}

interface ModalAction {
  /** 모달 콘텐츠 전달 시 GlobalModal에서 ModalPortal + ModalOverlay로 감싸서 렌더 */
  openModal: (content: React.ReactNode, onClose?: () => void) => void
  openAlert: (config: AlertConfig) => void
  closeModal: () => void
  closeAll: () => void
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  modals: [],

  openModal: (content, onClose) =>
    set((state) => ({
      modals: [...state.modals, { content, alertConfig: null, onClose }],
    })),
  openAlert: (config) =>
    set((state) => ({
      modals: [
        ...state.modals,
        { content: null, alertConfig: config, onClose: undefined },
      ],
    })),
  closeModal: () =>
    set((state) => {
      const current = state.modals[state.modals.length - 1]
      current?.onClose?.()
      return { modals: state.modals.slice(0, -1) }
    }),
  closeAll: () => set({ modals: [] }),
}))
