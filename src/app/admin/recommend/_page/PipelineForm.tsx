'use client'

import React, { use, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { TYPE_LABELS, PRODUCT_TYPE_LABELS } from '@/app/admin/_constants/labels'
import { formatDate } from '@/app/admin/_utils'
import {
  BlendMapsListResponse,
  ProductMapsListResponse,
  PipelineSnapshotBody,
} from '../_types'
import { TestListResponse } from '@/app/admin/test/_types'

interface PipelineFormProps {
  formData: PipelineSnapshotBody
  onChange: (updates: Partial<PipelineSnapshotBody>) => void
  blendMapsPromise: Promise<BlendMapsListResponse>
  productMapsPromise: Promise<ProductMapsListResponse>
  testsPromise: Promise<TestListResponse>
}

export const PipelineForm = ({
  formData,
  onChange,
  blendMapsPromise,
  productMapsPromise,
  testsPromise,
}: PipelineFormProps) => {
  const blendMapsRes = use(blendMapsPromise)
  const productMapsRes = use(productMapsPromise)
  const testsRes = use(testsPromise)

  const blendMaps = blendMapsRes?.data?.results ?? []
  const productMaps = productMapsRes?.data?.results ?? []
  const tests = testsRes?.data?.results ?? []

  // 첫 항목 자동 선택
  useEffect(() => {
    if (blendMaps.length > 0 && formData.blend_match_map_id === 0) {
      onChange({
        blend_match_map_id: blendMaps[0].id,
        input_type: blendMaps[0].input_type,
      })
    }
  }, [blendMaps])

  useEffect(() => {
    if (productMaps.length > 0 && formData.product_match_map_id === 0) {
      onChange({ product_match_map_id: productMaps[0].id })
    }
  }, [productMaps])

  return (
    <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto py-4 pr-1">
      {/* 향조합 추천맵 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">
          향조합 추천맵 <span className="text-red-500">*</span>
        </label>
        {blendMaps.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {blendMaps.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() =>
                  onChange({
                    blend_match_map_id: m.id,
                    input_type: m.input_type,
                  })
                }
                className={cn(
                  'border-gray-light flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                  formData.blend_match_map_id === m.id
                    ? 'bg-gray-white'
                    : 'text-gray-primary'
                )}
              >
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-2',
                    formData.blend_match_map_id === m.id
                      ? 'border-black-primary bg-black-primary'
                      : 'border-gray-light'
                  )}
                />
                <span>
                  #{m.id} · {TYPE_LABELS[m.input_type] ?? m.input_type}
                </span>
                <span className="text-gray-secondary ml-auto text-xs">
                  {formatDate(m.created_at)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-white text-gray-secondary rounded-lg py-6 text-center text-sm">
            발행 중인 향조합 추천맵이 없습니다.
          </div>
        )}
      </div>

      {/* 제품 추천맵 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">
          제품 추천맵 <span className="text-red-500">*</span>
        </label>
        {productMaps.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {productMaps.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onChange({ product_match_map_id: m.id })}
                className={cn(
                  'border-gray-light flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                  formData.product_match_map_id === m.id
                    ? 'bg-gray-white'
                    : 'text-gray-primary'
                )}
              >
                <span
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border-2',
                    formData.product_match_map_id === m.id
                      ? 'border-black-primary bg-black-primary'
                      : 'border-gray-light'
                  )}
                />
                <span>
                  #{m.id}{' '}
                  <span className="text-[14px]">
                    제품 후보군 ID - {m.product_pool_id}
                  </span>
                </span>
                <span className="text-gray-secondary ml-auto text-xs">
                  {formatDate(m.created_at)}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gray-white text-gray-secondary rounded-lg py-6 text-center text-sm">
            발행 중인 제품 추천맵이 없습니다.
          </div>
        )}
      </div>

      {/* 제품 유형 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">
          제품 유형 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          {Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => (
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

      {/* 테스트 선택 (optional) */}
      <div className="flex flex-col gap-2">
        <label className="text-base font-bold">
          연결할 테스트{' '}
          <span className="text-xs font-normal text-gray-400">(선택)</span>
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ profiling_form_id: undefined })}
            className={cn(
              'border-gray-light flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
              formData.profiling_form_id === undefined
                ? 'bg-gray-white'
                : 'text-gray-primary'
            )}
          >
            <span
              className={cn(
                'h-3.5 w-3.5 rounded-full border-2',
                formData.profiling_form_id === undefined
                  ? 'border-black-primary bg-black-primary'
                  : 'border-gray-light'
              )}
            />
            <span>연결 안 함</span>
          </button>
          {tests.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ profiling_form_id: t.id })}
              className={cn(
                'border-gray-light flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                formData.profiling_form_id === t.id
                  ? 'bg-gray-white'
                  : 'text-gray-primary'
              )}
            >
              <span
                className={cn(
                  'h-3.5 w-3.5 rounded-full border-2',
                  formData.profiling_form_id === t.id
                    ? 'border-black-primary bg-black-primary'
                    : 'border-gray-light'
                )}
              />
              <span>
                #{t.id} · {t.name}
              </span>
              <span className="text-gray-secondary ml-auto text-xs">
                {TYPE_LABELS[t.profiling_type] ?? t.profiling_type}
              </span>
            </button>
          ))}
          {tests.length === 0 && (
            <div className="bg-gray-white text-gray-secondary rounded-lg py-4 text-center text-sm">
              발행 중인 테스트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
