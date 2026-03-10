'use client'

/** 단품 향기 목록 클라이언트: 검색·필터·상세 모달 (서버에서 받은 items 사용) */
import { useState } from 'react'
import { ErrorFeedbackModal } from '@/components/common/ErrorFeedback'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import {
  fetchElementDetail,
  accordNameToScentFamilyId,
} from '../_api/productsClient'
import { useProductDetailModal, type SingleItem } from '../_hooks'

function fetchSingleDetail(elementId: number) {
  return fetchElementDetail(elementId).then(({ data }) => ({
    name: data.name,
    imageUrl: data.image_url,
    scentFamilyIds: [
      accordNameToScentFamilyId[data.accord_option.name] ?? 'woody',
    ],
    noteLabels: [] as string[],
    oneLineDescription: data.description,
    productLink: data.product_link,
  }))
}

type SinglePageClientProps = {
  initialItems: SingleItem[]
}

export function SinglePageClient({ initialItems }: SinglePageClientProps) {
  const [search, setSearch] = useState('')
  const [selectedScentIds, setSelectedScentIds] = useState<string[]>([])
  const {
    isOpen: modalOpen,
    product: modalProduct,
    isLoading: modalLoading,
    apiError,
    openDetail,
    closeDetail: closeDetailModal,
    clearApiError,
  } = useProductDetailModal(fetchSingleDetail)

  const toggleScent = (id: string) => {
    setSelectedScentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const filtered = initialItems.filter((item) => {
    const scentFamilyId =
      accordNameToScentFamilyId[item.accord_option.name] ?? 'woody'
    const matchSearch =
      !search.trim() || item.name.toLowerCase().includes(search.toLowerCase())
    const matchScent =
      selectedScentIds.length === 0 || selectedScentIds.includes(scentFamilyId)
    return matchSearch && matchScent
  })

  return (
    <>
      <div className="mb-6">
        <SearchFilterBar
          variant="single"
          searchValue={search}
          onSearchChange={setSearch}
          selectedScentFamilyIds={selectedScentIds}
          onScentFamilyToggle={toggleScent}
        />
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filtered.map((item, index) => {
          const scentFamilyId =
            accordNameToScentFamilyId[item.accord_option.name] ?? 'woody'
          return (
            <li key={item.id}>
              <ProductCard
                variant="single"
                name={item.name}
                imageUrl={item.image_url}
                scentFamilyId={scentFamilyId}
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
      />

      <ErrorFeedbackModal
        message={apiError ?? ''}
        isOpen={!!apiError}
        onClose={clearApiError}
      />
    </>
  )
}
