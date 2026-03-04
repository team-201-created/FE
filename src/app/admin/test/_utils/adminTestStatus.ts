import { PublishStatus } from '@/app/admin/test/_types'

export const getStatusStyles = (status: PublishStatus) => {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-status-success-bg text-status-success-text cursor-pointer'
    case 'UNPUBLISHED':
    default:
      return 'bg-status-neutral-bg text-status-neutral-text cursor-pointer'
  }
}

export const getTypeStyles = (type: string) => {
  switch (type) {
    case 'PREFERENCE':
      return 'bg-status-purple-bg text-status-purple-text'
    case 'HEALTH':
      return 'bg-status-info-bg text-status-info-text'
    case 'INTERIOR':
      return 'bg-status-warning-bg text-status-warning-text'
    case 'OOTD':
      return 'bg-status-danger-bg text-status-danger-text'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export const formatDate = (dateStr: string) => {
  return dateStr.split('T')[0]
}
