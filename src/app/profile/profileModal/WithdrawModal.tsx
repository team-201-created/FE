'use client'
import Modal from '@/components/common/Modal'
import ExitIcon from '@/assets/icons/exit.svg'

import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

export type WithdrawModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  return (
    <Modal rounded="sm" size="md" isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center border-b border-[#f3f4f6] p-4">
        <ExitIcon className="bg-black-primary h-11 w-11 rounded-[14px] p-2.5 text-white" />
        <div className="ml-4">
          <h1 className="text-[20px] font-bold">회원 탈퇴</h1>
          <p className="text-gray-primary text-[14px]">
            서비스 이용을 종료하고 계정을 삭제합니다
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <Input
          className="w-99.5"
          placeholder="원하는 상품이 없습니다."
          label="사유"
          labelClassName="font-semibold text-[14px]"
        />
        <Input
          className="w-99.5"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
          labelClassName="font-semibold text-[14px]"
        />
        <Button size={'w398h52'} rounded={'md'} className="mt-4">
          탈퇴 하기
        </Button>
      </div>
    </Modal>
  )
}
