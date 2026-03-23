'use client'
import Link from 'next/link'
import { motion, type Variants } from 'motion/react'

const cards = [
  {
    index: 0,
    title: '취향 테스트',
    meta: '약 3분 · 7문항',
    description:
      '생활 방식과 취향을 분석해 나의 일상에 꼭 맞는 향기를 추천합니다',
    link: '/find-my-scent/taste-test',
    imgSrc: '/LandingTasteTest.svg',
  },
  {
    index: 1,
    title: '웰니스 케어 진단',
    meta: '약 2분 · 5문항',
    description:
      '현재 컨디션과 건강 상태를 체크해 심신 안정에 도움이 되는 아로마를 제안합니다',
    link: '/find-my-scent/wellness',
    imgSrc: '/LandingWellness.svg',
  },
  {
    index: 2,
    title: 'AI 비주얼 분석',
    meta: '이미지 업로드 · AI 즉시 분석',
    description:
      '인테리어·OOTD·공간 사진을 올리면 AI가 분위기를 읽고 어울리는 향기를 찾아줍니다',
    link: '/find-my-scent/ai-visual',
    imgSrc: '/LandingAiVisual.svg',
  },
]

const containerVariant: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function LandingCard() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5 }}
        className="mb-3 text-center text-4xl font-semibold"
      >
        나의 향기 찾기
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-gray-primary mb-10 text-center text-base sm:text-lg"
      >
        세 가지 분석 방법으로 당신만의 시그니처 향을 찾아드립니다
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-8"
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {cards.map((card) => (
          <CardItem key={card.index} {...card} />
        ))}
      </motion.div>
    </section>
  )
}

function CardItem({
  index,
  title,
  meta,
  description,
  link,
  imgSrc,
}: (typeof cards)[number]) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -4, transition: { duration: 0.1 } }}
      className="flex w-full flex-none flex-col rounded-3xl bg-white p-8 sm:min-h-[480px] sm:w-80 sm:p-10"
    >
      <span className="text-gray-secondary mb-6 text-xs font-semibold">
        {String(index + 1).padStart(2, '0')}
      </span>

      <img
        src={imgSrc}
        alt=""
        aria-hidden
        className="mb-6 h-14 w-14 transition-transform duration-300 sm:h-16 sm:w-16"
      />

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-2xl leading-tight font-bold sm:text-3xl">
          {title}
        </h3>
        <span className="bg-gray-white text-gray-primary inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium">
          {meta}
        </span>
        <p className="text-gray-primary text-sm leading-relaxed sm:text-base">
          {description}
        </p>
      </div>

      <Link
        href={link}
        className="bg-black-primary mt-6 flex w-full items-center justify-center rounded-2xl py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        테스트 시작하기
      </Link>
    </motion.div>
  )
}
