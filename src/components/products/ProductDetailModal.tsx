'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  getAccordLabels,
  ACCORD_LABEL_PILL_MD_CLASS,
  SCENT_NOTE_PILL_CLASS,
} from '@/constants/accordLabelStyles'
import Button from '@/components/common/Button'
import { buttonVariants } from '@/components/common/Button/Button.variants'
import { cn } from '@/lib/cn'

// ─── 스타일 ─────────────────────────────────────────────────────────────────
const styles = {
  // ── 타이포: 상품명 / 한줄평 / 부타이틀 / 미니타이틀
  /** 상품명 (h2) */
  productName: 'text-black-primary text-2xl font-bold leading-tight',
  /** 한줄평 (설명 첫 줄) */
  oneLineDescription:
    'text-black-primary mt-2 text-base leading-relaxed text-neutral-700',
  /** 부타이틀: "향조", "향기 노트" 라벨 */
  subTitle: 'text-neutral-500 text-sm font-medium',
  /** 미니타이틀: 버튼 위·아래 안내/추천 문구 */
  miniTitle: 'text-neutral-500 text-sm',
  miniTitleCenter: 'text-center text-sm text-neutral-500',

  // ── 레이아웃: 모달·콘텐츠 영역
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center bg-black/50',
  modal:
    'relative flex max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl',
  contentArea:
    'flex w-[min(70%,500px)] flex-shrink-0 flex-col items-stretch gap-6 px-8 pb-8 pt-14',

  // ── 이미지 영역
  imageArea: 'relative min-h-0 min-w-0 flex-1 bg-neutral-100',
  image: 'h-full w-full object-cover',

  // ── 로딩·에러 상태
  loadingText:
    'flex h-full w-full items-center justify-center text-neutral-400',
  loadingContent: 'flex flex-1 items-center justify-center text-neutral-500',
  errorContent:
    'flex flex-1 flex-col items-center justify-center gap-2 text-neutral-600',
  errorCloseBtn: 'text-sm underline hover:text-neutral-800',

  // ── 구분선 (별 아이콘)
  divider: 'flex items-center gap-2',
  dividerLine: 'bg-neutral-200 h-px flex-1',
  dividerIcon: 'text-neutral-400',

  section: 'flex flex-col gap-2',
  noteEmpty: 'text-neutral-400 text-sm',
} as const

// ─── 버튼 공통 props  ─────────────────────────────────────
/** 연관 추천 상품 보러가기: 링크로 열기 때문에 <a>에 적용하는 클래스 */
const linkButtonClassName = cn(
  buttonVariants({ color: 'primary', size: 'none', rounded: 'sm' }),
  'w-full h-10 border-2 border-transparent transition-all duration-200 hover:bg-[#7c3aed] hover:border-[var(--color-purple-primary)] hover:text-white hover:shadow-[0_4px_14px_rgba(148,0,255,0.4)] active:scale-[0.98] inline-flex items-center justify-center'
)
const testButtonProps = {
  type: 'button' as const,
  color: 'none' as const,
  size: 'none' as const,
  rounded: 'lg' as const,
  className:
    'rounded-lg shadow-sm w-full h-10 flex items-center justify-between px-4 py-2.5 text-sm bg-neutral-100 text-neutral-800 border-2 border-transparent transition-all duration-200 hover:border-[var(--color-purple-primary)] hover:text-[var(--color-purple-primary)] active:scale-[0.98]',
}

export type ProductDetailModalProduct = {
  name: string
  imageUrl: string
  scentFamilyIds: string[]
  noteLabels: string[]
  oneLineDescription: string
  productLink?: string
}

type ProductDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  product: ProductDetailModalProduct | null
  isLoading?: boolean
  errorMessage?: string | null
  /** 조합 상세 모달에서만 true. 연관 추천 상품 보러가기 버튼 표시 여부 */
  showRecommendationLink?: boolean
}

// ─── 컴포넌트 ───────────────────────────────────────────────────────────────
export function ProductDetailModal({
  isOpen,
  onClose,
  product,
  isLoading = false,
  errorMessage = null,
  showRecommendationLink = false,
}: ProductDetailModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) =>
    e.target === e.currentTarget && onClose()
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation()

  /** 연관 추천 상품 보러가기: 상세의 product_link */
  const productLink = product?.productLink?.trim() ?? ''
  const accordLabels = product ? getAccordLabels(product.scentFamilyIds) : []

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <Button
          type="button"
          onClick={onClose}
          color="none"
          size="none"
          rounded="full"
          className="absolute top-5 right-5 z-10 size-7 min-h-10 min-w-10 p-0 transition-colors duration-200 hover:bg-neutral-100 hover:shadow-lg active:scale-95"
          aria-label="모달 닫기"
        >
          <Image
            src="/modalClose.svg"
            alt=""
            width={40}
            height={40}
            className="size-10"
          />
        </Button>

        <div className={styles.imageArea}>
          {isLoading && (
            <div className={styles.loadingText}>
              <span>로딩 중...</span>
            </div>
          )}
          {!isLoading && product && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 896px) 100vw, 60vw"
              className={styles.image}
            />
          )}
        </div>

        <div className={styles.contentArea}>
          {isLoading && (
            <div className={styles.loadingContent}>
              상세 정보를 불러오는 중...
            </div>
          )}
          {!isLoading &&
            errorMessage && ( //
              <div className={styles.errorContent}>
                <p>{errorMessage}</p>
                <Button
                  type="button"
                  onClick={onClose}
                  color="none"
                  size="none"
                  className={styles.errorCloseBtn}
                >
                  닫기
                </Button>
              </div>
            )}
          {!isLoading && !errorMessage && product && (
            <>
              <div>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.oneLineDescription}>
                  {product.oneLineDescription}
                </p>
              </div>

              <div className={styles.divider}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerIcon} aria-hidden>
                  ★
                </span>
                <div className={styles.dividerLine} />
              </div>

              <div className={styles.section}>
                <p className={styles.subTitle}>향조</p>
                <div className="flex flex-wrap gap-2">
                  {getAccordLabels(product.scentFamilyIds).map(
                    ({ id, label, style }) => (
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
                    )
                  )}
                </div>
              </div>

              {showRecommendationLink ? (
                <>
                  <div className={styles.section}>
                    <p className={styles.subTitle}>향기 노트</p>
                    {product.noteLabels.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {product.noteLabels.map((note) => (
                          <span key={note} className={SCENT_NOTE_PILL_CLASS}>
                            {note}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.noteEmpty}>-</span>
                    )}
                  </div>

                  <div className="mt-2">
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkButtonClassName}
                    >
                      → 연관 추천 상품 보러가기
                    </a>
                  </div>

                  {accordLabels.length > 0 && (
                    <p className={styles.miniTitleCenter}>
                      이 향기와 같은{' '}
                      {accordLabels.map(({ id, label, style }, i) => (
                        <span key={id}>
                          {i > 0 && ', '}
                          <span
                            className="font-medium"
                            style={{ color: style.text }}
                          >
                            {label}
                          </span>
                        </span>
                      ))}{' '}
                      계열 상품을 추천해드립니다.
                    </p>
                  )}
                </>
              ) : (
                <div className="mt-2 flex flex-col gap-2">
                  <p className={styles.miniTitleCenter}>
                    취향별 · 건강별 · 공간별 어울리는 상품을 추천받아 볼 수
                    있습니다
                  </p>
                  <Button
                    {...testButtonProps}
                    onClick={() => router.push('/find-my-scent/taste-test')}
                  >
                    내 취향에 어울리는 향기 찾기 테스트 하러가기
                    <span aria-hidden>→</span>
                  </Button>
                  <Button
                    {...testButtonProps}
                    onClick={() => router.push('/find-my-scent/wellness')}
                  >
                    내 건강 상황에 어울리는 향기 찾기 테스트 하러가기
                    <span aria-hidden>→</span>
                  </Button>
                  <Button
                    {...testButtonProps}
                    onClick={() => router.push('/find-my-scent/ai-visual')}
                  >
                    내 공간에 어울리는 향기를 사진으로 AI 분석 하러가기
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
