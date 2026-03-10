'use client'

/** 조합 향기 목록: 검색·향조·노트 필터, 카드 클릭 시 상세 모달(연관 추천 링크 포함) */
import { useState } from 'react'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import {
  fetchBlendDetail,
  accordNameToScentFamilyId,
  themeNameToNoteLabel,
} from '../_api/productsClient'
import { useCombinationsList, useProductDetailModal } from '../_hooks'

function fetchComboDetail(blendId: number) {
  return fetchBlendDetail(blendId).then(({ data }) => {
    const scentFamilyIds = data.accord_options.map(
      (a) => accordNameToScentFamilyId[a.name] ?? 'woody'
    )
    const themeNote = themeNameToNoteLabel[data.theme_option.name]
    return {
      name: data.name,
      imageUrl: data.image_url,
      scentFamilyIds,
      noteLabels: themeNote ? [themeNote] : [],
      oneLineDescription: data.description,
      productLink: data.product_link,
    }
  })
}

export default function ProductsComboPage() {
  const items = useCombinationsList()
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
  } = useProductDetailModal(fetchComboDetail)

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

  const filtered = items.filter((item) => {
    const themeNote = themeNameToNoteLabel[item.theme_option.name]
    const matchSearch =
      !search.trim() || item.name.toLowerCase().includes(search.toLowerCase())
    const matchScent =
      selectedScentIds.length === 0 ||
      item.accord_options.some((a) =>
        selectedScentIds.includes(accordNameToScentFamilyId[a.name] ?? '')
      )
    const matchNote =
      selectedNotes.length === 0 ||
      (themeNote && selectedNotes.includes(themeNote))
    return matchSearch && matchScent && matchNote
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
          const scentFamilyIds = item.accord_options.map(
            (a) => accordNameToScentFamilyId[a.name] ?? 'woody'
          )
          const themeNote = themeNameToNoteLabel[item.theme_option.name]
          const scentNotes = themeNote ? [themeNote] : []
          return (
            <li key={item.id}>
              <ProductCard
                variant="combo"
                name={item.name}
                imageUrl={item.image_url}
                scentFamilyId={scentFamilyIds[0] ?? 'woody'}
                scentFamilyIds={scentFamilyIds}
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
