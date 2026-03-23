'use client'

import React, { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useModalStore } from '@/store/useModalStore'
import {
  BlendMapsDetailResponse,
  ProductPoolsDetailResponse,
  ProductMapsDetailResponse,
  RecommendTabId,
} from '@/app/admin/recommend/_types'
import { fetchRecommendDetailAction } from '../_actions/recommendActions'
import { formatDate, getTypeStyles } from '@/app/admin/_utils'
import { TYPE_LABELS, PRODUCT_TYPE_LABELS } from '@/app/admin/_constants/labels'
import { cn } from '@/lib/cn'

type RecommendDetailModalProps =
  | { tab: 'blend-maps'; id: number }
  | { tab: 'product-pools'; id: number }
  | { tab: 'product-maps'; id: number }

type DetailData =
  | BlendMapsDetailResponse
  | ProductPoolsDetailResponse
  | ProductMapsDetailResponse

const TAB_TITLE: Record<RecommendTabId, string> = {
  'blend-maps': '향조합 추천맵',
  'product-pools': '제품 후보군',
  'product-maps': '제품 추천맵',
}

const CRAWL_SORT_LABELS: Record<string, string> = {
  REVIEW_RATING: '리뷰 평점순',
  REVIEW_COUNT: '리뷰 수순',
  SALES_VOLUME: '판매량순',
  PRICE_HIGH: '가격 높은순',
  PRICE_LOW: '가격 낮은순',
}

const InfoRow = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex items-center gap-4 py-2">
    <span className="text-black-secondary w-24 text-sm font-medium">
      {label}
    </span>
    <span className="text-sm">{children}</span>
  </div>
)

const TypeBadge = ({ type }: { type: string }) => (
  <span
    className={cn(
      'inline-flex rounded-lg px-2.5 py-1 text-sm font-bold',
      getTypeStyles(type)
    )}
  >
    {PRODUCT_TYPE_LABELS[type] || TYPE_LABELS[type] || type}
  </span>
)

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === 'PUBLISHED' || status === 'ADOPTED'
  const label: Record<string, string> = {
    PUBLISHED: '발행',
    UNPUBLISHED: '미발행',
    ADOPTED: '채택',
    UNADOPTED: '미채택',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold',
        isActive
          ? 'bg-status-success-bg text-status-success-text'
          : 'bg-status-neutral-bg text-status-neutral-text'
      )}
    >
      <div
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isActive ? 'bg-status-success-text' : 'bg-status-neutral-text'
        )}
      />
      {label[status] ?? status}
    </span>
  )
}

const ResultsSection = ({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) => (
  <div className="mt-4">
    <div className="mb-2 flex items-center justify-between">
      <span className="text-black-primary text-sm font-semibold">{title}</span>
      <span className="text-black-secondary text-xs">{count}개</span>
    </div>
    {count === 0 ? (
      <p className="text-gray py-4 text-center text-sm">항목이 없습니다.</p>
    ) : (
      <div className="border-gray-light max-h-[240px] overflow-y-auto rounded-lg border">
        {children}
      </div>
    )}
  </div>
)

const BlendMapsDetail = ({ data }: { data: BlendMapsDetailResponse }) => (
  <>
    <div className="border-gray-light border-b pb-4">
      <InfoRow label="ID">{data.id}</InfoRow>
      <InfoRow label="입력 유형">
        <TypeBadge type={data.input_type} />
      </InfoRow>
      <InfoRow label="발행 상태">
        <StatusBadge status={data.publish_status} />
      </InfoRow>
      <InfoRow label="생성일">{formatDate(data.created_at)}</InfoRow>
      <InfoRow label="수정일">{formatDate(data.updated_at)}</InfoRow>
    </div>

    <ResultsSection title="매핑 결과" count={data.results.length}>
      {data.results.map((r) => (
        <div
          key={r.id}
          className="border-gray-light flex items-center justify-between border-b px-4 py-3 last:border-0"
        >
          <span className="text-black-primary text-sm font-medium">
            {r.blend.name}
          </span>
          <span className="text-black-secondary text-xs">
            blend #{r.blend.id}
          </span>
        </div>
      ))}
    </ResultsSection>
  </>
)

const ProductPoolsDetail = ({ data }: { data: ProductPoolsDetailResponse }) => (
  <>
    <div className="border-gray-light border-b pb-4">
      <InfoRow label="ID">{data.id}</InfoRow>
      <InfoRow label="제품 유형">
        <TypeBadge type={data.product_type} />
      </InfoRow>
      <InfoRow label="크롤 출처">{data.crawl_source}</InfoRow>
      <InfoRow label="크롤 수">{data.crawl_count}개</InfoRow>
      <InfoRow label="정렬 기준">
        {CRAWL_SORT_LABELS[data.crawl_sort] ?? data.crawl_sort}
      </InfoRow>
      <InfoRow label="채택 상태">
        <StatusBadge status={data.adoption_status} />
      </InfoRow>
      <InfoRow label="생성일">{formatDate(data.created_at)}</InfoRow>
      <InfoRow label="수정일">{formatDate(data.updated_at)}</InfoRow>
    </div>

    <ResultsSection title="크롤링 제품 목록" count={data.count}>
      {data.results.map((r) => (
        <div
          key={r.id}
          className="border-gray-light border-b px-4 py-3 last:border-0"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-black-primary text-sm font-medium">
              {r.name}
            </span>
            <span className="text-black-secondary shrink-0 text-xs">
              {r.price.toLocaleString()}원
            </span>
          </div>
          <div className="text-black-secondary mt-1 flex items-center gap-3 text-xs">
            <span>{r.brand}</span>
            <span>
              ★ {r.review_rating} ({r.review_count})
            </span>
          </div>
          {r.scent_keywords.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {r.scent_keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </ResultsSection>
  </>
)

const ProductMapsDetail = ({ data }: { data: ProductMapsDetailResponse }) => (
  <>
    <div className="border-gray-light border-b pb-4">
      <InfoRow label="ID">{data.id}</InfoRow>
      <InfoRow label="후보군 ID">#{data.product_pool_id}</InfoRow>
      <InfoRow label="발행 상태">
        <StatusBadge status={data.publish_status} />
      </InfoRow>
      <InfoRow label="생성일">{formatDate(data.created_at)}</InfoRow>
      <InfoRow label="수정일">{formatDate(data.updated_at)}</InfoRow>
    </div>

    <ResultsSection title="추천 매핑 목록" count={data.results.length}>
      {data.results.map((r) => (
        <div
          key={r.id}
          className="border-gray-light flex items-center gap-3 border-b px-4 py-3 last:border-0"
        >
          <span className="text-black-secondary shrink-0 text-xs">
            #{r.sort_order}
          </span>
          <div className="text-black-primary min-w-0 flex-1 text-sm">
            <span className="font-medium">{r.blend.name}</span>
            <span className="text-black-secondary mx-1.5">→</span>
            <a
              href={r.product.purchase_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary truncate underline-offset-2 hover:underline"
            >
              {r.product.name}
            </a>
          </div>
        </div>
      ))}
    </ResultsSection>
  </>
)

export const RecommendDetailModal = (props: RecommendDetailModalProps) => {
  const { closeModal } = useModalStore()
  const [data, setData] = useState<DetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecommendDetailAction(props.tab, props.id)
      .then((result) => {
        if (result.success && result.data) {
          setData(result.data as DetailData)
        }
      })
      .finally(() => setIsLoading(false))
  }, [props.tab, props.id])

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="md" />
        </div>
      )
    }
    if (!data) {
      return (
        <div className="text-danger py-10 text-center text-sm font-medium">
          데이터를 불러오지 못했습니다.
        </div>
      )
    }

    if (props.tab === 'blend-maps')
      return <BlendMapsDetail data={data as BlendMapsDetailResponse} />
    if (props.tab === 'product-pools')
      return <ProductPoolsDetail data={data as ProductPoolsDetailResponse} />
    if (props.tab === 'product-maps')
      return <ProductMapsDetail data={data as ProductMapsDetailResponse} />
  }

  return (
    <Modal isOpen onClose={closeModal} size="md">
      <Modal.Header>{TAB_TITLE[props.tab]} 상세</Modal.Header>
      <Modal.Content className="max-h-[80vh] overflow-y-auto">
        {renderContent()}
      </Modal.Content>
      <Modal.Footer className="flex justify-end">
        <Button
          color="none"
          className="border-gray-light border"
          onClick={closeModal}
        >
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
