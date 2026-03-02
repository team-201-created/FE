'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { SCENT_FAMILIES, SCENT_NOTES } from '@/constants/productFilters'

const styles = {
  bar: 'flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm',
  barCollapsed: 'flex items-center gap-2 p-2',
  searchWrap:
    'flex flex-1 items-center gap-2 rounded-full bg-neutral-50 pl-4 pr-3 py-2',
  searchIcon: 'size-4 shrink-0 text-neutral-400',
  searchInput:
    'min-w-0 flex-1 bg-transparent text-sm text-[var(--color-black-primary)] placeholder:text-neutral-400 outline-none',
  filterBtn:
    'flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-[var(--color-black-primary)] transition-colors hover:bg-neutral-50',
  filterBtnActive: 'perfume-segment-active border-transparent',
  expanded: 'border-t border-neutral-100 p-4',
  filterTitle: 'mb-2 text-sm font-bold text-[var(--color-black-primary)]',
  tagWrap: 'flex flex-wrap gap-2',
  tag: 'rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-[var(--color-black-secondary)] hover:bg-neutral-50',
  tagActive: 'perfume-segment-active border-transparent',
} as const

type FilterType = 'note' | 'scent'

export type SearchFilterBarProps = {
  variant: 'single' | 'combo'
  searchValue: string
  onSearchChange: (value: string) => void
  selectedScentFamilyIds: string[]
  onScentFamilyToggle: (id: string) => void
  selectedNoteIds?: string[]
  onNoteToggle?: (note: string) => void
}

export function SearchFilterBar({
  variant,
  searchValue,
  onSearchChange,
  selectedScentFamilyIds,
  onScentFamilyToggle,
  selectedNoteIds = [],
  onNoteToggle = () => {},
}: SearchFilterBarProps) {
  const [expanded, setExpanded] = useState(false)
  const [filterType, setFilterType] = useState<FilterType>(
    variant === 'combo' ? 'note' : 'scent'
  )

  const openFilter = (type: FilterType) => {
    setFilterType(type)
    setExpanded((prev) => (prev && filterType === type ? false : true))
  }

  return (
    <section className={styles.bar} aria-label="검색 및 필터">
      <div className={styles.barCollapsed}>
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="향기 이름 검색..."
            className={styles.searchInput}
            aria-label="향기 이름 검색"
          />
        </div>
        {variant === 'combo' && (
          <button
            type="button"
            className={cn(
              styles.filterBtn,
              filterType === 'note' && expanded && styles.filterBtnActive
            )}
            onClick={() => openFilter('note')}
            aria-pressed={expanded && filterType === 'note'}
          >
            <TagIcon className="size-4" />
            노트
          </button>
        )}
        <button
          type="button"
          className={cn(
            styles.filterBtn,
            filterType === 'scent' && expanded && styles.filterBtnActive
          )}
          onClick={() => openFilter('scent')}
          aria-pressed={expanded && filterType === 'scent'}
        >
          <GridIcon className="size-4" />
          향조
        </button>
      </div>

      {expanded && (
        <div className={styles.expanded}>
          <p className={styles.filterTitle}>
            {filterType === 'note' ? '향기 노트 선택' : '향조 선택'}
          </p>
          <div className={styles.tagWrap}>
            {filterType === 'note'
              ? SCENT_NOTES.map((note) => (
                  <button
                    key={note}
                    type="button"
                    className={cn(
                      styles.tag,
                      selectedNoteIds.includes(note) && styles.tagActive
                    )}
                    onClick={() => onNoteToggle(note)}
                  >
                    {note}
                  </button>
                ))
              : SCENT_FAMILIES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      styles.tag,
                      selectedScentFamilyIds.includes(id) && styles.tagActive
                    )}
                    onClick={() => onScentFamilyToggle(id)}
                  >
                    {label}
                  </button>
                ))}
          </div>
        </div>
      )}
    </section>
  )
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  )
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  )
}
