'use client'

import { use, useState } from 'react'
import { SearchFilterBar } from '@/components/products/SearchFilterBar'
import { ProductCard } from '@/components/products/ProductCard'
import {
  fetchCombinations,
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
  const res = use(getCombinationsPromise())
  const items = res.data.items

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
          const primaryAccord = item.accord_options[0]
          const scentFamilyId = primaryAccord
            ? (accordNameToScentFamilyId[primaryAccord.name] ?? 'woody')
            : 'woody'
          const themeNote = themeNameToNoteLabel[item.theme_option.name]
          const scentNotes = themeNote ? [themeNote] : []

          return (
            <li key={item.id}>
              <ProductCard
                variant="combo"
                name={item.name}
                imageUrl={item.image_url}
                scentFamilyId={scentFamilyId}
                scentNotes={scentNotes}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
