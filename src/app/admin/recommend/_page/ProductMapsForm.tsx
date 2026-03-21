import React, { use, useEffect } from 'react'
import { ProductMapsFormProps } from '@/app/admin/recommend/_types'
import { PRODUCT_TYPE_LABELS } from '@/app/admin/_constants/labels'
import { formatDate } from '@/app/admin/_utils'
import { cn } from '@/lib/cn'

export const ProductMapsForm = ({
  value,
  onChange,
  poolsPromise,
}: ProductMapsFormProps) => {
  const res = use(poolsPromise)
  const pools = res?.data?.results ?? []

  useEffect(() => {
    if (pools.length > 0 && value === 0) {
      onChange(pools[0].id)
    }
  }, [pools])

  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex flex-col gap-2">
        <label className="text-lg font-bold">대상 후보군 선택</label>
        {pools.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {pools.map((p: any) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onChange(p.id)}
                className={cn(
                  'border-gray-light flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                  value === p.id ? 'bg-gray-white' : 'text-gray-primary'
                )}
              >
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-2',
                    value === p.id
                      ? 'border-black-primary bg-black-primary'
                      : 'border-gray-light'
                  )}
                />
                <span>
                  #{p.id} · {PRODUCT_TYPE_LABELS[p.product_type]} ·{' '}
                  {p.product_count}개
                </span>
                <span className="text-gray-secondary ml-auto text-xs">
                  {formatDate(p.updated_at)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-white text-gray-secondary rounded-lg py-8 text-center">
            채택 완료된 후보군이 없습니다. 제품 후보군 탭에서 채택을 먼저 진행해
            주세요.
          </div>
        )}
        <p className="text-gray-secondary text-sm">
          채택 완료된 후보군을 선택하면, 해당 후보군 내의 제품들로 추천 맵을
          생성합니다.
        </p>
      </div>
    </div>
  )
}
