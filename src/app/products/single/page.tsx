'use client'

import { use, useState } from 'react'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductDetailModal } from '@/components/products/ProductDetailModal'
import type { ProductDetailModalProduct } from '@/components/products/ProductDetailModal'
import {
  fetchSingles,
  fetchElementDetail,
  accordNameToScentFamilyId,
  type SinglesResponse,
} from '@/lib/api/client'

let singlesPromise: Promise<SinglesResponse> | null = null
function getSinglesPromise() {
  if (!singlesPromise) {
    singlesPromise = fetchSingles({ page: 1, size: 100 })
  }
  return singlesPromise
}

export default function SingleContent() {
  const [search, setSearch] = useState('')
  const [selectedScentIds, setSelectedScentIds] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalProduct, setModalProduct] =
    useState<ProductDetailModalProduct | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const res = use(getSinglesPromise())
  const items = res.data.items

  const openDetailModal = async (elementId: number) => {
    setModalOpen(true)
    setModalProduct(null)
    setModalError(null)
    setModalLoading(true)
    try {
      const { data } = await fetchElementDetail(elementId)
      const scentFamilyId =
        accordNameToScentFamilyId[data.accord_option.name] ?? 'woody'
      setModalProduct({
        name: data.name,
        imageUrl: data.image_url,
        scentFamilyIds: [scentFamilyId],
        noteLabels: [],
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

  const filtered = items.filter((item) => {
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
        {filtered.map((item) => {
          const scentFamilyId =
            accordNameToScentFamilyId[item.accord_option.name] ?? 'woody'
          return (
            <li key={item.id}>
              <ProductCard
                variant="single"
                name={item.name}
                imageUrl={item.image_url}
                scentFamilyId={scentFamilyId}
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
      />
    </>
  )
}
