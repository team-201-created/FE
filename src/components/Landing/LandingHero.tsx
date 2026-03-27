'use client'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function LandingHero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Image
        src="/img/landing.jpg"
        alt="당신만을 위한 맞춤 향기 추천"
        fill
        priority
        sizes="100vw"
        quality={100}
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xs font-medium tracking-[0.3em] text-white/60 uppercase"
        >
          Ozent
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          당신만을 위한
          <br />
          맞춤 향기 추천
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
        >
          취향 테스트·웰니스 진단·AI 비주얼 분석으로
          <br />
          나에게 꼭 맞는 향기와 제품까지 한번에 찾아드립니다
        </motion.p>
      </div>
    </section>
  )
}
