'use client'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <p className="text-red-600">
        목록을 불러오지 못했습니다. ({error.message})
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-300"
      >
        다시 시도
      </button>
    </div>
  )
}
