'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ExitIcon from '@/assets/icons/exit.svg'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'

type WithdrawResponse = {
  success: boolean
  data?: null
  error?: {
    code?: string
    message?: string
  }
}

export type WithdrawModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)
  const openAlert = useModalStore((state) => state.openAlert)
  const [confirmText, setConfirmText] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigateToLogin = () => {
    router.replace('/login')
  }

  const handleWithdraw = async () => {
    if (confirmText.trim() !== '회원탈퇴') {
      setErrorMessage('확인 문구로 "회원탈퇴"를 정확히 입력해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      const response = await fetch('/api/v1/users/me', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ confirm_text: '회원탈퇴' }),
      })

      const result = (await response
        .json()
        .catch(() => null)) as WithdrawResponse | null

      if (!response.ok || !result?.success) {
        setErrorMessage(result?.error?.message ?? '회원 탈퇴에 실패했습니다.')
        return
      }

      await logout()
      onClose()
      openAlert({
        type: 'success',
        title: '회원 탈퇴 완료',
        content: '그동안 DeepScent를 이용해주셔서 감사합니다.',
        confirmText: '확인',
        onConfirm: navigateToLogin,
        onCancel: navigateToLogin,
      })
    } catch {
      setErrorMessage(
        '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center border-b border-[#f3f4f6] p-4">
        <ExitIcon className="bg-black-primary h-11 w-11 rounded-[14px] p-2.5 text-white" />
        <div className="ml-4">
          <h1 className="text-[20px] font-bold">회원 탈퇴</h1>
          <p className="text-gray-primary text-[14px]">
            서비스 이용을 종료하고 계정을 삭제합니다
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <Input
          className="w-99.5"
          placeholder="회원탈퇴"
          label="확인 문구"
          labelClassName="font-semibold text-[14px]"
          value={confirmText}
          onChange={(event) => setConfirmText(event.target.value)}
          status={errorMessage ? 'error' : 'default'}
          helperText={
            errorMessage ??
            '계정 삭제를 진행하려면 확인 문구로 회원탈퇴를 입력해주세요.'
          }
        />
        <Button
          size={'w398h52'}
          rounded={'md'}
          className="mt-4"
          onClick={handleWithdraw}
          disabled={isSubmitting}
        >
          탈퇴 하기
        </Button>
      </div>
    </>
  )
}
