'use client'

import React, { useState, Suspense, useMemo } from 'react'
import Modal from '@/components/common/Modal/Modal'
import Button from '@/components/common/Button'
import { RecommendTabId, RECOMMEND_TABS } from '@/app/admin/recommend/_types'
import { RECOMMEND_API } from '@/app/admin/recommend/_api'
import { BlendMapsForm } from './BlendMapsForm'
import { ProductPoolsForm } from './ProductPoolsForm'
import { ProductMapsForm } from './ProductMapsForm'
import { useModalStore } from '@/store/useModalStore'

interface RecommendPostModalProps {
  activeTab: RecommendTabId
}

// 제품 추천맵 폼 로딩
const ProductMapsFormFallback = () => (
  <div className="flex w-full items-center justify-center py-20 font-bold text-gray-400">
    후보군 불러오는 중...
  </div>
)

export const RecommendPostModal = ({ activeTab }: RecommendPostModalProps) => {
  const { closeModal } = useModalStore()

  const activeTabLabel =
    RECOMMEND_TABS.find((t) => t.id === activeTab)?.label || ''

  // 각 탭별 폼 default 값 설정
  const [formData, setFormData] = useState({
    // 1. 향조합 (Blend Maps)
    inputType: 'PREFERENCE',

    // 2. 제품 후보군 (Product Pools)
    crawl_source: 'NAVER_STORE',
    crawl_count: 50,
    crawl_sort: 'REVIEW_RATING',
    product_type: 'DIFFUSER',
    crawl_config: {
      min_price: 10000,
      max_price: 100000,
      min_rating: 4.0,
      min_review_count: 10,
    },

    // 3. 제품 추천맵 (Product Maps)
    product_pool_id: 1,
  })

  const poolsPromise = useMemo(() => {
    if (activeTab !== 'product-maps') return null
    return RECOMMEND_API.productPools({
      size: 20,
      publish_status: 'ADOPTED',
    })
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

  const handleRegister = () => {
    // 탭별 전송 데이터 가공
    let submitData: any = {}
    if (activeTab === 'blend-maps') {
      submitData = { input_type: formData.inputType }
    } else if (activeTab === 'product-pools') {
      submitData = {
        crawl_source: formData.crawl_source,
        crawl_count: formData.crawl_count,
        crawl_sort: formData.crawl_sort,
        product_type: formData.product_type,
        crawl_config: formData.crawl_config,
      }
    } else if (activeTab === 'product-maps') {
      submitData = { product_pool_id: formData.product_pool_id }
    }

    console.log(`[${activeTab}] 등록 데이터 TEST : `, submitData)
    closeModal()
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
      default:
        return null
    }
  }

  return (
    <Modal isOpen onClose={closeModal} size="md" overflowVisible>
      <Modal.Header>{activeTabLabel} 등록</Modal.Header>
      <Modal.Content>{renderContent()}</Modal.Content>
      <Modal.Footer className="flex justify-end gap-2 text-[16px]">
        <Button
          color="none"
          className="border-gray-light border"
          onClick={closeModal}
        >
          취소
        </Button>
        <Button color="primary" onClick={handleRegister}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
