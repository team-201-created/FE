export const TYPE_LABELS: Record<string, string> = {
  PREFERENCE: '취향',
  HEALTH: '건강',
  INTERIOR: '인테리어',
  OOTD: 'OOTD',
}

export const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: '전체', value: 'all' },
  ...Object.entries(TYPE_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
]
