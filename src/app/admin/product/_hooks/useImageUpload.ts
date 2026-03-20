'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { useModalStore } from '@/store/useModalStore'
import { getProductPresignedUrlAction } from '@/app/admin/product/_lib/productActions'

export function useImageUpload(initialImageUrl?: string) {
  const { openAlert } = useModalStore()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowed = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowed.includes(file.type)) {
      openAlert({
        type: 'danger',
        title: '지원하지 않는 파일 형식',
        content: 'JPG, PNG 파일만 업로드할 수 있습니다.',
      })
      e.target.value = ''
      return
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(URL.createObjectURL(file))
    setImageUrl(undefined)

    startTransition(async () => {
      try {
        const sanitizedFileName = file.name.replace(/\s+/g, '_')
        const presignedResult = await getProductPresignedUrlAction(
          sanitizedFileName,
          file.size
        )
        if (!presignedResult.success) {
          throw new Error('이미지 업로드 URL 발급에 실패했습니다.')
        }
        const { presigned_url, image_url } = presignedResult.data
        const uploadRes = await fetch(presigned_url, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })
        if (!uploadRes.ok) throw new Error('이미지 업로드에 실패했습니다.')
        setImageUrl(image_url)
      } catch (error) {
        setImagePreview(null)
        openAlert({
          type: 'danger',
          title: '이미지 업로드 실패',
          content:
            error instanceof Error
              ? error.message
              : '이미지 업로드 중 오류가 발생했습니다.',
        })
      }
    })
  }

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
    setImageUrl(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return {
    imagePreview,
    imageUrl,
    isPending,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
  }
}
