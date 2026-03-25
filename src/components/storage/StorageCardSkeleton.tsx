const CARD_COUNT = 6

export default function StorageCardSkeleton() {
  return (
    <>
      {Array.from({ length: CARD_COUNT }, (_, index) => (
        <div
          key={index}
          className="mx-5 mb-10 flex h-109.5 w-102.5 animate-pulse flex-col rounded-3xl bg-[#F8F7F4] shadow"
        >
          <div className="h-50 w-full rounded-t-3xl bg-neutral-200" />

          <div className="flex flex-1 flex-col px-6 py-4">
            <div className="mb-3 h-6 w-3/5 rounded bg-neutral-200" />

            <div className="mb-3 flex gap-2">
              <div className="h-7 w-20 rounded-full bg-neutral-200" />
              <div className="h-7 w-16 rounded-full bg-neutral-200" />
            </div>

            <div className="mb-3 flex gap-2">
              <div className="h-7 w-18 rounded-full bg-neutral-200" />
              <div className="h-7 w-14 rounded-full bg-neutral-200" />
              <div className="h-7 w-16 rounded-full bg-neutral-200" />
            </div>

            <div className="mb-4 h-4 w-28 rounded bg-neutral-200" />

            <div className="mt-auto h-12 w-full rounded-md bg-neutral-200" />
          </div>
        </div>
      ))}
    </>
  )
}
