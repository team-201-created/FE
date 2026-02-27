'use client'

import { use, useState } from 'react'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import {
  fetchSingles,
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
  const res = use(getSinglesPromise())
  const items = res.data.items

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
        {filtered.map((item) => (
          <li key={item.id}>
            <ProductCard
              variant="single"
              name={item.name}
              imageUrl={item.image_url}
              scentFamilyId={
                accordNameToScentFamilyId[item.accord_option.name] ?? 'woody'
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}
