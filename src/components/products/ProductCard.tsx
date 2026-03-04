'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import { SCENT_FAMILIES } from '@/constants/productFilters'
import { ACCORD_LABEL_STYLES } from '@/constants/accordLabelStyles'
import { Lens } from '@/components/magicui/lens'
import { ShineBorder } from '../magicui/shine-border'

const scentFamilyMap = Object.fromEntries(
  SCENT_FAMILIES.map((f) => [f.id, f])
) as Record<string, (typeof SCENT_FAMILIES)[number]>

export type ProductCardProps = {
  variant: 'single' | 'combo'
  name: string
  imageUrl: string
  scentFamilyId: string
  scentFamilyIds?: string[]
  scentNotes?: string[]
  onClick?: () => void
  /** 첫 화면 LCP 이미지일 때 true (로딩 우선순위 부여) */
  priority?: boolean
}

export function ProductCard({
  variant,
  name,
  imageUrl,
  scentFamilyId,
  scentFamilyIds,
  scentNotes = [],
  onClick,
  priority = false,
}: ProductCardProps) {
  const accordIds: string[] =
    variant === 'combo' && scentFamilyIds?.length // 조합 카드에서만 사용. 여러 향조 라벨을 표시 (없으면 scentFamilyId 1개만 표시)
      ? scentFamilyIds
      : [scentFamilyId] // 단품 카드에서는 scentFamilyId 1개만 표시

  return (
    <ShineBorder
      className={cn('rounded-2xl', onClick && 'cursor-pointer')}
      onClick={onClick}
      shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
      borderWidth={2}
    >
      <article className="rounded-2xl bg-white shadow-md">
        <div className="aspect-square w-full overflow-hidden rounded-t-2xl">
          <Lens className="h-full w-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="block rounded-[20px_20px_0_0] object-contain p-1"
              priority={priority}
            />
          </Lens>
        </div>
        <div className="p-3">
          <h3 className="mb-3 text-base font-extrabold text-[--color-black-primary]">
            {name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {accordIds.map((id) => {
              const family = scentFamilyMap[id] ?? scentFamilyMap.woody
              const style =
                ACCORD_LABEL_STYLES[family.colorClass] ??
                ACCORD_LABEL_STYLES.woody
              return (
                <span
                  key={id}
                  className="inline-block rounded-full border px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: style.bg,
                    borderColor: style.border,
                    color: style.text,
                    borderWidth: 1,
                  }}
                >
                  {family.label}
                </span>
              )
            })}
          </div>
          {variant === 'combo' && scentNotes.length > 0 && (
            <p className="mt-2 line-clamp-1 px-1.5 text-xs text-neutral-500">
              {scentNotes.join(' ')}
            </p>
          )}
        </div>
      </article>
    </ShineBorder>
  )
}
