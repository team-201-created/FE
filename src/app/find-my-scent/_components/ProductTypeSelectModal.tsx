'use client'

/** 테스트 진입 전: 향수(퍼퓸) vs 디퓨저 추천 유형 선택 */
import Image from 'next/image'
import { ModalOverlay, ModalPortal } from '@/components/common/Modal'
import type { ProductTypeChoice } from '../_types'

export type { ProductTypeChoice }

type ProductTypeSelectModalProps = {
  isOpen: boolean
  onSelect: (productType: ProductTypeChoice) => void
  /** X 버튼 — 보통 이전 페이지로 이동 */
  onClose: () => void
}

/** 향수(병) 아이콘 */
function PerfumeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 8h12v4h-2v2h2c2.2 0 4 1.8 4 4v22c0 2.2-1.8 4-4 4H18c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h2v-2h-2V8z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M22 6h4v4h-4V6z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 26c0-4 2-6 4-6s4 2 4 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 디퓨저(스틱) 아이콘 */
function DiffuserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse
        cx="24"
        cy="38"
        rx="12"
        ry="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 38V22c0-2 1.5-3.5 3.5-3.5h9C30.5 18.5 32 20 32 22v16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M20 14v6M24 10v10M28 14v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const styles = {
  panel: 'relative w-full max-w-lg rounded-2xl bg-white p-6 pt-12 shadow-lg',
  closeBtn:
    'absolute right-3 top-3 flex h-14 w-14 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-black',
  title: 'pr-12 text-lg font-bold text-[var(--color-black-primary)]',
  sub: 'mt-2 text-sm leading-relaxed text-neutral-600',
  /** 가로: 두 선택지 나란히 */
  row: 'mt-6 flex w-full flex-row gap-3 sm:gap-4',
  btn: 'flex min-h-[120px] flex-1 flex-col items-center justify-center gap-3 rounded-xl border-2 border-[var(--color-black-primary)] bg-[var(--color-black-primary)] px-3 py-5 text-sm font-semibold text-white transition-opacity hover:opacity-90',
  iconWrap: 'relative h-12 w-12 shrink-0 text-white',
} as const

export function ProductTypeSelectModal({
  isOpen,
  onSelect,
  onClose,
}: ProductTypeSelectModalProps) {
  if (!isOpen) return null

  return (
    <ModalPortal>
      <ModalOverlay onClose={() => undefined} closeOnBackdrop={false}>
        <div
          className={styles.panel}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-type-modal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="닫기"
          >
            <Image
              src="/modalClose.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
            />
          </button>
          <h2 id="product-type-modal-title" className={styles.title}>
            어떤 종류로 추천받겠습니까?
          </h2>
          <p className={styles.sub}>
            추천 결과에 맞는 상품 유형을 선택해 주세요.
          </p>
          <div className={styles.row}>
            <button
              type="button"
              className={styles.btn}
              onClick={() => onSelect('PERFUME')}
            >
              <div className={styles.iconWrap}>
                <PerfumeIcon className="h-full w-full" />
              </div>
              <span className="text-center leading-tight">향수</span>
            </button>
            <button
              type="button"
              className={styles.btn}
              onClick={() => onSelect('DIFFUSER')}
            >
              <div className={styles.iconWrap}>
                <DiffuserIcon className="h-full w-full" />
              </div>
              <span className="text-center leading-tight">디퓨저</span>
            </button>
          </div>
        </div>
      </ModalOverlay>
    </ModalPortal>
  )
}
