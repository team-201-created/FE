'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import { TYPE_LABELS, PRODUCT_TYPE_LABELS } from '@/app/admin/_constants/labels'
import { PipelineSnapshotBody } from '../_types'

interface PipelineFormProps {
  formData: PipelineSnapshotBody
  onChange: (updates: Partial<PipelineSnapshotBody>) => void
}

export const PipelineForm = ({ formData, onChange }: PipelineFormProps) => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="font-bold">
            향조합 추천맵 유형 <span className="text-red-500">*</span>
          </label>
          <span className="text-sm text-gray-500">
            해당 유형으로 발행된 향 조합 추천맵을 조회 합니다.
          </span>
        </div>
        <div className="flex gap-2">
          {(
            Object.entries(TYPE_LABELS) as [
              PipelineSnapshotBody['input_type'],
              string,
            ][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ input_type: value })}
              className={cn(
                'flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold transition-all',
                formData.input_type === value
                  ? 'bg-black-primary text-white'
                  : 'bg-gray-light'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="font-bold">
            제품 추천맵 유형 <span className="text-red-500">*</span>
          </label>
          <span className="text-sm text-gray-500">
            해당 유형으로 발행된 제품 추천맵을 조회 합니다.
          </span>
        </div>
        <div className="flex gap-2">
          {(
            Object.entries(PRODUCT_TYPE_LABELS) as [
              PipelineSnapshotBody['product_type'],
              string,
            ][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ product_type: value })}
              className={cn(
                'flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold transition-all',
                formData.product_type === value
                  ? 'bg-black-primary text-white'
                  : 'bg-gray-light'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
