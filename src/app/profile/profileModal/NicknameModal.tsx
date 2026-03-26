'use client'
import { useState } from 'react'
import ManageProfileIcon from '@/assets/icons/manageProfile.svg'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import { writeStoredUser } from '@/lib/auth/userClient'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'

type NicknameUpdateResponse = {
  success: boolean
  data?: {
    id: number
    nickname: string
    updated_at: string
  }
  error?: {
    code?: string
    message?: string
  }
}

const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣]{2,8}$/
const NICKNAME_RULE_MESSAGE =
  '닉네임은 2~8글자의 영어, 숫자, 한글(완성형)만 사용할 수 있습니다.'

export type NicknameModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function NicknameModal({
  isOpen: _isOpen,
  onClose,
}: NicknameModalProps) {
  const user = useAuthStore((state) => state.user)
  const [newNickname, setNewNickname] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const openAlert = useModalStore((state) => state.openAlert)

  const currentNickname = user?.nickname ?? 'Ozent 사용자'

  const handleSubmit = async () => {
    const trimmedNickname = newNickname.trim()

    if (!trimmedNickname) {
      setErrorMessage('새 닉네임을 입력해주세요.')
      return
    }

    if (!NICKNAME_PATTERN.test(trimmedNickname)) {
      setErrorMessage(NICKNAME_RULE_MESSAGE)
      return
    }

    if (trimmedNickname === currentNickname) {
      setErrorMessage('현재 닉네임과 동일합니다.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      const response = await fetch('/api/v1/users/me/nickname', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ nickname: trimmedNickname }),
      })

      const result = (await response
        .json()
        .catch(() => null)) as NicknameUpdateResponse | null

      if (!response.ok || !result?.success || !result.data) {
        setErrorMessage(result?.error?.message ?? '닉네임 변경에 실패했습니다.')
        return
      }

      useAuthStore.setState((state) => {
        const nextUser = state.user
          ? { ...state.user, nickname: result.data!.nickname }
          : state.user

        if (nextUser) {
          writeStoredUser(nextUser)
        }

        return { user: nextUser }
      })

      onClose()
      openAlert({
        type: 'success',
        title: '닉네임 변경 완료',
        content: '새 닉네임이 정상적으로 반영되었습니다.',
        confirmText: '확인',
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
        <ManageProfileIcon className="bg-black-primary h-11 w-11 rounded-[14px] p-2.5 text-white" />
        <div className="ml-4">
          <h1 className="text-[20px] font-bold">닉네임 변경</h1>
          <p className="text-gray-primary text-[14px]">
            다른 사용자에게 표시될 이름을 설정하세요
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <Input
          className="w-99.5"
          value={currentNickname}
          label="현재 닉네임"
          labelClassName="font-semibold text-[14px]"
          disabled
        />
        <Input
          className="w-99.5"
          placeholder="새 닉네임을 입력해주세요"
          label="새 닉네임"
          labelClassName="font-semibold text-[14px]"
          value={newNickname}
          onChange={(event) => {
            setNewNickname(event.target.value)
            if (errorMessage) setErrorMessage(null)
          }}
          status={errorMessage ? 'error' : 'default'}
          helperText={errorMessage ?? NICKNAME_RULE_MESSAGE}
        />
        <Button
          size={'w398h52'}
          rounded={'md'}
          className="mt-4"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          변경하기
        </Button>
      </div>
    </>
  )
}
