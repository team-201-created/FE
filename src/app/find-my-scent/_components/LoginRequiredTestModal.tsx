'use client'

/**
 * 비회원 테스트 진입 시 — 공통 ErrorFeedback/Alert 수정 없이 사용.
 * body 로 포털 + min-h-dvh flex 로 뷰포트 정중앙 정렬 (modal-root / absolute 한계 회피).
 */
import { createPortal } from 'react-dom'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import AlertDangerIcon from '@/assets/icons/alertDanger.svg'

const REDIRECT_MS = 3000
const MODAL_Z = 100

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

type LoginRequiredTestModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function LoginRequiredTestModal({
  isOpen,
  onClose,
}: LoginRequiredTestModalProps) {
  const router = useRouter()
  const mounted = useIsClient()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const goLogin = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    onCloseRef.current()
    router.push('/login')
  }

  useEffect(() => {
    if (!isOpen) return
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      onCloseRef.current()
      router.push('/login')
    }, REDIRECT_MS)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isOpen, router])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 overflow-y-auto bg-black/40 [scrollbar-gutter:stable]"
      style={{ zIndex: MODAL_Z }}
    >
      <div
        className="flex min-h-[100dvh] w-full items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) goLogin()
        }}
        role="presentation"
      >
        {/*
          Modal(size md)은 max-w-[448px]라 부모가 더 넓으면 블록 기본 정렬로 왼쪽에 붙음 → flex justify-center 로 수평 중앙.
          100vw는 스크롤바 포함 너비라 시각적으로 한쪽으로 치우쳐 보일 수 있어 사용하지 않음.
        */}
        <div
          className="box-border flex w-full max-w-[672px] shrink-0 justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-required-test-title"
          onClick={(e) => e.stopPropagation()}
        >
          <Modal isOpen onClose={goLogin} size="md" showCloseButton>
            <div className="bg-danger absolute h-[6px] w-full" />

            <div className="flex flex-col items-center px-6 pt-12 pb-8">
              <div className="text-danger bg-danger/10 mb-6 flex h-18 w-18 items-center justify-center rounded-full">
                <AlertDangerIcon width={40} height={40} />
              </div>

              <h2
                id="login-required-test-title"
                className="mb-2 text-center text-xl font-bold text-black"
              >
                회원만 접근 가능합니다
              </h2>
              <div className="mb-8 text-center text-sm leading-relaxed whitespace-pre-wrap text-gray-500">
                로그인먼저 해주세요.
              </div>

              <div className="flex w-full gap-3">
                <Button
                  color="danger"
                  size="none"
                  className="flex-1 rounded-[14px] border border-transparent py-3 font-semibold"
                  onClick={goLogin}
                >
                  로그인하기
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>,
    document.body
  )
}
