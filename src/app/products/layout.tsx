import type { ReactNode } from 'react'
import { PerfumeSegmentNav } from '@/components/common/PerfumeSegmentNav'

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex justify-center">
        <PerfumeSegmentNav />
      </div>
      <main>{children}</main>
    </div>
  )
}
