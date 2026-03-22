import { FetchError } from '@/lib/api'

export function extractError(error: unknown) {
  if (error instanceof FetchError) {
    return { message: error.message, reason: error.details?.reason ?? null }
  }
  return {
    message: error instanceof Error ? error.message : null,
    reason: null,
  }
}
