'use client'
import { useState } from 'react'

const slides = [
  {
    img: '/Landing1.svg',
    title: 'DeepCent Déprimés Diffuser',
    button: '제품 보러 가기 >',
    link: '#',
  },
  {
    img: '/Landing3.svg',
    title: 'DeepCent Déprimés Diffuser',
    button: '향수 추천 받기 >',
    link: '#',
  },
]

export default function LandingCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const goToPrev = () =>
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  const goToNext = () =>
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  return (
    <div className="relative mb-20 flex h-225.75 w-full flex-col items-center overflow-hidden">
      <div className="relative mx-auto mb-6 h-225.75 w-full overflow-hidden rounded-none">
        {/* 슬라이드 영역 */}
        <div
          className="flex w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="flex h-225.75 w-full flex-none">
              {/* 왼쪽 이미지 */}
              <div className="flex h-full w-1/2 items-center justify-center bg-[#e7dccb]">
                <img
                  src={slide.img}
                  alt="캐러셀 이미지"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* 오른쪽 텍스트 */}
              <div className="flex h-full w-1/2 flex-col items-start justify-center px-12">
                <h2 className="mb-6 font-serif text-[70px] leading-tight font-semibold tracking-wide">
                  {slide.title}
                </h2>
                <a
                  href={slide.link}
                  className="inline-block rounded-full bg-black px-6 py-2 text-[32px] text-white"
                >
                  {slide.button}
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* 좌우 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
          aria-label="이전 슬라이드"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
          aria-label="다음 슬라이드"
        >
          &#8594;
        </button>
      </div>
      {/* 인디케이터 */}
      <div className="mb-12 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full ${activeSlide === idx ? 'bg-black opacity-80' : 'bg-black opacity-30'}`}
            onClick={() => setActiveSlide(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
