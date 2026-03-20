import React, { use } from 'react'
import { AdminSelect } from '@/app/admin/_components'
import { ProductMapsFormProps } from '@/app/admin/recommend/_types'
import { PRODUCT_TYPE_LABELS } from '@/app/admin/_constants/labels'
import { formatDate } from '@/app/admin/_utils'

export const ProductMapsForm = ({
  value,
  onChange,
  poolsPromise,
}: ProductMapsFormProps) => {
  const res = use(poolsPromise)
  const pools = res.data.results

  const options = pools.map((p: any) => ({
    label: `${p.id} - ${PRODUCT_TYPE_LABELS[p.product_type]} [${p.product_count}개]`,
    secondaryLabel: formatDate(p.updated_at),
    value: String(p.id),
  }))

  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex flex-col gap-2">
        <label className="text-lg font-bold">대상 후보군 선택</label>
        {pools.length > 0 ? (
          <AdminSelect
            value={String(value)}
            onChange={(val: string) => onChange(Number(val))}
            width="w-full"
            options={options}
          />
        ) : (
          <div className="bg-gray-light/30 rounded-xl py-8 text-center text-gray-400">
            채택 완료된 후보군이 없습니다. 제품 후보군 탭에서 채택을 먼저 진행해
            주세요.
          </div>
        )}
        <p className="text-sm text-gray-500">
          채택 완료된 후보군을 선택하면, 해당 후보군 내의 제품들로 추천 맵을
          생성합니다.
        </p>
      </div>
    </div>
  )
}
