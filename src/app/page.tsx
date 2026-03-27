import type { Metadata } from 'next'
import LandingHero from '@/components/Landing/LandingHero'
import LandingCarousel from '@/components/Landing/LandingCarousel'
import LandingCard from '@/components/Landing/LandingCard'

// 웹사이트 중복 문제 해결을 위한 canonical 설정
export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingCarousel />
      <LandingCard />
    </>
  )
}
