'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SCENT_FAMILIES } from '@/constants/productFilters'
import { ACCORD_LABEL_STYLES } from '@/constants/accordLabelStyles'
import Button from '@/components/common/Button'

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

  // ── 섹션·칩 (향조 pill, 향기 노트 pill)
  section: 'flex flex-col gap-2',
  accordPill: 'inline-block rounded-full border px-3 py-1 text-sm font-medium',
  notePill: 'rounded-lg bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700',
  noteEmpty: 'text-neutral-400 text-sm',
} as const

// ─── 버튼 공통 props  ─────────────────────────────────────
const linkButtonProps = {
  type: 'button' as const,
  color: 'primary' as const,
  size: 'none' as const,
  rounded: 'sm' as const,
  className: 'w-full h-10',
}
const testButtonProps = {
  type: 'button' as const,
  color: 'quinary' as const,
  size: 'none' as const,
  rounded: 'lg' as const,
  className:
    'w-full h-10 flex items-center justify-between px-4 py-2.5 text-sm',
}

// ─── 타입 ─────────────────────────────────────────────────────────────────
const scentFamilyMap = Object.fromEntries(
  SCENT_FAMILIES.map((f) => [f.id, f])
) as Record<string, (typeof SCENT_FAMILIES)[number]>

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

  const linkHref = product?.productLink ?? '#'
  const accordLabels =
    product?.scentFamilyIds.map((id) => {
      const family = scentFamilyMap[id] ?? scentFamilyMap.woody
      const style =
        ACCORD_LABEL_STYLES[family.colorClass] ?? ACCORD_LABEL_STYLES.woody
      return { id, label: family.label, style }
    }) ?? []

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <Button
          type="button"
          onClick={onClose}
          color="secondary"
          size="none"
          rounded="full"
          className="absolute top-5 right-5 z-10 size-10 min-h-10 min-w-10 p-0 shadow-md hover:bg-neutral-100"
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
                  {accordLabels.map(({ id, label, style }) => (
                    <span
                      key={id}
                      className={styles.accordPill}
                      style={{
                        backgroundColor: style.bg,
                        borderColor: style.border,
                        color: style.text,
                        borderWidth: 1,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {showRecommendationLink ? (
                <>
                  <div className={styles.section}>
                    <p className={styles.subTitle}>향기 노트</p>
                    <div className="flex flex-wrap gap-2">
                      {product.noteLabels.length > 0 ? (
                        product.noteLabels.map((note) => (
                          <span key={note} className={styles.notePill}>
                            {note}
                          </span>
                        ))
                      ) : (
                        <span className={styles.noteEmpty}>-</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <Button
                      {...linkButtonProps}
                      onClick={() =>
                        window.open(linkHref, '_blank', 'noopener,noreferrer')
                      }
                    >
                      → 연관 추천 상품 보러가기
                    </Button>
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
