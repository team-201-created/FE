'use client'
import LandingCard from '@/components/Landing/LandingCard'
import LandingCarousel from '@/components/Landing/LandingCarousel'
export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <LandingCarousel />
      <h1 className="mb-4 text-center text-[36px] font-semibold">
        나의 향기 찾기
      </h1>
      <p className="mb-8 text-center text-[18px] font-normal text-neutral-600">
        당신에게 딱 맞는 향기를 찾는 세 가지 방법
      </p>
      <div className="mb-30 flex justify-center gap-6">
        <LandingCard
          title="취향 테스트"
          description="당신의 취향과 라이프스타일을 분석하여 일상에 어울리는 향기를 추천합니다"
          link="/find-my-scent/taste-test"
          imgSrc="/LandingTasteTest.svg"
        />
        <LandingCard
          title="웰니스 케어 진단"
          description="건강 상태와 컨디션을 체크하여 심신 안정에 도움이 되는 아로마 테라피를 제안합니다"
          link="/find-my-scent/wellness"
          imgSrc="/LandingWellness.svg"
        />
        <LandingCard
          title="AI 비주얼 분석"
          description="인테리어, OOTD, 차량 등 사진을 업로드하면 AI가 분위기를 분석하여 어울리는 향기를 추천합니다"
          link="/find-my-scent/ai-visual"
          imgSrc="/LandingAiVisual.svg"
        />
      </div>
    </div>
  )
}
