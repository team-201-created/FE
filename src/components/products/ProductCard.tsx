'use client'

import { SCENT_FAMILIES } from '@/constants/productFilters'
import { Lens } from '@/components/magicui/lens'
import { ShineBorder } from '../magicui/shine-border'

const scentFamilyMap = Object.fromEntries(
  SCENT_FAMILIES.map((f) => [f.id, f])
) as Record<string, (typeof SCENT_FAMILIES)[number]>

/** 카드 향조 라벨 스타일 (bg, border, text) */
const LABEL_STYLES: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  floral: { bg: '#fce7f3', border: '#fccee8', text: '#a3004c' },
  citrus: { bg: '#fffde5', border: '#fff085', text: '#894b00' },
  oriental: { bg: '#f3e8ff', border: '#d9b5ff', text: '#6e11b0' },
  aromatic: { bg: '#f0fdf4', border: '#b9f8cf', text: '#008236' },
  base: { bg: '#747474', border: '#d8d8d8', text: '#e9e9e9' },
  animalic: { bg: '#fef2f2', border: '#ffc9c9', text: '#ef0009' },
  woody: { bg: '#856544', border: '#502c14', text: '#ffffff' },
}

export type ProductCardProps = {
  variant: 'single' | 'combo'
  name: string
  imageUrl: string
  scentFamilyId: string
  scentNotes?: string[]
}

export function ProductCard({
  variant,
  name,
  imageUrl,
  scentFamilyId,
  scentNotes = [],
}: ProductCardProps) {
  const family = scentFamilyMap[scentFamilyId] ?? scentFamilyMap.woody
  const labelStyle = LABEL_STYLES[family.colorClass] ?? LABEL_STYLES.woody

  return (
    <ShineBorder
      className="rounded-2xl"
      shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
      shineSize={1.5}
    >
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="aspect-square w-full overflow-hidden rounded-t-2xl bg-neutral-100">
          <Lens className="h-full w-full">
            <img
              src={imageUrl}
              alt={name}
              className="block h-full w-full rounded-[20px_20px_0_0] object-cover p-1"
            />
          </Lens>
        </div>
        <div className="p-3">
          <h3 className="mb-1.5 line-clamp-2 text-sm font-extrabold text-neutral-800">
            {name}
          </h3>
          <span
            className="inline-block rounded-full border px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: labelStyle.bg,
              borderColor: labelStyle.border,
              color: labelStyle.text,
              borderWidth: 1,
            }}
          >
            {family.label}
          </span>
          {variant === 'combo' && scentNotes.length > 0 && (
            <p className="mt-1.5 line-clamp-1 text-xs text-neutral-500">
              {scentNotes.join(' ')}
            </p>
          )}
        </div>
      </article>
    </ShineBorder>
  )
}
