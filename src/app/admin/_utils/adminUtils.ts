export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
    case 'ADOPTED':
      return 'bg-status-success-bg text-status-success-text cursor-pointer'
    case 'UNPUBLISHED':
    case 'UNADOPTED':
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
    case 'DIFFUSER':
      return 'bg-status-info-bg text-status-info-text'
    case 'PERFUME':
      return 'bg-status-purple-bg text-status-purple-text'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export const getTypeFirstTextColor = (type: string) => {
  switch (type) {
    case 'PREFERENCE':
      return 'text-status-purple-text'
    case 'HEALTH':
      return 'text-status-info-text'
    case 'INTERIOR':
      return 'text-status-warning-text'
    case 'OOTD':
      return 'text-status-danger-text'
    case 'DIFFUSER':
      return 'text-status-info-text'
    case 'PERFUME':
      return 'text-status-purple-text'
    default:
      return 'text-black-secondary'
  }
}

export const getTypeRowBgColor = (type: string) => {
  switch (type) {
    case 'PREFERENCE':
      return 'bg-status-purple-bg'
    case 'HEALTH':
      return 'bg-status-info-bg'
    case 'INTERIOR':
      return 'bg-status-warning-bg'
    case 'OOTD':
      return 'bg-status-danger-bg'
    case 'DIFFUSER':
      return 'bg-status-info-bg'
    case 'PERFUME':
      return 'bg-status-purple-bg'
    default:
      return 'bg-transparent'
  }
}

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return dateStr.split('T')[0]
}

export const getNextStatus = (currentStatus: string): string => {
  const transitionMap: Record<string, string> = {
    PUBLISHED: 'UNPUBLISHED',
    UNPUBLISHED: 'PUBLISHED',
    ADOPTED: 'UNADOPTED',
    UNADOPTED: 'ADOPTED',
  }
  return transitionMap[currentStatus]
}
