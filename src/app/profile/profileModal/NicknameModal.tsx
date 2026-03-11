'use client'
import ManageProfileIcon from '@/assets/icons/manageProfile.svg'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

export type NicknameModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function NicknameModal({ isOpen, onClose }: NicknameModalProps) {
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
          placeholder="DeepScent 사용자"
          label="현재 닉네임"
          labelClassName="font-semibold text-[14px]"
        />
        <Input
          className="w-99.5"
          placeholder="DeepScent 사용자"
          label="새 닉네임"
          labelClassName="font-semibold text-[14px]"
        />
        <Button size={'w398h52'} rounded={'md'} className="mt-4">
          변경하기
        </Button>
      </div>
    </>
  )
}
