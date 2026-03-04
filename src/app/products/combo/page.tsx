'use client'

import { use, useState } from 'react'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import type { ProductDetailModalProduct } from '@/components/products/ProductDetailModal'
import {
  fetchCombinations,
  fetchBlendDetail,
  accordNameToScentFamilyId,
  themeNameToNoteLabel,
  type CombinationsResponse,
} from '@/lib/api/client'

let combinationsPromise: Promise<CombinationsResponse> | null = null
function getCombinationsPromise() {
  if (!combinationsPromise) {
    combinationsPromise = fetchCombinations({ page: 1, size: 100 })
  }
  return combinationsPromise
}

export default function ProductsComboPage() {
  const [search, setSearch] = useState('')
  const [selectedScentIds, setSelectedScentIds] = useState<string[]>([])
  const [selectedNotes, setSelectedNotes] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalProduct, setModalProduct] =
    useState<ProductDetailModalProduct | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const res = use(getCombinationsPromise())
  const items = res.data.items

  const openDetailModal = async (blendId: number) => {
    setModalOpen(true)
    setModalProduct(null)
    setModalError(null)
    setModalLoading(true)
    try {
      const { data } = await fetchBlendDetail(blendId)
      const scentFamilyIds = data.accord_options.map(
        (a) => accordNameToScentFamilyId[a.name] ?? 'woody'
      )
      const themeNote = themeNameToNoteLabel[data.theme_option.name]
      setModalProduct({
        name: data.name,
        imageUrl: data.image_url,
        scentFamilyIds,
        noteLabels: themeNote ? [themeNote] : [],
        oneLineDescription: data.description,
        productLink: data.product_link,
      })
    } catch (e) {
      setModalError(
        e instanceof Error ? e.message : '상세 조회에 실패했습니다.'
      )
    } finally {
      setModalLoading(false)
    }
  }

  const closeDetailModal = () => {
    setModalOpen(false)
    setModalProduct(null)
    setModalError(null)
  }

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
        {filtered.map((item) => {
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
                onClick={() => openDetailModal(item.id)}
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
        errorMessage={modalError}
        showRecommendationLink
      />
    </>
  )
}
