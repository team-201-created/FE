'use client'

import React from 'react'
import { AdminSelect } from '@/app/admin/_components'
import Slider from '@/app/admin/_components/Slider'

import { ProductPoolsFormProps } from '@/app/admin/recommend/_types'

export const ProductPoolsForm = ({
  formData,
  onFieldChange,
  onConfigChange,
}: ProductPoolsFormProps) => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-bold">크롤링 소스</label>
          <AdminSelect
            value={formData.crawl_source}
            onChange={(val) => onFieldChange('crawl_source', val)}
            width="w-full"
            options={[
              { label: '네이버 스토어', value: 'NAVER_STORE' },
              { label: '카카오 페이지', value: 'KAKAO_PAGE' },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">제품 유형</label>
          <AdminSelect
            value={formData.product_type}
            onChange={(val) => onFieldChange('product_type', val)}
            width="w-full"
            options={[
              { label: '디퓨저', value: 'DIFFUSER' },
              { label: '향수', value: 'PERFUME' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 items-start gap-6">
        <Slider
          label="수집 개수"
          min={10}
          max={100}
          step={1}
          value={formData.crawl_count}
          onChange={(val) => onFieldChange('crawl_count', val)}
        />
        <div className="flex flex-col gap-2">
          <label className="font-bold">정렬 기준</label>
          <AdminSelect
            value={formData.crawl_sort}
            onChange={(val) => onFieldChange('crawl_sort', val)}
            width="w-full"
            options={[
              { label: '리뷰 평점순', value: 'REVIEW_RATING' },
              { label: '리뷰 개수순', value: 'REVIEW_COUNT' },
              { label: '판매량순', value: 'SALES_VOLUME' },
              { label: '낮은 가격순', value: 'PRICE_ASC' },
            ]}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-4 rounded-xl">
        <h3 className="text-lg font-bold">상세 필터 설정</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <Slider
            label="최소 가격"
            min={10000}
            max={100000}
            step={5000}
            value={formData.crawl_config.min_price}
            onChange={(val) => onConfigChange('min_price', val)}
          />
          <Slider
            label="최대 가격"
            min={100000}
            max={200000}
            step={5000}
            value={formData.crawl_config.max_price}
            onChange={(val) => onConfigChange('max_price', val)}
          />
          <Slider
            label="최소 평점"
            min={0}
            max={5}
            step={0.5}
            value={formData.crawl_config.min_rating}
            onChange={(val) => onConfigChange('min_rating', val)}
          />
          <Slider
            label="최소 리뷰수"
            min={0}
            max={100}
            step={5}
            value={formData.crawl_config.min_review_count}
            onChange={(val) => onConfigChange('min_review_count', val)}
          />
        </div>
      </div>
    </div>
  )
}
