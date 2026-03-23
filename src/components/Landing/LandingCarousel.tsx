'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { CAROUSEL_INTERVAL, slides } from '@/constants/landingCarousel'

export default function LandingCarousel() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      CAROUSEL_INTERVAL
    )
    return () => clearTimeout(id)
  }, [active, inView])

  const prev = () => setActive((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setActive((i) => (i + 1) % slides.length)

  return (
    <section
      ref={sectionRef}
      className="flex min-h-[calc(100vh-56px)] w-full flex-col items-center"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div className="relative mb-10 flex h-72 w-72 sm:h-80 sm:w-80">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={slides[active].img}
              alt={slides[active].title.replace('\n', ' ')}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full w-full object-contain"
            />
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-3 px-6 text-center"
          >
            <div className="flex items-center gap-3">
              <span className="bg-black-primary/25 h-px w-6" />
              <span className="text-gray-secondary text-xs font-medium tracking-[0.25em] uppercase">
                {slides[active].eyebrow}
              </span>
              <span className="bg-black-primary/25 h-px w-6" />
            </div>
            <h2 className="text-4xl leading-tight font-semibold tracking-tight whitespace-pre-line sm:text-5xl">
              {slides[active].title}
            </h2>
            <p className="text-gray-primary text-base sm:text-lg">
              {slides[active].subtitle}
            </p>
            <Link
              href={slides[active].link}
              className="bg-black-primary mt-3 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-75"
            >
              {slides[active].cta}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5 pb-2">
        <button
          onClick={prev}
          aria-label="이전 슬라이드"
          className="text-black-primary/35 hover:text-black-primary cursor-pointer text-sm transition-colors"
        >
          ←
        </button>

        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
            className="bg-black-primary/15 relative h-1 w-12 cursor-pointer overflow-hidden rounded-full"
          >
            {idx < active && (
              <div className="bg-black-primary/50 absolute inset-0 rounded-full" />
            )}
            {idx === active && (
              <motion.div
                key={`${active}-${inView}`}
                className="bg-black-primary absolute inset-0 origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: CAROUSEL_INTERVAL / 1000,
                  ease: 'linear',
                }}
              />
            )}
          </button>
        ))}

        <button
          onClick={next}
          aria-label="다음 슬라이드"
          className="text-black-primary/35 hover:text-black-primary cursor-pointer text-sm transition-colors"
        >
          →
        </button>
      </div>
    </section>
  )
}
