export const TYPE_LABELS: Record<string, string> = {
  PREFERENCE: '취향',
  HEALTH: '건강',
  INTERIOR: '인테리어',
  OOTD: 'OOTD',
}

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  DIFFUSER: '디퓨저',
  PERFUME: '향수',
}

export const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: '전체', value: 'all' },
  ...Object.entries(TYPE_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
]

export const PUBLISH_STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '발행', value: 'PUBLISHED' },
  { label: '미발행', value: 'UNPUBLISHED' },
]

export const ADOPTION_STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '채택', value: 'ADOPTED' },
  { label: '미채택', value: 'UNADOPTED' },
]
