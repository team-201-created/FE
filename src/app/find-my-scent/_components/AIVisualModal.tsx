'use client'

/** AI 비주얼 분석 모달 — 2단계: 사진 유형 선택 → 업로드 */
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { ModalOverlay, ModalPortal } from '@/components/common/Modal'
import { uploadImageViaPresignedUrl } from '../_api/aiVisualClient'
import { StepIndicator } from './StepIndicator'

const ACCEPT_TYPES = 'image/jpeg,image/jpg,image/png,image/webp'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

type PhotoType = 'INTERIOR' | 'OOTD'

const PHOTO_TYPE_CONFIG: Record<
  PhotoType,
  {
    label: string
    description: string
    activeIcon: string
    inactiveIcon: string
  }
> = {
  INTERIOR: {
    label: '인테리어',
    description: '공간의 분위기를 분석합니다',
    activeIcon: '/InteriorActive.svg',
    inactiveIcon: '/InteriorInactive.svg',
  },
  OOTD: {
    label: 'OOTD',
    description: '패션 스타일을 분석합니다',
    activeIcon: '/OOTDActive.svg',
    inactiveIcon: '/OOTDInactive.svg',
  },
}

export type AIVisualModalProps = {
  isOpen: boolean
  onClose: () => void
  /**
   * S3 업로드 완료 후 저장된 image_url 로만 호출 (「분석 시작」버튼).
   * Presigned 발급·PUT 업로드는 파일 첨부 시 모달 내부에서 처리.
   */
  onAnalyze?: (photoType: PhotoType, imageUrl: string) => void | Promise<void>
}

const styles = {
  modal:
    'flex min-h-[550px] w-full max-w-[1000px] flex-col rounded-2xl bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5',
  header:
    'relative flex shrink-0 flex-col items-center justify-center px-10 pt-8 pb-5 text-center',
  /** 제품 유형 선택 모달(ProductTypeSelectModal) closeBtn 과 동일 — 헤더 패딩에 맞춰 top-8 만 다름 */
  closeBtn:
    'absolute right-6 top-8 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 shadow-none transition-[color,box-shadow,transform] duration-150 ease-out hover:translate-y-px hover:scale-[0.96] hover:text-[var(--color-black-primary)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 active:translate-y-0.5 active:scale-[0.92] active:shadow-[0_1px_3px_rgba(0,0,0,0.12)]',
  titleWrap: 'flex w-full flex-none items-center justify-center gap-2',
  titleIcon: 'relative h-8 w-8 shrink-0',
  title:
    'text-xl font-bold leading-none tracking-tight text-[var(--color-black-primary)]',
  subtitle: 'mt-2 text-center text-sm leading-relaxed text-neutral-600',
  stepIndicatorWrap: 'mt-6',
  body: 'flex min-h-0 flex-1 flex-col overflow-hidden px-10 pb-8',
  bodyInner: 'mx-auto flex w-full max-w-xl flex-col',
  step1Block: 'flex w-full flex-col items-center',
  step1Title: 'text-lg font-semibold text-[var(--color-black-primary)]',
  step1Sub: 'mt-1.5 text-center text-sm text-neutral-600',
  step1Head: 'w-full px-10 text-center',
  cardsWrap: 'mt-6 grid w-full grid-cols-2 gap-4 -mx-10 w-[calc(100%+5rem)]',
  card: 'relative flex cursor-pointer flex-col items-center justify-center rounded-xl p-6 transition-all duration-200',
  cardInactive:
    'border border-neutral-200 bg-neutral-50/80 hover:border-neutral-300 hover:bg-neutral-100/80',
  cardActive:
    'border-2 border-[var(--color-black-primary)] bg-[#F5F0E8] shadow-[0_4px_12px_rgba(0,0,0,0.06)] ring-2 ring-[var(--color-black-primary)]/10',
  cardIcon: 'relative h-14 w-14 shrink-0',
  cardLabel: 'mt-4 text-base font-semibold text-[var(--color-black-primary)]',
  cardDesc: 'mt-1.5 text-center text-xs leading-relaxed text-neutral-600',
  checkBadge:
    'absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-black-primary)] text-xs font-medium text-white shadow-sm',
  step2Block: 'flex min-h-0 flex-1 flex-col',
  step2Head: 'w-full shrink-0',
  step2Title: 'text-lg font-semibold text-[var(--color-black-primary)]',
  step2Desc: 'mt-1.5 text-sm leading-relaxed text-neutral-600',
  uploadZone:
    'mt-6 flex min-h-[240px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/80 transition-colors hover:border-neutral-400 hover:bg-neutral-100/80 -mx-10 w-[calc(100%+5rem)]',
  uploadZoneFilled:
    'flex min-h-[240px] flex-1 flex-col border-solid border-neutral-200 p-2 -mx-5 w-[calc(100%+3rem)]',
  uploadIcon: 'relative h-20 w-20 shrink-0',
  uploadText: 'mt-4 text-sm font-medium text-neutral-700',
  uploadHint: 'mt-2 text-xs text-neutral-500',
  uploadTypes: 'mt-3 text-xs text-neutral-400',
  previewWrap:
    'relative min-h-[200px] flex-1 w-full overflow-hidden rounded-lg bg-neutral-200',
  previewImg: 'object-cover object-center',
  previewRemove:
    'absolute right-3 top-3 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-all hover:bg-black/80 hover:scale-105',
  footer: 'flex shrink-0 gap-4 border-t border-neutral-100 px-10 py-5',
  btnPrev:
    'flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50',
  btnNext:
    'flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
  btnNextInactive: 'bg-neutral-200 text-neutral-500',
  btnNextActive:
    'bg-[var(--color-black-primary)] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:opacity-95',
} as const

export function AIVisualModal({
  isOpen,
  onClose,
  onAnalyze,
}: AIVisualModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [photoType, setPhotoType] = useState<PhotoType | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  /** Presigned 발급 + S3 PUT 완료 후 서버가 준 image_url (분석 API에만 사용) */
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [isUploadingS3, setIsUploadingS3] = useState(false)
  const [s3Error, setS3Error] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const config = photoType ? PHOTO_TYPE_CONFIG[photoType] : null
  const uploadLabel =
    config?.label === '인테리어'
      ? '인테리어 사진을 업로드해주세요'
      : 'OOTD 사진을 업로드해주세요'

  const reset = () => {
    setStep(1)
    setPhotoType(null)
    setFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setUploadError(null)
    setUploadedImageUrl(null)
    setS3Error(null)
    setSubmitError(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null)
    setS3Error(null)
    setUploadedImageUrl(null)
    const next = e.target.files?.[0]
    if (!next) return
    if (!next.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      setUploadError('JPG, JPEG, PNG, WEBP 파일만 업로드 가능합니다.')
      return
    }
    if (next.size > MAX_FILE_SIZE) {
      setUploadError('파일 용량은 최대 10MB까지 가능합니다.')
      return
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(next)
    setPreviewUrl(URL.createObjectURL(next))

    setIsUploadingS3(true)
    try {
      const data = await uploadImageViaPresignedUrl(next)
      setUploadedImageUrl(data.image_url)
    } catch (err) {
      setUploadedImageUrl(null)
      setS3Error(
        err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.'
      )
    } finally {
      setIsUploadingS3(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      const dt = new DataTransfer()
      dt.items.add(dropped)
      if (inputRef.current) inputRef.current.files = dt.files
      handleFileChange({
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setUploadError(null)
    setUploadedImageUrl(null)
    setS3Error(null)
  }

  const goNext = () => {
    if (step === 1 && photoType) setStep(2)
  }

  const goPrev = () => {
    if (step === 2) {
      removeImage()
      setStep(1)
    }
  }

  const handleAnalyze = async () => {
    if (step !== 2 || !photoType || !uploadedImageUrl) return
    if (onAnalyze) {
      setSubmitError(null)
      setIsSubmitting(true)
      try {
        await onAnalyze(photoType, uploadedImageUrl)
        // onAnalyze에서 결과 페이지로 이동하므로 handleClose() 호출하지 않음 (history.back() 방지)
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : '제출에 실패했습니다.'
        )
      } finally {
        setIsSubmitting(false)
      }
    } else {
      router.push('/find-my-scent/ai-visual/result')
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <ModalPortal>
      <ModalOverlay onClose={handleClose} className="p-4 backdrop-blur-sm">
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          aria-labelledby="ai-visual-modal-title"
        >
          <header className={styles.header}>
            <button
              type="button"
              onClick={handleClose}
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
            <div className={styles.titleWrap}>
              <div className={styles.titleIcon}>
                <Image
                  src="/ai.svg"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className={styles.title} id="ai-visual-modal-title">
                AI 비주얼 분석
              </span>
            </div>
            <p className={styles.subtitle}>
              사진을 분석하여 어울리는 향기를 추천해드립니다
            </p>
            <div className={styles.stepIndicatorWrap}>
              <StepIndicator totalSteps={2} currentStep={step} />
            </div>
          </header>

          <div className={styles.body}>
            {step === 1 && (
              <div className={styles.step1Block}>
                <div className={styles.step1Head}>
                  <p className={styles.step1Title}>
                    분석할 사진 유형을 선택해주세요
                  </p>
                  <p className={styles.step1Sub}>
                    어떤 분위기의 사진을 분석하시겠어요?
                  </p>
                </div>
                <div className={styles.cardsWrap}>
                  {(['INTERIOR', 'OOTD'] as const).map((type) => {
                    const c = PHOTO_TYPE_CONFIG[type]
                    const isActive = photoType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPhotoType(type)}
                        className={`${styles.card} ${isActive ? styles.cardActive : styles.cardInactive}`}
                      >
                        {isActive && (
                          <span className={styles.checkBadge} aria-hidden>
                            ✓
                          </span>
                        )}
                        <div className={styles.cardIcon}>
                          <Image
                            src={isActive ? c.activeIcon : c.inactiveIcon}
                            alt=""
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <span className={styles.cardLabel}>{c.label}</span>
                        <span className={styles.cardDesc}>{c.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 2 && config && (
              <div className={styles.step2Block}>
                <div className={styles.step2Head}>
                  <p className={styles.step2Title}>{uploadLabel}</p>
                  <p className={styles.step2Desc}>
                    AI가 사진을 분석하여 어울리는 향기를 추천해드립니다
                  </p>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPT_TYPES}
                  className="sr-only"
                  onChange={handleFileChange}
                  aria-label="사진 선택"
                />
                {previewUrl ? (
                  <div
                    className={`${styles.uploadZone} ${styles.uploadZoneFilled}`}
                  >
                    <div className={styles.previewWrap}>
                      <Image
                        src={previewUrl}
                        alt="업로드된 사진"
                        fill
                        className={styles.previewImg}
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className={styles.previewRemove}
                        aria-label="사진 삭제 후 다시 업로드"
                      >
                        <span className="text-xl leading-none font-medium">
                          ×
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.uploadZone}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => inputRef.current?.click()}
                  >
                    <div className={styles.uploadIcon}>
                      <Image
                        src="/upload.svg"
                        alt=""
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <p className={styles.uploadText}>사진을 업로드하세요</p>
                    <p className={styles.uploadHint}>
                      클릭하거나 파일을 드래그하여 업로드
                    </p>
                    <p className={styles.uploadTypes}>
                      JPG, JPEG, PNG, WEBP · 파일 1장, 최대 10MB
                    </p>
                  </div>
                )}
                {uploadError && (
                  <p className="mt-3 text-sm text-red-600">{uploadError}</p>
                )}
                {s3Error && (
                  <p className="mt-3 text-sm text-red-600">{s3Error}</p>
                )}
                {submitError && (
                  <p className="mt-3 text-sm text-red-600">{submitError}</p>
                )}
              </div>
            )}
          </div>

          <footer className={styles.footer}>
            {step === 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!photoType}
                className={`${styles.btnNext} ${photoType ? styles.btnNextActive : styles.btnNextInactive}`}
              >
                다음 단계 →
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className={styles.btnPrev}
                >
                  ← 이전
                </button>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={
                    !file || !uploadedImageUrl || isUploadingS3 || isSubmitting
                  }
                  className={`${styles.btnNext} ${file && uploadedImageUrl && !isUploadingS3 && !isSubmitting ? styles.btnNextActive : styles.btnNextInactive}`}
                >
                  {isUploadingS3
                    ? '업로드 중...'
                    : isSubmitting
                      ? '분석 중...'
                      : '분석 시작'}
                </button>
              </>
            )}
          </footer>
        </div>
      </ModalOverlay>
    </ModalPortal>
  )
}
