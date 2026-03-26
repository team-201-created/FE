'use client'

import Button from '@/components/common/Button'
import KakaoIcon from '@/assets/icons/kakao.svg'
import IdIcon from '@/assets/icons/loginId.svg'
import PwIcon from '@/assets/icons/loginPassword.svg'
import Input from '@/components/common/Input'
import { getSocialAuthorizeUrl } from '@/lib/api/auth'

export default function LoginPage() {
  const handleKakaoLogin = async () => {
    try {
      const state = Math.random().toString(36).substring(2)

      const data = await getSocialAuthorizeUrl('kakao', state)

      if (data.success && data.data.authorize_url) {
        window.location.href = data.data.authorize_url
      } else {
        throw new Error(data.error?.message || '카카오 로그인에 실패했습니다.')
      }
    } catch (error) {
      alert('로그인 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-around">
      <div className="flex flex-col items-center">
        <h1 className="mt-10 mb-1 text-[36px] font-semibold">로그인</h1>
        <p className="text-gray text-[16px]">Ozent에 오신 것을 환영합니다.</p>
      </div>
      <div className="mt-8 mb-20 flex h-141.5 w-md flex-col items-center justify-center gap-6 rounded-[24px] bg-[#FBF9F7]">
        <div>
          <p className="mb-2 flex items-center">
            <IdIcon className="mr-2" />
            아이디
          </p>
          <Input
            className="w-95.5 border bg-white"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div>
          <p className="mb-2 flex items-center">
            <PwIcon className="mr-2" />
            비밀번호
          </p>
          <Input
            className="w-95.5 border bg-white"
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
        </div>
        <Button size={'w382h48'}> 로그인 →</Button>
        <div className="text-gray-primary flex items-center gap-4 font-medium">
          <p>아이디찾기</p>
          <span className="aria-hidden h-3.5 w-px shrink-0 bg-neutral-300" />
          <p>비밀번호 찾기</p>
        </div>
        <div className="flex w-95.5 items-center">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-gray-primary mx-4 text-sm font-medium">
            또는
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <Button
          color="kakao"
          size="w382h48"
          className="font-medium"
          onClick={handleKakaoLogin}
        >
          <KakaoIcon className="mr-2" />
          카카오로 시작하기
        </Button>
        <p className="text-gray-primary text-sm">아직 회원이 아니신가요?</p>
        <p className="text-sm font-medium">회원가입하기</p>
      </div>
    </div>
  )
}
