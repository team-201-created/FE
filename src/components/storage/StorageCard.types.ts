export interface StorageCardProps {
  blendName: string
  blendImageUrl: string
  productType: string
  elementCategory: string[]
  blendCategory: string[]
  createdAt: string
  onDelete?: () => void
  onDetail?: () => void
}
