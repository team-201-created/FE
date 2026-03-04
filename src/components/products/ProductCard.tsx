'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import {
  getAccordLabels,
  ACCORD_LABEL_PILL_SM_CLASS,
  SCENT_NOTE_LINE_CLASS,
} from '@/constants/accordLabelStyles'
import { Lens } from '@/components/magicui/lens'
import { ShineBorder } from '../magicui/shine-border'

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
    variant === 'combo' && scentFamilyIds?.length
      ? scentFamilyIds
      : [scentFamilyId]

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
            {getAccordLabels(accordIds).map(({ id, label, style }) => (
              <span
                key={id}
                className={ACCORD_LABEL_PILL_SM_CLASS}
                style={{
                  backgroundColor: style.bg,
                  borderColor: style.border,
                  color: style.text,
                  borderWidth: 1,
                }}
              >
                {label}
              </span>
            ))}
          </div>
          {variant === 'combo' && scentNotes.length > 0 && (
            <p className={cn(SCENT_NOTE_LINE_CLASS, 'mt-2 px-1.5')}>
              {scentNotes.join(' ')}
            </p>
          )}
        </div>
      </article>
    </ShineBorder>
  )
}
