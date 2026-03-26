'use client'
import ManageProfileIcon from '@/assets/icons/manageProfile.svg'
import ExitIcon from '@/assets/icons/exit.svg'

type ProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  onNicknameClick: () => void
  onWithdrawClick: () => void
}

export default function ProfileModal({
  isOpen: _isOpen,
  onClose: _onClose,
  onNicknameClick,
  onWithdrawClick,
}: ProfileModalProps) {
  return (
    <>
      <div className="flex items-center border-b border-[#f3f4f6] p-4">
        <ManageProfileIcon className="bg-black-primary h-11 w-11 rounded-[14px] p-2.5 text-white" />
        <div className="ml-4">
          <h1 className="text-[20px] font-bold">내 정보 관리</h1>
          <p className="text-gray-primary text-[14px]">
            개인정보를 안전하게 관리하세요
          </p>
        </div>
      </div>
      <div className="my-6 flex flex-col items-center justify-center gap-4">
        <button
          className="flex h-22.75 w-99.5 items-center rounded-3xl bg-[#fbf9f7] p-5.25"
          onClick={onNicknameClick}
        >
          <div className="icon">
            <ManageProfileIcon className="h-11 w-11 rounded-[14px] bg-white p-2.5" />
          </div>
          <div className="ml-4">
            <h1 className="flex text-[20px] font-bold">닉네임 변경</h1>
            <p className="text-gray-primary text-[14px]">Ozent 사용자</p>
          </div>
        </button>
        <button
          className="flex h-22.75 w-99.5 items-center rounded-3xl bg-[#fbf9f7] p-5.25"
          onClick={onWithdrawClick}
        >
          <div className="icon">
            <ExitIcon className="h-11 w-11 rounded-[14px] bg-white p-2.5" />
          </div>
          <div className="ml-4">
            <h1 className="flex text-[20px] font-bold">회원탈퇴</h1>
            <p className="text-gray-primary text-[14px]">
              서비스 이용을 종료하고 계정을 삭제합니다
            </p>
          </div>
        </button>
      </div>
    </>
  )
}
