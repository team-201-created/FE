import type { RefObject } from 'react'
import Image from 'next/image'

const LABEL_CLASS = 'flex flex-col gap-2 font-semibold'
const REQUIRED_MARK = <span className="ml-0.5 text-red-500">*</span>

interface ImageUploadFieldProps {
  fileInputRef: RefObject<HTMLInputElement | null>
  imagePreview: string | null
  imageUrl: string | undefined
  isPending: boolean
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

export function ImageUploadField({
  fileInputRef,
  imagePreview,
  imageUrl,
  isPending,
  onFileChange,
  onRemove,
}: ImageUploadFieldProps) {
  return (
    <div className={LABEL_CLASS}>
      <span>이미지{REQUIRED_MARK}</span>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={onFileChange}
        disabled={isPending}
        className="hidden"
      />
      {imagePreview ? (
        <div className="relative w-full overflow-hidden rounded-lg border border-neutral-200">
          <Image
            src={imagePreview}
            alt="미리보기"
            className="h-36 w-full object-cover"
          />
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-sm font-medium text-white">
                업로드 중...
              </span>
            </div>
          )}
          {!isPending && imageUrl && (
            <div className="absolute bottom-2 left-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-medium text-white">
              업로드 완료
            </div>
          )}
          <button
            type="button"
            onClick={onRemove}
            disabled={isPending}
            className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/50 text-xs text-white hover:bg-black/70 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="flex h-28 w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-400 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-xs font-medium">클릭하여 이미지 선택</span>
          <span className="text-xs opacity-60">JPG · PNG · WEBP</span>
        </button>
      )}
    </div>
  )
}
