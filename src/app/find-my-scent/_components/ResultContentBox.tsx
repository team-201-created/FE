'use client'

/** 결과 페이지 컨텐츠 박스 — 상단 로고, 중간(이미지/상품명/라벨·향조·노트·설명), 하단 버튼 3개 */
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  getAccordLabels,
  ACCORD_LABEL_PILL_MD_CLASS,
  SCENT_NOTE_PILL_CLASS,
} from '@/constants/accordLabelStyles'
import { ModalPortal } from '@/components/common/Modal/ModalPortal'
import type { ResultPageType } from '../_types'
import { OtherTestModal } from './OtherTestModal'

export type ResultContentBoxProps = {
  /** 중간 영역 — API 연동 후 전달 */
  productImageUrl?: string
  productName?: string
  scentTypeLabel?: string
  showRecommendLabel?: boolean
  /** 향조 타입 id 배열 (getAccordLabels용, 예: ['oriental', 'woody']) */
  scentTypeTags?: string[]
  /** 향기 노트 라벨 (예: ['#숙면', '#로맨틱']) */
  noteTags?: string[]
  description?: string
  /** 하단 버튼 이동 경로/URL */
  primaryButtonHref: string
  primaryButtonLabel?: string
  retestButtonHref: string
  /** 현재 결과 페이지 유형 — 다른 테스트 하러가기 클릭 시 모달에서 제외 */
  resultType: ResultPageType
}

const DEFAULT_PRIMARY_LABEL = '추천한 향기와 어울리는 연관 추천 상품 보러가기 →'

/** API에 purchase_url 이 없을 때 외부 기본 링크로 유도 */
const PRIMARY_BUTTON_FALLBACK_HREF = 'https://www.coupang.com/'

const styles = {
  card: 'h-[770px] w-full max-w-[1200px] rounded-2xl bg-white px-6 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
  topRow: 'flex items-center gap-3 pb-4 border-b border-neutral-100',
  reportTitle: 'text-xl font-bold text-[var(--color-black-primary)]',
  reportSub: 'text-md text-neutral-500',
  middle: 'flex flex-col gap-8 py-6 sm:flex-row',
  left: 'flex flex-col sm:min-w-[200px]',
  imageWrap:
    'relative flex h-[415px] w-[415px] shrink-0 flex-col justify-between overflow-hidden rounded-xl bg-neutral-200 bg-cover bg-center',
  labelsTopLeft: 'flex flex-wrap items-center gap-2 p-3',
  labelScent:
    'rounded-full border border-neutral-300 bg-white/90 px-3 py-1.5 text-xs font-medium text-black backdrop-blur-sm',
  productNameOverlay:
    'p-5 text-4xl font-bold leading-tight text-white drop-shadow-[0_5px_6px_rgba(0,0,0,0.7)]',
  right: 'flex flex-1 flex-col gap-6',
  sectionTitle: 'text-xl mb-5 font-semibold text-[var(--color-black-primary)]',
  tagRow: 'flex flex-wrap gap-2 mb-6',
  descriptionBox:
    'rounded-xl bg-[#F5F0E8] p-7 text-sm leading-relaxed text-neutral-700',
  descriptionHeader: 'flex items-center gap-2',
  buttons: 'flex flex-col gap-3 pt-4 border-t border-neutral-100',
  btnPrimary:
    'flex items-center justify-center gap-2 rounded-xl bg-[var(--color-black-primary)] px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90',
  btnSecondary:
    'flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50',
} as const

export function ResultContentBox({
  productImageUrl,
  productName = '상품명',
  scentTypeLabel,
  showRecommendLabel = true,
  scentTypeTags = [],
  noteTags = [],
  description = '',
  primaryButtonHref,
  primaryButtonLabel = DEFAULT_PRIMARY_LABEL,
  retestButtonHref,
  resultType,
}: ResultContentBoxProps) {
  const [isOtherTestModalOpen, setIsOtherTestModalOpen] = useState(false)
  const resolvedPrimaryHref =
    primaryButtonHref?.trim() || PRIMARY_BUTTON_FALLBACK_HREF

  return (
    <>
      <article className={styles.card}>
        <div className={styles.topRow}>
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src="/resultContainer.svg"
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div>
            <h2 className={styles.reportTitle}>분석 리포트</h2>
            <p className={styles.reportSub}>AI 기반 향기 프로파일링</p>
          </div>
        </div>

        {/* 중간: 좌측 이미지 영역(배경+라벨+상품명), 우측 향조/노트/설명 */}
        <div className={styles.middle}>
          <div className={styles.left}>
            <div
              className={styles.imageWrap}
              style={
                productImageUrl
                  ? { backgroundImage: `url(${productImageUrl})` }
                  : undefined
              }
            >
              <div className={styles.labelsTopLeft}>
                {scentTypeLabel && (
                  <span className={styles.labelScent}>{scentTypeLabel}</span>
                )}
                {showRecommendLabel && (
                  <Image
                    src="/Recommendation.svg"
                    alt="추천"
                    width={69}
                    height={34}
                    className="h-8 w-auto"
                    unoptimized
                  />
                )}
              </div>
              <p className={styles.productNameOverlay}>{productName}</p>
            </div>
          </div>

          <div className={styles.right}>
            <section>
              <h3 className={styles.sectionTitle}>향조 타입</h3>
              <div className={styles.tagRow}>
                {scentTypeTags.length > 0 ? (
                  getAccordLabels(
                    scentTypeTags.map((id) => id.toLowerCase())
                  ).map(({ id, label, style }) => (
                    <span
                      key={id}
                      className={ACCORD_LABEL_PILL_MD_CLASS}
                      style={{
                        backgroundColor: style.bg,
                        borderColor: style.border,
                        color: style.text,
                        borderWidth: 1,
                      }}
                    >
                      {label}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-neutral-400">—</span>
                )}
              </div>
            </section>
            <section>
              <h3 className={styles.sectionTitle}>향기 노트</h3>
              <div className={styles.tagRow}>
                {noteTags.length > 0 ? (
                  noteTags.map((note) => (
                    <span key={note} className={SCENT_NOTE_PILL_CLASS}>
                      {note}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-neutral-400">—</span>
                )}
              </div>
            </section>
            <section>
              <div
                className={`${styles.sectionTitle} ${styles.descriptionHeader}`}
              ></div>
              <div className={styles.descriptionBox}>
                <Image
                  src="/details.svg"
                  alt="추천 조합 설명"
                  width={120}
                  height={50}
                  className="shrink-0"
                  unoptimized
                />
                {description || '추천 조합 설명이 여기에 표시됩니다.'}
              </div>
            </section>
          </div>
        </div>

        {/* 하단 버튼 3개 — 상품 URL 없으면 콤보 상품 목록으로 연결 */}
        <div className={styles.buttons}>
          <Link href={resolvedPrimaryHref} className={styles.btnPrimary}>
            {primaryButtonLabel}
          </Link>
          <Link href={retestButtonHref} className={styles.btnSecondary}>
            테스트 다시하기
          </Link>
          <button
            type="button"
            onClick={() => setIsOtherTestModalOpen(true)}
            className={styles.btnSecondary}
          >
            다른 테스트 하러가기
          </button>
        </div>
      </article>

      {isOtherTestModalOpen && (
        <ModalPortal>
          <OtherTestModal
            isOpen={isOtherTestModalOpen}
            onClose={() => setIsOtherTestModalOpen(false)}
            currentResultType={resultType}
          />
        </ModalPortal>
      )}
    </>
  )
}
