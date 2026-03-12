'use client'

/** 조합 향기 목록 클라이언트: 검색·필터·상세 모달 (서버에서 받은 results 사용) */
import { useState } from 'react'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import {
  fetchBlendDetail,
  blendCategoryKrToNoteLabel,
} from '../_api/productsClient'
import { mapBlendDetailToModalProduct } from '../_api/productDetailMappers'
import { useProductDetailModal, type CombinationItem } from '../_hooks'

type ComboPageClientProps = {
  initialItems: CombinationItem[]
}

export function ComboPageClient({ initialItems }: ComboPageClientProps) {
  const [search, setSearch] = useState('')
  const [selectedScentIds, setSelectedScentIds] = useState<string[]>([])
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const {
    isOpen: modalOpen,
    product: modalProduct,
    isLoading: modalLoading,
    apiError,
    openDetail,
    closeDetail: closeDetailModal,
    clearApiError,
  } = useProductDetailModal(fetchBlendDetail, mapBlendDetailToModalProduct)

  const toggleScent = (id: string) => {
    setSelectedScentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleNote = (note: string) => {
    setSelectedNotes((prev) =>
      prev.includes(note) ? prev.filter((x) => x !== note) : [...prev, note]
    )
  }

  const filtered = initialItems.filter((item) => {
    const noteLabels = (item.blend_categories ?? [])
      .map((c) => blendCategoryKrToNoteLabel[c.name?.kr ?? ''])
      .filter(Boolean)
    const matchSearch =
      !search.trim() || item.name.toLowerCase().includes(search.toLowerCase())
    const matchNote =
      selectedNotes.length === 0 ||
      noteLabels.some((n) => selectedNotes.includes(n))
    return matchSearch && matchNote
  })

  return (
    <>
      <div className="mb-6">
        <SearchFilterBar
          variant="combo"
          searchValue={search}
          onSearchChange={setSearch}
          selectedScentFamilyIds={selectedScentIds}
          onScentFamilyToggle={toggleScent}
          selectedNoteIds={selectedNotes}
          onNoteToggle={toggleNote}
        />
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item, index) => {
          const scentNotes = (item.blend_categories ?? [])
            .map((c) => blendCategoryKrToNoteLabel[c.name?.kr ?? ''])
            .filter(Boolean)
          return (
            <li key={item.id}>
              <ProductCard
                variant="combo"
                name={item.name}
                imageUrl={item.thumbnail_image_url}
                scentFamilyId="woody"
                scentFamilyIds={[]}
                scentNotes={scentNotes}
                onClick={() => openDetail(item.id)}
                priority={index === 0}
              />
            </li>
          )
        })}
      </ul>

      <ProductDetailModal
        isOpen={modalOpen}
        onClose={closeDetailModal}
        product={modalProduct}
        isLoading={modalLoading}
        errorMessage={null}
        showRecommendationLink
      />

      <ErrorFeedbackModal
        message={apiError ?? ''}
        isOpen={!!apiError}
        onClose={clearApiError}
      />
    </>
  )
}
