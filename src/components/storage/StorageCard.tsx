import React from 'react'
import Button from '../common/Button'
import Dateicon from '@/assets/icons/date.svg'
import Trashicon from '@/assets/icons/trash.svg'
import {
  getAccordLabel,
  ACCORD_LABEL_PILL_SM_CLASS,
} from '@/constants/accordLabelStyles'
import { StorageCardProps } from './StorageCard.types'

export default function StorageCard({
  blendName,
  blendImageUrl,
  productType,
  elementCategory,
  blendCategory,
  createdAt,
  onDelete,
  onDetail,
}: StorageCardProps) {
  return (
    <div
      className="mx-5 mb-10 flex h-109.5 w-102.5 flex-col rounded-3xl bg-[#F8F7F4] shadow"
      style={{ position: 'relative' }}
    >
      {/* 상단 이미지 영역 */}
      <div className="relative h-50 w-full overflow-hidden rounded-t-3xl bg-gray-800">
        {blendImageUrl ? (
          <img
            src={blendImageUrl}
            alt={blendName}
            className="h-full w-full object-cover"
          />
        ) : null}
        {/* 삭제 아이콘 */}
        {onDelete ? (
          <button
            onClick={onDelete}
            className="absolute top-4 right-4 rounded-[10px] bg-white p-2 shadow"
          >
            <Trashicon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {/* 하단 내용 */}
      <div className="flex flex-1 flex-col px-6 py-4">
        <div className="mb-2 text-lg font-bold">{blendName}</div>
        <div className="mb-3 flex items-center gap-2">
          {/* 엘리멘탈 카테고리 라벨 */}
          {elementCategory.map((category, index) => {
            const label = getAccordLabel(category)
            return (
              <span
                key={index}
                className={ACCORD_LABEL_PILL_SM_CLASS}
                style={{
                  background: label.style.bg,
                  borderColor: label.style.border,
                  color: label.style.text,
                }}
              >
                {label.label}
              </span>
            )
          })}
        </div>
        <div className="mb-2 flex gap-2">
          {blendCategory.map((category, index) => (
            <span
              key={index}
              className={ACCORD_LABEL_PILL_SM_CLASS}
              style={{
                background: '#f3f4f6',
                color: '#364153',
              }}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="mt-2 mb-4 flex items-center text-xs text-gray-400">
          <Dateicon className="mr-1 h-4 w-4" />
          {createdAt.slice(0, 10)}
        </div>
        <Button onClick={onDetail} size={'w369h48'} rounded={'md'}>
          자세히 보기
        </Button>
      </div>
    </div>
  )
}
