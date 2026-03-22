'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import {
  RecommendTabId,
  RECOMMEND_TABS,
  ProductPoolCreateBody,
} from '@/app/admin/recommend/_types'
import { BlendMapsForm } from './BlendMapsForm'
import { ProductPoolsForm } from './ProductPoolsForm'
import { ProductMapsForm } from './ProductMapsForm'
import { useModalStore } from '@/store/useModalStore'
import {
  createBlendMapAction,
  createProductPoolAction,
  createProductMapAction,
  createPipelineSnapshotAction,
  fetchAdoptedPoolsAction,
  fetchPublishedBlendMapsAction,
  fetchPublishedProductMapsAction,
  fetchPublishedTestsAction,
} from '../_actions/recommendActions'
import { PipelineSnapshotBody } from '../_types'
import { PipelineForm } from './PipelineForm'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

interface RecommendPostModalProps {
  activeTab: RecommendTabId | 'pipeline'
}

// 제품 추천맵 폼 로딩
const ProductMapsFormFallback = () => (
  <div className="flex w-full items-center justify-center py-20 font-bold text-gray-400">
    후보군 불러오는 중...
  </div>
)

export const RecommendPostModal = ({ activeTab }: RecommendPostModalProps) => {
  const { closeModal, openAlert } = useModalStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeTabLabel =
    activeTab === 'pipeline'
      ? '파이프라인'
      : RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  // 각 탭별 폼 default 값 설정
  const [formData, setFormData] = useState({
    // 1. 향조합 추천맵
    inputType: 'PREFERENCE',

    // 2. 제품 후보군
    crawl_source: 'naver_shopping',
    crawl_count: 50,
    crawl_sort: 'REVIEW_RATING' as ProductPoolCreateBody['crawl_sort'],
    product_type: 'DIFFUSER' as ProductPoolCreateBody['product_type'],
    crawl_config: {
      min_price: 10000,
      max_price: 100000,
      min_rating: 4.0,
      min_review_count: 10,
    },

    // 3. 제품 추천맵
    product_pool_id: 0,
  })

  const [poolsPromise, setPoolsPromise] = useState<ReturnType<
    typeof fetchAdoptedPoolsAction
  > | null>(null)

  const [pipelinePromises, setPipelinePromises] = useState<{
    blendMaps: ReturnType<typeof fetchPublishedBlendMapsAction>
    productMaps: ReturnType<typeof fetchPublishedProductMapsAction>
    tests: ReturnType<typeof fetchPublishedTestsAction>
  } | null>(null)

  const [pipelineData, setPipelineData] = useState<PipelineSnapshotBody>({
    input_type: 'PREFERENCE',
    product_type: 'DIFFUSER',
    profiling_form_id: undefined,
    blend_match_map_id: 0,
    product_match_map_id: 0,
  })

  useEffect(() => {
    if (activeTab === 'product-maps') {
      setPoolsPromise(fetchAdoptedPoolsAction())
    }
    if (activeTab === 'pipeline') {
      setPipelinePromises({
        blendMaps: fetchPublishedBlendMapsAction(),
        productMaps: fetchPublishedProductMapsAction(),
        tests: fetchPublishedTestsAction(),
      })
    }
  }, [activeTab])

  // 일반 필드 업데이트
  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // 후보군 설정 업데이트
  const handleConfigChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      crawl_config: { ...prev.crawl_config, [key]: value },
    }))
  }

  const handleRegister = async () => {
    setIsSubmitting(true)
    try {
      if (activeTab === 'blend-maps') {
        const result = await createBlendMapAction(formData.inputType)
        if (!result.success) {
          openAlert({
            type: 'danger',
            title: result.message ?? '등록 실패',
            content: result.reason ?? '향조합 추천맵 등록에 실패했습니다.',
            confirmText: '확인',
          })
          return
        }
      } else if (activeTab === 'product-pools') {
        const result = await createProductPoolAction({
          crawl_source: formData.crawl_source,
          crawl_count: formData.crawl_count,
          crawl_sort: formData.crawl_sort,
          product_type: formData.product_type,
          crawl_config: formData.crawl_config,
        })
        if (!result.success) {
          openAlert({
            type: 'danger',
            title: result.message ?? '등록 실패',
            content: result.reason ?? '제품 후보군 등록에 실패했습니다.',
            confirmText: '확인',
          })
          return
        }
      } else if (activeTab === 'product-maps') {
        const result = await createProductMapAction(formData.product_pool_id)
        if (!result.success) {
          openAlert({
            type: 'danger',
            title: result.message ?? '등록 실패',
            content: result.reason ?? '제품 추천맵 등록에 실패했습니다.',
            confirmText: '확인',
          })
          return
        }
      } else if (activeTab === 'pipeline') {
        if (
          !pipelineData.blend_match_map_id ||
          !pipelineData.product_match_map_id
        ) {
          openAlert({
            type: 'danger',
            title: '입력 오류',
            content: '향조합 추천맵과 제품 추천맵을 선택해주세요.',
            confirmText: '확인',
          })
          return
        }
        const result = await createPipelineSnapshotAction(pipelineData)
        if (!result.success) {
          openAlert({
            type: 'danger',
            title: result.message ?? '등록 실패',
            content: result.reason ?? '파이프라인 생성에 실패했습니다.',
            confirmText: '확인',
          })
          return
        }
      }
      closeModal()
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'blend-maps':
        return (
          <BlendMapsForm
            value={formData.inputType}
            onChange={(val) => handleChange('inputType', val)}
          />
        )
      case 'product-pools':
        return (
          <ProductPoolsForm
            formData={formData}
            onFieldChange={handleChange}
            onConfigChange={handleConfigChange}
          />
        )
      case 'product-maps':
        return (
          <Suspense fallback={<ProductMapsFormFallback />}>
            {poolsPromise && (
              <ProductMapsForm
                value={formData.product_pool_id}
                onChange={(val) => handleChange('product_pool_id', Number(val))}
                poolsPromise={poolsPromise}
              />
            )}
          </Suspense>
        )
      case 'pipeline':
        return (
          <Suspense fallback={<ProductMapsFormFallback />}>
            {pipelinePromises && (
              <PipelineForm
                formData={pipelineData}
                onChange={(updates) =>
                  setPipelineData((prev) => ({ ...prev, ...updates }))
                }
                blendMapsPromise={pipelinePromises.blendMaps}
                productMapsPromise={pipelinePromises.productMaps}
                testsPromise={pipelinePromises.tests}
              />
            )}
          </Suspense>
        )
      default:
        return null
    }
  }

  return (
    <Modal
      isOpen
      onClose={isSubmitting ? () => {} : closeModal}
      size="md"
      overflowVisible
    >
      <Modal.Header>{activeTabLabel} 등록</Modal.Header>
      <Modal.Content>{renderContent()}</Modal.Content>
      <Modal.Footer className="flex justify-end gap-2 text-[16px]">
        <Button
          color="none"
          className="border-gray-light border"
          disabled={isSubmitting}
          onClick={closeModal}
        >
          취소
        </Button>
        <Button
          color="primary"
          disabled={isSubmitting}
          onClick={handleRegister}
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" className="mx-auto" />
          ) : (
            '등록'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
